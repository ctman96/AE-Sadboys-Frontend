import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  numberPattern: DS.attr(),
  defaultSchedule : DS.belongsTo('schedule')
});
