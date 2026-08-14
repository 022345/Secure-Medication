# BASE IMAGE FROM WHERE THE FILE BUILDS. builder is just a variable name
FROM quay.io/keycloak/keycloak:latest AS builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

#DIRECTORY WHERE THE CONFIGURATIONS EXIST
WORKDIR /opt/keycloak

# THERE IS NO NEED TO ADD CERTIFICATES LIKE SSL OR TSL. THIS BECAUSE RENDER THE APPLICATION USES RENDER'S 
#RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore

#COMMAND TO COMPILE KEYCLOAK FOR PRODUCTION
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

#HAVING THESE FIELDS IS UNNECESSARY CAUSE BY CREATING ENVIRONMENT VARIABLES IN RENDER THE KEYCLOAK 
#CONFIGURATION READS THE ENVIRONMENT AND USES THEM AS IF THEY WERE DEFINED HERE.
#ENV KC_DB=postgres
#ENV KC_DB_URL=<DBURL>
#ENV KC_DB_USERNAME=<DBUSERNAME>
#ENV KC_DB_PASSWORD=<DBPASSWORD>
#ENV KC_HOSTNAME=localhost

#CONFIGURATIONS REQUIRED TO RUN BEHIND RENDER'S REVERSE PROXY
ENV KC_DB=postgres
ENV KC_HTTP_ENABLED=true
ENV KC_PROXY_HEADERS=xforwarded

#ORIGINAL ENTRYPOINT WITHOUT OPTIMIZATION
#ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]

#ENTRYPOINT USING THE OPTIMIZED PRE-COMPILED BUILD FROM THE BUILDER STAGE
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--optimized"]