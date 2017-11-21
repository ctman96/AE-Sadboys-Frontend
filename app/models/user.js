import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  roles: DS.attr(),
  locations: DS.attr(),
  admin: DS.attr(),
  rmc: DS.attr()
});
