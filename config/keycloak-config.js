import session from 'express-session';
import Keycloak from 'keycloak-connect';

let _keycloak;

const keycloakConfig = {
  clientId: 'nodejs-backend',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080/auth',
  realm: 'medicale',
  credentials: {
    secret: 'WrwcubXmdE9Yf5qOE7q5gKSAVchYeNJG' // credential keyclock
  }
};

function initKeycloak() {
  if (_keycloak) {
    return _keycloak;
  } else {
    console.log("Initializing Keycloak...");
    const memoryStore = new session.MemoryStore();
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    console.log('_keycloak ', _keycloak)
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error('Keycloak has not been initialized. Please called init first.');
  }
  return _keycloak;
}

export default {
  initKeycloak,
  getKeycloak
}
