import DS from 'ember-data';

export default DS.Model.extend({
  number: DS.attr(),
  title: DS.attr(),
  consignmentCode: DS.attr(),
  createdAt: DS.attr(),
  updatedAt: DS.attr()
});
