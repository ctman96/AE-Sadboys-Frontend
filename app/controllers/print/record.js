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
const locationYoffset = 10;
const recordNumberXoffset = 50;
const recordNumberYoffset = 10;
const schNumLabelXoffset = 12;
const schNumLabelYoffset = 20;
const schNumXoffset = 30;
const schNumYoffset = 20;
const previousPartLabelXoffset = 50;
const previousPartLabelYoffset = 20;
const previousPartXoffset = 80;
const previousPartYoffset = 20;
const clientNameLabelXoffset = 12;
const clientNameLabelYoffset = 27;
const clientNameXoffset = 35;
const clientNameYoffset = 27;
const classificationPathXoffset = 14;
const classificationPathYoffset = 37;
const maxLineLength = 46;


export default Ember.Controller.extend({
  showDialog: false,
  records: [],
  selectedRecords: [],
  steps: [],
  currentlyLoading: false,
  actions: {
    print: function() {
      this.set('currentlyLoading', true);
      const steps = [];

      var originX = 0;
      var originY = 0;
      var recordCount = 0;

      for (const record of this.records) {
        if (recordCount >= 10) {
          originX = 0;
          originY = 0;
          recordCount = 0;
          steps.push({addPage: []});
        }

        var input = [];
        var classificationPathAndTitle = [];

        var lineLength = 0;

        for (var classification of record.classifications) {
          input.push(classification.name);
        }

        input.push(record.title);

        for (var inputString of input) {
          if (inputString.length > maxLineLength) {
            if (lineLength !== 0) {
              classificationPathAndTitle.push(" -\n");
            }

            while (inputString.length > maxLineLength) {
              classificationPathAndTitle.push(inputString.substring(0, maxLineLength));
              classificationPathAndTitle.push("\n");
              inputString = inputString.substring(maxLineLength, inputString.length);
            }

            classificationPathAndTitle.push(inputString);

            lineLength = inputString.length;

          }
          else if (lineLength + inputString.length > maxLineLength) {
            classificationPathAndTitle.push(" -\n");
            classificationPathAndTitle.push(inputString);

            lineLength = inputString.length;
          }
          else {
            if (lineLength !== 0) {
              classificationPathAndTitle.push(" - ");
            }

            classificationPathAndTitle.push(inputString);
            lineLength = lineLength + inputString.length + 3;
          }
        }

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

        if (record.number.match(/:[0-9]{2}/)) {
          const currentVolume = parseInt(record.number.substring(record.number.length - 2, record.number.length));

          const previousVolume = (currentVolume - 1).toString();

          steps.push({text: [originX + previousPartXoffset, originY + previousPartYoffset, ("00" + previousVolume).substr(-2)]});
        }

        steps.push({setFontStyle: 'italic'});
        steps.push({text: [originX + clientNameLabelXoffset, originY + clientNameLabelYoffset, "Client Name "]});
        steps.push({setFontStyle: 'bold'});

        if (record.type.numberPattern === 'KKK-LLLLLL.gggg') {
          const offset = record.number.match(/:[0-9]{2}/) ? 8 : 5;
          steps.push({text: [originX + clientNameXoffset, originY + clientNameYoffset, record.number.substring(4, record.number.length - offset)]});
        }

        steps.push({text: [originX + classificationPathXoffset, originY + classificationPathYoffset, classificationPathAndTitle.join("")]});

        // move the origin point to the next spot
        if (originX === 0) {
          originX = 105;
        }
        else {
          originX = 0;
          originY += 60;
        }

        recordCount++;
      }

      this.set('steps', steps);
      this.set('currentlyLoading', false);
      this.set('showDialog', true);
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
