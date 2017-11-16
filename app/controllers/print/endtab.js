import Ember from 'ember';


const spaceSize = 8;
const tabWidth = 35;
const maxHeight = 190;
const Xoffset = 10;
const fontSize = 40;

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

      for (const record of this.records) {
        
        const number = record.number;
        
        
        var alphanumericCount = 0;
        var nonAlphanumericCount = 0;
        // Iterate over the string to check how many alphanumeric characters there are
        for (var i = 0; i < number.length; i++) {
          const character = number[i];
          
          if (/[a-zA-Z0-9]/.test(character)) {
            alphanumericCount += 1;
          }
          else {
            nonAlphanumericCount += 1;
          }          
        }
        
        
        
        
        
        const usableSize = maxHeight - (spaceSize * nonAlphanumericCount);
        const stepSize = usableSize / alphanumericCount;
        const Xpadding = 2;
        const Ypadding = 14; // this will likely need to vary with the stepSize and the fontSize
        
        
        var relativeY = 5; // THIS IS THE BOTTOM Y COORDINATE OF THE PREVIOUSLY ADDED TAB, NOT OF THE ORIGIN
        
        for (var j = 0; j < number.length; j++) {
          const character = number[j];
          
          if (/[a-zA-Z0-9]/.test(character)) {
            steps.push({roundedRect: [originX + Xoffset, relativeY, tabWidth, stepSize, 3, 3]});
            steps.push({setFontSize: fontSize});
            steps.push({text: [originX + Xoffset + Xpadding, relativeY + Ypadding, character]});
            steps.push({text: [originX + Xoffset + (2 * Xpadding) + (tabWidth / 2), relativeY + Ypadding, character]});
            
            relativeY += stepSize;
          }
          else {
            relativeY += spaceSize;
          } 

        }
        
        // move the origin point to the next spot
        originX += 50;
      
      }
      
      
      
      
      
      this.set('steps', steps);
    }
  }
});