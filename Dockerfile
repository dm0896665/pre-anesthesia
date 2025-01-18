# Stage 1: Build the Spring Boot application
FROM openjdk:21-jdk-slim AS build-java
WORKDIR /app
COPY . /app
RUN chmod +x gradlew
RUN ./gradlew processResources
RUN ./gradlew bootJar --no-daemon

# Stage 2: Build the frontend with npm
FROM node:16-alpine AS build-frontend
WORKDIR /app/npm
RUN npm install
RUN npm run build

# Stage 3: Create the final image
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build-frontend /app/dist /app/dist
COPY --from=build-java /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]