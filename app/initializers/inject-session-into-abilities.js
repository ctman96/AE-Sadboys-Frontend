export default {
  name: 'inject-session-into-abilities',
  initialize(app) {
    app.inject('ability', 'session', 'simple-auth-session:main');
  }
};
