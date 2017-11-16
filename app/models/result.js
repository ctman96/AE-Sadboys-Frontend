import DS from 'ember-data';

export default DS.Model.extend({
  record: DS.belongsTo('record'),
  container: DS.belongsTo('container')
});
