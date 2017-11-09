import DS from 'ember-data';

export default DS.Model.extend({
  key: DS.attr(),
  color: DS.attr()
});
