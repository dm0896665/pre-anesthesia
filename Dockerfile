FROM ubuntu:latest AS build
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
RUN chmod +x gradlew
RUN apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_9.x | bash - \
  && apt-get install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh
RUN cd npm; npm install
RUN cd npm; ls -alrt
RUN ./gradlew processResources
RUN ./gradlew bootJar --no-daemon

FROM openjdk:21-jdk-slim
WORKDIR /app
EXPOSE 8080
COPY --from=build /build/libs/pre-anesthesia-1.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]