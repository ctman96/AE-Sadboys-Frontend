import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  //Models
  doSearch: false,
  resultModel: null,
  schedules: null,
  types: null,
  states: null,
  locations: null,

  //state toggles
  showAdvancedSearch: true,
  showResults: true,
  currentlyLoading: false,

  //Query Params
  query: null,
  quickSearch: false,
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
  selectedType: null,
  selectedLocation: null,
  selectedClassification: null,
  selectedSchedule: null,

  //Pagination data
  limit: 10,
  limitOptions : [10, 20, 30],
  totalPages: null,
  pages: [],
  totalElements: null,
  searchResults: null,
  searchQuery: null,

  actions: {
    toggleAdvancedSearch: function() {
      this.send('clearAllFilters');
      this.toggleProperty('showAdvancedSearch');
      this.set('quickSearch', !this.showAdvancedSearch);
    },

    incrementPage: function(){
      if (this.page < this.totalPages){
        this.set('doSearch', true);
        this.set ('page', this.page+1);
      }
    },

    decrementPage: function(){
      if (this.page > 0) {
        this.set('doSearch', true);
        this.set('page', this.page - 1)
      }
    },
    clearAllFilters: function(){
      this.set('state', null);
      this.set('selectedState', '');
      this.set('rectype', null);
      this.set('selectedType', '');
      this.set('schedule', null);
      this.set('selectedSchedule', '');
      this.set('location', null);
      this.set('selectedLocation', '');
      this.set('classification', null);
      this.set('selectedClassification', '');

      this.set('created', null);
      this.set('updated', null);
      this.set('closed', null);
      this.set('dateCreated', null);
      this.set('dateUpdated', null);
      this.set('dateClosed', null);
    },

    search: function() {
      //Set the state query param, in case the params have been changed
      try {
        let states = this.get('states');
        let selectedState = this.get('selectedState');
        let state = null;
        for (let i = 0; i < states.length; i++) {
          if (states[i].name === selectedState) {
            state = states[i].id;
            break;
          }
        }
        this.set('state', state);
      } catch (error) {
        this.set('state', null);
      }

      try{
        let types = this.get('types');
        let selectedType = this.get('selectedType');
        let type = null;
        for (let i = 0; i < types.length; i++) {
          if (types[i].name === selectedType) {
            type = types[i].id;
            break;
          }
        }
        this.set('rectype', type);
      }catch(error) {
        this.set('rectype', null);
      }

      try{
        let schedules = this.get('schedules');
        let selectedSchedule = this.get('selectedSchedule');
        let schedule = null;
        for (let i = 0; i<schedules.length; i++){
          if (schedules[i].code === selectedSchedule){
            schedule = schedules[i].id;
            break;
          }
        }
        this.set('schedule', schedule);
      }catch(error) {
        this.set('schedule', null);
      }

      try {
        let locations = this.get('locations');
        let selectedLocation = this.get('selectedLocation');
        let location = null;
        for (let i = 0; i < locations.length; i++) {
          if (locations[i].name === selectedLocation) {
            location = locations[i].id;
            break;
          }
        }
        this.set('location', location);
      }catch(error){
        this.set('location', null);
      }

      try {
        let classifications = this.get('classifications');
        let selectedClassification = this.get('selectedClassification');
        let classification = null;
        for (let i = 0; i < classifications.length; i++) {
          if (classifications[i].name === selectedClassification) {
            classification = classifications[i].id;
            break;
          }
        }
        this.set('classification', classification);
      }catch(error){
        this.set('classification', null);
      }

      try {
        let fullSearch = this.get('showAdvancedSearch');
        this.set('quickSearch', !fullSearch)
      }
      catch(error){

      }

      this.set('doSearch', true);
      this.set('currentlyLoading', true);
      this.send('refreshModel');
    },
    updateCreated: function(selection){
      let created = selection.replace(/-/g, '.');
      created = parseInt((new Date(created).getTime()/1000).toFixed(0));

      if(!isNaN(created)){
        this.set('created', created);
      }
      this.set('dateCreated', selection);
    },
    updateUpdated: function(selection){
      let updated = selection.replace(/-/g, '.');
      updated = parseInt((new Date(updated).getTime()/1000).toFixed(0));
      if(!isNaN(updated)) {
        this.set('updated', updated);
      }
      this.set('dateUpdated', selection);
    },
    updateClosed: function(selection){
      let closed = selection.replace(/-/g, '.');
      closed = parseInt((new Date(closed).getTime()/1000).toFixed(0));
      if(!isNaN(closed)) {
        this.set('closed', closed);
      }
      this.set('dateClosed', selection);
    },

    updateRecordState: function(selection){
      try {
        this.set('selectedState', selection.name);
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
        this.set('selectedType', selection.name);
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
    },
    updateClassification: function(selection){
      try{
        this.set('selectedClassification', selection.name);
        this.set('classification', selection.id);
      }
      catch(error){
        this.set('selectedClassification', null);
        this.set('classification', null);
      }
    },
    addToStorage: function(){
      let recordsArray = JSON.parse(localStorage.getItem("recordsToPrint"));
      if (!recordsArray){
        recordsArray = []
      }
      let containersArray = JSON.parse(localStorage.getItem("containersToPrint"));
      if (!containersArray){
        containersArray = []
      }

      let resultsArray = this.get('resultModel.content');

      let len = resultsArray.length;
      for (let i = 0; i < len; i++){
        if(resultsArray[i].checked){
          if(resultsArray[i].record) {
            recordsArray.push(resultsArray[i].record);
          }
          else{
            containersArray.push(resultsArray[i].container);
          }
        }
      }

      localStorage.setItem("recordsToPrint", JSON.stringify(recordsArray));
      localStorage.setItem("containersToPrint", JSON.stringify(containersArray));

      alert("Successfully Added to Queue");
    }
  }
});
