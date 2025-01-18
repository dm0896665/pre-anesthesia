FROM ubuntu:latest AS build
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
RUN chmod +x gradlew
RUN cd npm; apt install -y nodejs; apt install -y npm; npm install;
RUN ./gradlew processResources
RUN ./gradlew bootJar --no-daemon

FROM openjdk:21-jdk-slim
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/build/libs/pre-anesthesia-1.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]