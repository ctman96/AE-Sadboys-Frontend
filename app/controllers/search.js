import Ember from 'ember';

export default Ember.Controller.extend({
  locations: [
    {name: "location1", id: 1},
    {name: "location2", id: 2}
  ],
  functions: [
    {name: "function1", id: 1},
    {name: "function2", id: 2}
  ],
  projectManagers: [
    {name: "projectManager1", id: 1},
    {name: "projectManager2", id: 2}
  ],
  clientNames: [
    {name: "clientName1", id: 1},
    {name: "clientName2", id: 2}
  ],
  fieldOfPractices: [
    {name: "fieldOfPractice1", id: 1},
    {name: "fieldOfPractice2", id: 2}
  ],
  recordTypes: [
    {name: "recordType1", id: 1},
    {name: "recordType2", id: 2}
  ],
  classifications: [
    {name: "classification1", id: 1},
    {name: "classification2", id: 2}
  ],
  recordStates: [
    {name: "recordState1", id: 1},
    {name: "recordState2", id: 2}
  ],
  dateFields: [
    {name: "dateField1", id: 1},
    {name: "dateField2", id: 2}
  ],
  retentionSchedules: [
    {name: "retentionSchedule1", id: 1},
    {name: "retentionSchedule2", id: 2}
  ]
});