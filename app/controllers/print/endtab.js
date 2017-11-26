import Ember from 'ember';


const spaceSize = 5;
const tabWidth = 35;
const maxHeight = 200;
const Xoffset = 10;
const fontSize = 40;

export default Ember.Controller.extend({
  showDialog: false,
  records: [],
  selectedRecords: [],
  steps: [],
  colourTable: {},
  currentlyLoading: false,
  hexToRGB: function(hex){
    hex = "0x" + hex;

    const R = hex >> 16;
    const G = hex >> 8 & 0xFF;
    const B = hex & 0xFF;

    return [R, G, B];
  },
  getColours: function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.store.adapterFor('application').get('host')+'/labelcolours/all', true);
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
    this.set('currentlyLoading', true);
    const steps = [];

    let originX = 0;
    let recordCount = 0;

    for (let i = 0; i < this.records.length;i++) {
      let record = this.records[i];
      if (recordCount >= 6) {
        originX = 0;
        recordCount = 0;
        steps.push({addPage: []});
      }

      const number = record.number;


      let alphanumericCount = 0;
      let nonAlphanumericCount = 0;
      // Iterate over the string to check how many alphanumeric characters there are
      for (let i = 0; i < number.length; i++) {
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

      let relativeY = 5; // THIS IS THE BOTTOM Y COORDINATE OF THE PREVIOUSLY ADDED TAB, NOT OF THE ORIGIN

      for (let j = 0; j < number.length; j++) {
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

      recordCount++;

    }

    this.set('steps', steps);
    this.set('currentlyLoading', false);
    this.set('showDialog', true);

  },
  actions: {
    print: function() {
      this.getColours();
    },
    clearPrintQueue: function() {
      localStorage.setItem('recordsToPrint', JSON.stringify([]));
      this.set('records', []);
    },
    closeDialog: function() {
      this.set('showDialog', false);
    }
  }
});
