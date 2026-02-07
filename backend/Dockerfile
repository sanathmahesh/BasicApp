FROM eclipse-temurin:21-jdk-jammy AS builder

WORKDIR /build

COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

COPY src ./src
RUN ./mvnw package -DskipTests -B && \
    cp target/*.jar app.jar

FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

RUN groupadd --system appgroup && \
    useradd --system --gid appgroup --no-create-home appuser

COPY --from=builder /build/app.jar app.jar

RUN chown -R appuser:appgroup /app

USER appuser

ENV PORT=8080

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:${PORT}/actuator/health || exit 1

ENTRYPOINT ["sh", "-c", "exec java -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom -Dserver.port=${PORT:-8080} -jar app.jar"]