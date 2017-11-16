import DS from 'ember-data';

export default DS.Model.extend({
  number: DS.attr(),
  title: DS.attr(),
  schedule: DS.belongsTo('schedule'),
  type: DS.belongsTo('type'),
  consignmentCode: DS.attr(),
  state: DS.belongsTo('state'),
  container: DS.belongsTo('container'),
  location: DS.belongsTo('location'),
  createdAt: DS.attr(),
  updatedAt: DS.attr(),
  closedAt: DS.attr(),
  classifications: DS.belongsTo('classification')
});
