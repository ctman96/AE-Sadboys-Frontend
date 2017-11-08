import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return[
      {
        color:'FF3300',
        key:'A'
      },
      {
        color:'AB2567',
        key:'S'
      },
      {
        color:'2938AB',
        key:'17'
      },
      {
        color:'40AB3E',
        key:'0'
      },
      {
        color:'52AB75',
        key:'C'
      }
    ]
  }
});
