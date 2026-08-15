import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://keycloak-4d0n.onrender.com',
  realm: 'login-authentication',
  clientId: 'public-client'
});

export default keycloak;