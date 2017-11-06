import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr(),
  name: DS.attr(),
  code: DS.attr(),
  locked: DS.attr()
});
