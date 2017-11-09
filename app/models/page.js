import DS from 'ember-data';

export default DS.Model.extend({
  size: DS.attr(),
  totalElements: DS.attr(),
  totalPages: DS.attr(),
  number: DS.attr()
});
