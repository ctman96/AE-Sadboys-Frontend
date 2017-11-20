import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  //Models
  resultModel: null,
  schedules: null,
  types: null,
  states: null,
  locations: null,

  //state toggles
  showAdvancedSearch: false,
  showResults: true,
  currentlyLoading: false,

  //Query Params
  query: null,
  page: 0,
  pageSize: 10,
  records: true,
  containers: true,
  created: null,
  updated: null,
  closed: null,
  classification: null,
  location: null,
  schedule: null,
  state: null,
  rectype: null,

  //
  selectedState: null,

  //Pagination data
  limit: 10,
  limitOptions : [10, 20, 30],
  pages: [],
  totalElements: null,
  searchResults: null,
  searchQuery: null,

  actions: {
    toggleAdvancedSearch: function() {
      this.toggleProperty('showAdvancedSearch');
    },

    incrementPage: function(){
      this.set ('page', this.page+1);
    },

    decrementPage: function(){
      this.set ('page', this.page-1)
    },

    search: function(){
      this.set('currentlyLoading', true);
      this.send('refreshModel');
    },

    updateRecordState: function(selection){
      try {
        this.set('selectedState', selection);
        this.set('state', selection.id);
      }
      catch(error) {
        Ember.Logger.log(error);
        this.set('selectedState', null);
        this.set('state', null);
      }
    },
    updateRecordType: function(selection){
      try {
        this.set('selectedType', selection);
        this.set('rectype', selection.id);
      }
      catch(error) {
        Ember.Logger.log(error);
        this.set('selectedType', null);
        this.set('rectype', null);
      }
    },
    updateSchedule: function(selection){
      try {
        this.set('selectedSchedule', selection.code);
        this.set('schedule', selection.id);
      }
      catch(error) {
        Ember.Logger.log(error);
        this.set('selectedSchedule', null);
        this.set('schedule', null);
      }
    },
    updateLocation: function(selection){
      try{
        this.set('selectedLocation', selection.name);
        this.set('location', selection.id);
      }
      catch(error){
        this.set('selectedLocation', null);
        this.set('location', null);
      }
    }
  }
});
