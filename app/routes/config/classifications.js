import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return[
      {
        name:"Ceremonies and Celebrations",
        keyword:false,
        updatedAt: 1065221887000
      },
      {
        name:"Advisory Services",
        keyword:true,
        updatedAt: 1065231387000
      },
      {
        name:"Advice",
        keyword: false,
        updatedAt: 1065224687000
      }
    ]
  }
});
