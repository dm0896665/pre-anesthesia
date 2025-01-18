FROM openjdk:21-jdk-slim AS build-frontend
WORKDIR /app
COPY . .
RUN apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_9.x | bash - \
  && apt-get install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh
RUN cd npm; npm install
RUN chmod +x gradlew
RUN ./gradlew processResources
RUN ./gradlew bootJar --no-daemon

FROM openjdk:21-jdk-slim
WORKDIR /app
EXPOSE 8080
COPY --from=build-frontend /build/libs/pre-anesthesia-1.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]