import Ember from 'ember';

/* Assuming all record labels fit the same sized rectangle on a page, the following
 * values indicate offsets from the top left corner of a rectangle where a piece of
 * text should be placed.
 *
 * These values will need to be adjusted if the starting font size changes.
 *
 * UNITS ARE IN MILLIMETERS, A4 MEASURES 210 x 297
 */
const locationXoffset = 10;
const locationYoffset = 20;
const recordNumberXoffset = 50;
const recordNumberYoffset = 20;
const schNumLabelXoffset = 12;
const schNumLabelYoffset = 30;
const schNumXoffset = 30;
const schNumYoffset = 30;
const previousPartLabelXoffset = 50;
const previousPartLabelYoffset = 30;
const previousPartXoffset = 80;
const previousPartYoffset = 30;
const clientNameLabelXoffset = 12;
const clientNameLabelYoffset = 40;
const clientNameXoffset = 40;
const clientNameYoffset = 40;
const classificationPathXoffset = 14;
const classificationPathYoffset = 50;


export default Ember.Controller.extend({
  records: [],
  selectedRecords: [],
  steps: [],
  actions: {
    update: function() {
      const recordsString = localStorage.getItem("recordsToPrint");
      var records = JSON.parse(recordsString);
      records = records ? records : [];
      
      this.set('records', records);
    },
    setData: function() {

        const records = [ { "id": 51, "number": "EDM-2003/001", "title": "Laboriosam at sapiente temporibus", "schedule": { "id": 26, "name": "BUSINESS DEVELOPMENT - CONFERENCES", "code": "B1.C3.02 ", "years": 5 }, "type": { "id": 3, "name": "Subject", "numberPattern": "KKK-yyyy/ggg", "defaultSchedule": null }, "consignmentCode": "DESTRUCTION CERTIFICATE 2009-01", "state": { "id": 6, "name": "Destroyed" }, "container": { "id": 24365, "number": "2007/014-EDM", "title": "Quidem et dolorum ut nisi voluptatem voluptatum vel eveniet aspernatur et tempore earum quam maiores", "consignmentCode": "DESTRUCTION CERTIFICATE 2009-01", "createdAt": 1072742400000, "updatedAt": 1360540800000 }, "location": { "id": 5, "name": "Edmonton", "code": "edm", "locked": false, "users": [] }, "createdAt": 1063584000000, "updatedAt": 1238025600000, "closedAt": 1072828800000, "classifications": [ { "id": 14, "name": "CONFERENCES", "keyword": "F", "updatedAt": 1053214494000 }, { "id": 1052, "name": "BUSINESS DEVELOPMENT", "keyword": "T", "updatedAt": 1053972153000 } ] }, { "id": 52, "number": "EDM-2003/002", "title": "Consequatur voluptas soluta in incidunt omnis praesentium illum beatae in voluptate adipisci ipsum accusamus id est", "schedule": { "id": 408, "name": "PUBLICATION - PRODUCTION", "code": "P5.P2.00 ", "years": 1 }, "type": { "id": 3, "name": "Subject", "numberPattern": "KKK-yyyy/ggg", "defaultSchedule": null }, "consignmentCode": "DESTRUCTION CERTIFICATE 2007-001", "state": { "id": 6, "name": "Destroyed" }, "container": null, "location": { "id": 5, "name": "Edmonton", "code": "edm", "locked": false, "users": [] }, "createdAt": 1063584000000, "updatedAt": 1208822400000, "closedAt": 1072828800000, "classifications": [ { "id": 244, "name": "PRODUCTION", "keyword": "F", "updatedAt": 1051999425000 }, { "id": 519, "name": "PUBLICATION", "keyword": "T", "updatedAt": 1051997475000 } ] }, { "id": 53, "number": "EDM-2003/003", "title": "Expedita ea recusandae culpa tempore", "schedule": { "id": 345, "name": "PERSONNEL - RECRUITMENT", "code": "P2.R1.03 ", "years": 0 }, "type": { "id": 3, "name": "Subject", "numberPattern": "KKK-yyyy/ggg", "defaultSchedule": null }, "consignmentCode": "DESTRUCTION CERTIFICATE 2007-001", "state": { "id": 6, "name": "Destroyed" }, "container": null, "location": { "id": 5, "name": "Edmonton", "code": "edm", "locked": false, "users": [] }, "createdAt": 1063584000000, "updatedAt": 1208822400000, "closedAt": 1072828800000, "classifications": [ { "id": 147, "name": "RECRUITMENT", "keyword": "F", "updatedAt": 1051987500000 }, { "id": 250, "name": "PERSONNEL", "keyword": "T", "updatedAt": 1053269080000 } ] } ];
        
        localStorage.setItem("recordsToPrint", JSON.stringify(records));
      
    },
    print: function() {
      
      const steps = [];
      
      var originX = 0;
      var originY = 0;
      
      for (const record of this.records) {
        var classificationPathAndTitle = [];
      
        for (var classification of record.classifications) {
          classificationPathAndTitle.push(classification.name);
        }
        
        classificationPathAndTitle.push(record.title);
        
        // TODO: insert line breaks \n in appropriate places if the string is too long
        
        
        steps.push({setFontSize: 10});
        steps.push({setFontStyle: 'bold'});
        steps.push({text: [originX + locationXoffset, originY + locationYoffset, record.location.name]});
        steps.push({text: [originX + recordNumberXoffset, originY + recordNumberYoffset, record.number.toString()]});
        steps.push({setFontStyle: 'italic'});
        steps.push({text: [originX + schNumLabelXoffset, originY + schNumLabelYoffset, "Sch Num"]});
        steps.push({setFontStyle: 'bold'});
        steps.push({text: [originX + schNumXoffset, originY + schNumYoffset, record.schedule.id.toString()]});
        steps.push({setFontStyle: 'italic'});
        steps.push({text: [originX + previousPartLabelXoffset, originY + previousPartLabelYoffset, "Previous Part"]});
        steps.push({setFontStyle: 'normal'});
        steps.push({text: [originX + previousPartXoffset, originY + previousPartYoffset, "REPLACE ME"]});
        steps.push({setFontStyle: 'italic'});
        steps.push({text: [originX + clientNameLabelXoffset, originY + clientNameLabelYoffset, "Client Name "]});
        steps.push({setFontStyle: 'bold'});
        steps.push({text: [originX + clientNameXoffset, originY + clientNameYoffset, "REPLACE ME"]});
        steps.push({text: [originX + classificationPathXoffset, originY + classificationPathYoffset, classificationPathAndTitle]});
      
        // move the origin point to the next spot
        if (originX === 0) {
          originX = 105;
        }
        else {
          originX = 0;
          originY += 60;
        }
      }
      
      
      
      this.set('steps', steps);
    }
  }
});
