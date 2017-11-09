import DS from 'ember-data';

export default DS.Model.extend({
  parent: DS.attr(),
  rel: DS.attr(),
  child: DS.attr()
});
