import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return[
      {
      "id" : 5,
      "name" : "AB",
      "keyword" : "F",
      "updatedAt" : 1107327210000,
      "parentHierarchies" : [ ],
      "childHierarchies" : [ {
        "id" : 2232,
        "parent" : {
          "id" : 10,
          "name" : "COMPLIANCE",
          "keyword" : "F",
          "updatedAt" : 1065837648000
        },
        "rel" : 3,
        "child" : {
          "id" : 5,
          "name" : "AB",
          "keyword" : "F",
          "updatedAt" : 1107327210000
        }
      }, {
        "id" : 7,
        "parent" : {
          "id" : 9,
          "name" : "Alberta",
          "keyword" : "F",
          "updatedAt" : 1050554266000
        },
        "rel" : 1,
        "child" : {
          "id" : 5,
          "name" : "AB",
          "keyword" : "F",
          "updatedAt" : 1107327210000
        }
      }
    ]
  }]}
});
