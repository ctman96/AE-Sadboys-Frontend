import Ember from 'ember';

export default Ember.Component.extend({
  locations: ['somewhere', 'anywhere'],
  roles: ['admin', 'rmc', 'general user'],
  showLocations: false,
  showRoles: false,
  actions: {
    showLocations(){
      this.toggleProperty('showLocations');
    },
    showRoles(){
      this.toggleProperty('showRoles');
    },
    removeItem(){
      this.remove()
    },
    addItem(){
      this.add()
    }
  }
});
