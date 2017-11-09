import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'https://ipfms-server.herokuapp.com'
});
