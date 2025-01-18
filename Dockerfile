FROM ubuntu:latest AS build
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
RUN chmod +x gradlew
RUN cd npm; npm install
RUN cd npm; ls -alrt
RUN ./gradlew processResources
RUN ./gradlew bootJar --no-daemon

FROM node:16-alpine AS build-frontend
WORKDIR /app
COPY . .
RUN cd npm; npm install

FROM openjdk:21-jdk-slim
WORKDIR /app
EXPOSE 8080
COPY --from=build-frontend /app/npm/node_modules /app/node_modules
COPY --from=build /build/libs/pre-anesthesia-1.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]