import Ember from 'ember';


const spaceSize = 5;
const tabWidth = 35;
const maxHeight = 200;
const Xoffset = 10;
const fontSize = 40;

export default Ember.Controller.extend({
  records: [],
  selectedRecords: [],
  steps: [],
  colourTable: {},
  hexToRGB: function(hex){
    hex = "0x" + hex;
    
    const R = hex >> 16;
    const G = hex >> 8 & 0xFF;
    const B = hex & 0xFF;
    
    return [R, G, B];
  },
  getColours: function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ipfms-server.herokuapp.com/labelcolours?pageSize=38', true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          const response = JSON.parse(xhr.responseText);
          
          const newColourTable = {};
          
          for (const mapping of response.content) {
            newColourTable[mapping.key] = mapping.colour;
          }
          
          this.set("colourTable", newColourTable);
          
          this.printTabs();
        }
      }
      
      xhr.send();
  },
  printTabs: function() {
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
      const XpaddingLeft = 2;
      const XpaddingRight = 3;
      const Ypadding = stepSize - ((stepSize - 10) / 2);
      
      var relativeY = 5; // THIS IS THE BOTTOM Y COORDINATE OF THE PREVIOUSLY ADDED TAB, NOT OF THE ORIGIN
      
      for (var j = 0; j < number.length; j++) {
        const character = number[j];
        const colour = this.hexToRGB(this.colourTable[character.toUpperCase()]);

        
        if (/[a-zA-Z0-9]/.test(character)) {
          steps.push({setFillColor: colour});
          steps.push({setDrawColor: [0,0,0]});
          steps.push({roundedRect: [originX + Xoffset, relativeY, tabWidth, stepSize, 3, 3, 'FD']});
          
          // steps.push({setFillColor: [0,0,0]});
          steps.push({setFontSize: fontSize});
          steps.push({setTextColor: [0,0,0]});
          steps.push({setFontStyle: 'bold'});
          steps.push({text: [originX + Xoffset + XpaddingLeft, relativeY + Ypadding, character]});
          steps.push({text: [originX + Xoffset + (tabWidth / 2) + XpaddingRight, relativeY + Ypadding, character]});

          steps.push({setFontSize: fontSize - 2.5});
          steps.push({setTextColor: [255,255,255]});
          steps.push({setFontStyle: 'normal'});
          steps.push({text: [originX + Xoffset + XpaddingLeft + 0.4, relativeY + Ypadding - 0.4, character]});
          steps.push({text: [originX + Xoffset + (tabWidth / 2) + XpaddingRight + 0.4, relativeY + Ypadding - 0.4, character]});
          
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
    
  },
  actions: {
    update: function() {
      const recordsString = localStorage.getItem("recordsToPrint");
      var records = JSON.parse(recordsString);
      records = records ? records : [];
      
      this.set('records', records);
    },
    setData: function() {

        const records = [ { "id": 51, "number": "123-4567/890", "title": "Laboriosam at sapiente temporibus", "schedule": { "id": 26, "name": "BUSINESS DEVELOPMENT - CONFERENCES", "code": "B1.C3.02 ", "years": 5 }, "type": { "id": 3, "name": "Subject", "numberPattern": "KKK-yyyy/ggg", "defaultSchedule": null }, "consignmentCode": "DESTRUCTION CERTIFICATE 2009-01", "state": { "id": 6, "name": "Destroyed" }, "container": { "id": 24365, "number": "2007/014-EDM", "title": "Quidem et dolorum ut nisi voluptatem voluptatum vel eveniet aspernatur et tempore earum quam maiores", "consignmentCode": "DESTRUCTION CERTIFICATE 2009-01", "createdAt": 1072742400000, "updatedAt": 1360540800000 }, "location": { "id": 5, "name": "Edmonton", "code": "edm", "locked": false, "users": [] }, "createdAt": 1063584000000, "updatedAt": 1238025600000, "closedAt": 1072828800000, "classifications": [ { "id": 14, "name": "CONFERENCES", "keyword": "F", "updatedAt": 1053214494000 }, { "id": 1052, "name": "BUSINESS DEVELOPMENT", "keyword": "T", "updatedAt": 1053972153000 } ] }, { "id": 52, "number": "ABC-DEF-G", "title": "Consequatur voluptas soluta in incidunt omnis praesentium illum beatae in voluptate adipisci ipsum accusamus id est", "schedule": { "id": 408, "name": "PUBLICATION - PRODUCTION", "code": "P5.P2.00 ", "years": 1 }, "type": { "id": 3, "name": "Subject", "numberPattern": "KKK-yyyy/ggg", "defaultSchedule": null }, "consignmentCode": "DESTRUCTION CERTIFICATE 2007-001", "state": { "id": 6, "name": "Destroyed" }, "container": null, "location": { "id": 5, "name": "Edmonton", "code": "edm", "locked": false, "users": [] }, "createdAt": 1063584000000, "updatedAt": 1208822400000, "closedAt": 1072828800000, "classifications": [ { "id": 244, "name": "PRODUCTION", "keyword": "F", "updatedAt": 1051999425000 }, { "id": 519, "name": "PUBLICATION", "keyword": "T", "updatedAt": 1051997475000 } ] }, { "id": 53, "number": "HI-JKLM-NO-P-QRST", "title": "Expedita ea recusandae culpa tempore", "schedule": { "id": 345, "name": "PERSONNEL - RECRUITMENT", "code": "P2.R1.03 ", "years": 0 }, "type": { "id": 3, "name": "Subject", "numberPattern": "KKK-yyyy/ggg", "defaultSchedule": null }, "consignmentCode": "DESTRUCTION CERTIFICATE 2007-001", "state": { "id": 6, "name": "Destroyed" }, "container": null, "location": { "id": 5, "name": "Edmonton", "code": "edm", "locked": false, "users": [] }, "createdAt": 1063584000000, "updatedAt": 1208822400000, "closedAt": 1072828800000, "classifications": [ { "id": 147, "name": "RECRUITMENT", "keyword": "F", "updatedAt": 1051987500000 }, { "id": 250, "name": "PERSONNEL", "keyword": "T", "updatedAt": 1053269080000 } ] }, { "id": 829, "number": "UV-WX-YZ", "title": "Expedita ea recusandae culpa tempore", "schedule": { "id": 345, "name": "PERSONNEL - RECRUITMENT", "code": "P2.R1.03 ", "years": 0 }, "type": { "id": 3, "name": "Subject", "numberPattern": "KKK-yyyy/ggg", "defaultSchedule": null }, "consignmentCode": "DESTRUCTION CERTIFICATE 2007-001", "state": { "id": 6, "name": "Destroyed" }, "container": null, "location": { "id": 5, "name": "Edmonton", "code": "edm", "locked": false, "users": [] }, "createdAt": 1063584000000, "updatedAt": 1208822400000, "closedAt": 1072828800000, "classifications": [ { "id": 147, "name": "RECRUITMENT", "keyword": "F", "updatedAt": 1051987500000 }, { "id": 250, "name": "PERSONNEL", "keyword": "T", "updatedAt": 1053269080000 } ] }];
        
        localStorage.setItem("recordsToPrint", JSON.stringify(records));
      
    },
    print: function() {
      this.getColours();
    }
  }
});
