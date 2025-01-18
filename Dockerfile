FROM ubuntu:latest AS build
RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
COPY . .
RUN chmod +x gradlew
RUN ./gradlew processResources
RUN ./gradlew bootJar --no-daemon

FROM node:16-alpine AS build-frontend
RUN ls -alrt
RUN npm install
RUN npm run build

FROM openjdk:21-jdk-slim
EXPOSE 8080
COPY --from=build-frontend /app/node_modules /app/node_modules
COPY --from=build /build/libs/pre-anesthesia-1.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]