import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  keyword: DS.attr(),
  updatedAt: DS.attr()
});
