import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://keycloak-4d0n.onrender.com', // Cambia por la URL de tu Keycloak
  realm: 'login-authentication', // El nombre de tu Realm actual
  clientId: 'public-client'      // El Client ID que creaste
});

export default keycloak;