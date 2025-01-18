FROM node:16-alpine AS build-frontend
WORKDIR /app
COPY . .
RUN cd npm; npm install
RUN chmod +x gradlew
RUN ./gradlew processResources
RUN ./gradlew bootJar --no-daemon

FROM openjdk:21-jdk-slim
WORKDIR /app
EXPOSE 8080
COPY --from=build-frontend /build/libs/pre-anesthesia-1.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]