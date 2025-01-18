FROM node:16-alpine AS build-npm
WORKDIR /app
COPY . .
RUN cd npm; npm install

FROM openjdk:21-jdk-slim AS build
WORKDIR /app
COPY . .
COPY --from=build-npm /app/npm /npm
RUN chmod +x gradlew
RUN ./gradlew processResources
RUN ./gradlew bootJar --no-daemon

FROM openjdk:21-jdk-slim
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/build/libs/pre-anesthesia-1.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]