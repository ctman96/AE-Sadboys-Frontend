import Ember from 'ember';

const maxLineLength = 44;
const originYinitial = 78;
const recordYstepSize = 35;
const titleXoffset = 19;
const titleYoffset = 26;

const consignmentNumberLabelXoffset = 152;
const consignmentNumberLabelYoffset = 18;
const consignmentNumberBoxXoffset = 150;
const consignmentNumberBoxYoffset = 20;
const consignmentNumberBoxXsize = 38;
const consignmentNumberBoxYsize = 10;

const licenseeLabelXoffset = 20;
const licenseeLabelYoffset = 42;
const licenseeBoxXoffset = 20;
const licenseeBoxYoffset = 45;
const licenseeBoxXsize = 130;
const licenseeBoxYsize = 12;

const pageNumberBoxXoffset = licenseeBoxXoffset + licenseeBoxXsize + 10;
const pageNumberBoxYoffset = licenseeBoxYoffset;
const pageNumberBoxXsize = 28;
const pageNumberBoxYsize = 12;

const headerYsize = 12;
const headerXoffset = 15;
const headerYoffset = 60;
const containerRecordBoxXoffset = headerXoffset;
const containerRecordBoxXsize = 30;
const numberBoxXoffset = containerRecordBoxXoffset + containerRecordBoxXsize;
const numberBoxXsize = 30;
const titleBoxXoffset = numberBoxXoffset + numberBoxXsize;
const titleBoxXsize = 90;
const scheduleNumberBoxXoffset = titleBoxXoffset + titleBoxXsize;
const scheduleNumberBoxXsize = 25;

const recordIdXoffset = 18;
const recordIdYoffset = 0;
const idXoffset = 33;
const idYoffset = 6;
const containerTitleXoffset = 77;
const containerTitleYoffset = 6;
const dateCreatedLabelXoffset = 93;
const dateCreatedLabelYoffset = 20;
const dateClosedLabelXoffset = 94.5;
const dateClosedLabelYoffset = 24;
const dateDueLabelXoffset = 77;
const dateDueLabelYoffset = 28;
const dateCreatedXoffset = 115;
const dateCreatedYoffset = 20;
const dateClosedYoffset = 24;
const dateDueYoffset = 28;
const scheduleNumberXoffset = 175;
const scheduleNumberYoffset = 6;

const endOfReportBoxXoffset = 18;
const endOfReportBoxYoffset = 280;
const endOfReportBoxXsize = 30;
const endOfReportBoxYsize = 7;

const footerLicenseeBoxXoffset = endOfReportBoxXoffset + endOfReportBoxXsize + 2;
const footerLicenseeBoxYoffset = 280;
const footerLicenseeBoxXsize = 145;
const footerLicenseeBoxYsize = 7;


export default Ember.Controller.extend({
  showDialog: false,
  containers: [],
  records: [],
  steps: [],
  currentlyLoading: false,
  formatDate: function(timestamp) {
    const date = new Date(timestamp);
    const dateYear = date.getFullYear();
    let dateMonth = date.getMonth() + 1;
    dateMonth = ('00' + dateMonth.toString()).slice(-2);
    let dateDate = date.getDate();
    dateDate = ('00' + dateDate.toString()).slice(-2);
    const dateHour = date.getHours() % 12;
    let dateMinute = date.getMinutes();
    dateMinute = ('00' + dateMinute.toString()).slice(-2);
    const dateAMPM = date.getHours() >= 12 ? 'PM' : 'AM';
    const formattedDate = `${dateYear}-${dateMonth}-${dateDate} at ${dateHour}:${dateMinute} ${dateAMPM}`;

    return formattedDate;
  },
  addPageHeaders: function(steps, pageNumber) {
    steps.push({setFontSize: 12});
    steps.push({setFontStyle: 'bold'});
    steps.push({text: [titleXoffset, titleYoffset, "CONSIGNMENT AND CONTAINER"]});

    steps.push({setFontSize: 10});
    steps.push({setFontStyle: 'normal'});

    steps.push({text: [consignmentNumberLabelXoffset, consignmentNumberLabelYoffset, "Consignment Number"]});

    steps.push({setFillColor: [175,175,175]}); // KEEP THIS LINE RIGHT ABOVE THE FOLLOWING RECT LINE OR IT WILL NOT WORK
    steps.push({rect: [consignmentNumberBoxXoffset, consignmentNumberBoxYoffset, consignmentNumberBoxXsize, consignmentNumberBoxYsize, 'F']});


    steps.push({rect: [consignmentNumberBoxXoffset, consignmentNumberBoxYoffset + consignmentNumberBoxYsize + 2, consignmentNumberBoxXsize, consignmentNumberBoxYsize]});
    steps.push({text: [licenseeLabelXoffset, licenseeLabelYoffset, "Licensee"]});
    steps.push({rect: [licenseeBoxXoffset, licenseeBoxYoffset, licenseeBoxXsize, licenseeBoxYsize]});
    steps.push({rect: [licenseeBoxXoffset, licenseeBoxYoffset, licenseeBoxXsize, licenseeBoxYsize]});
    steps.push({rect: [pageNumberBoxXoffset, pageNumberBoxYoffset, pageNumberBoxXsize, pageNumberBoxYsize]});

    steps.push({rect: [containerRecordBoxXoffset, headerYoffset, containerRecordBoxXsize, headerYsize]});
    steps.push({rect: [numberBoxXoffset, headerYoffset, numberBoxXsize, headerYsize]});
    steps.push({rect: [titleBoxXoffset, headerYoffset, titleBoxXsize, headerYsize]});
    steps.push({rect: [scheduleNumberBoxXoffset, headerYoffset, scheduleNumberBoxXsize, headerYsize]});

    steps.push({setFontSize: 10});
    steps.push({setFontStyle: 'bold'});
    steps.push({text: [licenseeBoxXoffset + 6, licenseeBoxYoffset + 7.5, "Associated Engineering"]});
    steps.push({text: [pageNumberBoxXoffset + 7, pageNumberBoxYoffset + 7.5, `Page ${pageNumber}`]});
    steps.push({text: [containerRecordBoxXoffset + 6, headerYoffset + 5, "Container\n  Record"]});
    steps.push({text: [numberBoxXoffset + 8, headerYoffset + 7, "Number"]});
    steps.push({text: [titleBoxXoffset + 42, headerYoffset + 7, "Title"]});
    steps.push({text: [scheduleNumberBoxXoffset + 3, headerYoffset + 7, "Schedule #"]});
  },
  print: function() {
    this.set('currentlyLoading', true);
    const steps = [];

    let pageNumber = 1;
    let originY = originYinitial;

    this.addPageHeaders(steps, pageNumber);

    let containerName = '';
    let consignmentNumber = null;

    for (let i = 0; i < this.containers.length; i++) {
      let container = this.containers[i];
      if (container.id === this.selectedContainer) {
        containerName = container.number;
        consignmentNumber = container.consignmentCode;
        break;
      }
    }

    steps.push({setFontSize: 10});
    steps.push({setFontStyle: 'bold'});
    steps.push({text: [consignmentNumberBoxXoffset+(consignmentNumberBoxXsize/4), consignmentNumberBoxYoffset+(consignmentNumberBoxYsize/2), consignmentNumber]});

    let recordCount = 0;


    for (let i = 0; i < this.records.length;i++) {
      let record = this.records[i];
      if (recordCount >= 6) {
        pageNumber++;
        originY = originYinitial;
        recordCount = 0;
        steps.push({addPage: []});

        this.addPageHeaders(steps, pageNumber);
      }

      const dateCreated = this.formatDate(record.createdAt);
      const dateClosed = this.formatDate(record.closedAt);

      let input = [];
      let classificationPathAndTitle = [];

      let lineLength = 0;

      for (let j = 0; j < record.classifications.length; j++) {
        let classification = record.classifications[j];
        input.push(classification.name);
      }

      input.push(record.title);

      let longInput = input.join(" - ");
      while (longInput.length > maxLineLength) {
        classificationPathAndTitle.push(longInput.substring(0, maxLineLength));
        classificationPathAndTitle.push("\n");
        longInput = longInput.substring(maxLineLength, longInput.length);
      }
      classificationPathAndTitle.push(longInput);

      const cpatString = classificationPathAndTitle.join("");

      steps.push({setFontSize: 10});
      steps.push({setFontStyle: 'bold'});
      steps.push({text: [titleXoffset, originY + recordIdYoffset, containerName]});
      steps.push({text: [idXoffset, originY + idYoffset, record.number]});
      steps.push({text: [scheduleNumberXoffset, originY + scheduleNumberYoffset, record.schedule.code]});

      steps.push({setFontSize: 9});
      steps.push({setFontStyle: 'italic'});
      steps.push({text: [dateCreatedLabelXoffset, originY + dateCreatedLabelYoffset, "Date Created"]});
      steps.push({text: [dateClosedLabelXoffset, originY + dateClosedLabelYoffset, "Date Closed"]});
      steps.push({text: [dateDueLabelXoffset, originY + dateDueLabelYoffset, "Date Due for Destruction"]});

      steps.push({setFontSize: 8});
      steps.push({setFontStyle: 'bold'});
      steps.push({text: [containerTitleXoffset, originY + containerTitleYoffset, cpatString]});

      steps.push({setFontSize: 9});
      steps.push({setFontStyle: 'normal'});
      steps.push({text: [dateCreatedXoffset, originY + dateCreatedYoffset, dateCreated]});
      steps.push({text: [dateCreatedXoffset, originY + dateClosedYoffset, dateClosed]});

      recordCount++;

      originY += recordYstepSize;

    }

    steps.push({setFontSize: 10});
    steps.push({setFontStyle: 'italic'});
    steps.push({roundedRect: [endOfReportBoxXoffset, endOfReportBoxYoffset, endOfReportBoxXsize, endOfReportBoxYsize, 1, 1]});
    steps.push({text: [endOfReportBoxXoffset + 3.5, endOfReportBoxYoffset + 4.5, "End of Report"]});
    steps.push({roundedRect: [footerLicenseeBoxXoffset, footerLicenseeBoxYoffset, footerLicenseeBoxXsize, footerLicenseeBoxYsize, 1, 1]});
    steps.push({text: [footerLicenseeBoxXoffset + 3.5, footerLicenseeBoxYoffset + 4.5, "Associated Engineering"]});

    this.set('steps', steps);
    this.set('currentlyLoading', false);
  },
  actions: {
    printHandler: function() {
      if (this.selectedContainer) {
        this.set('currentlyLoading', true);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.store.adapterFor('application').get('host')+`/containers/${this.selectedContainer}/records`, true);

        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4 && xhr.status == 200) {
            const response = JSON.parse(xhr.responseText);

            this.set('records', response);
            this.print();
            this.set('currentlyLoading', false);
            this.set('showDialog', true);
          }
        };

        xhr.send();
      }
      else {
        return alert("No container selected.");
      }
    },
    clearPrintQueue: function() {
      localStorage.setItem('containersToPrint', JSON.stringify([]));
      this.set('containers', []);
    },
    closeDialog: function() {
      this.set('showDialog', false);
    },
    delete: function(container){
      let containersArray = JSON.parse(localStorage.getItem("containersToPrint"));
      let newContainerArray = [];

      if (!containersArray){
        containersArray = [];
        return;
      }

      for(let i = 0; i < containersArray.length; i++){
        Ember.Logger.log(containersArray[i]);
        Ember.Logger.log(container);
        if(containersArray[i].id !== container.id){
          newContainerArray.push(containersArray[i]);
        }
      }

      localStorage.setItem("containersToPrint", JSON.stringify(newContainerArray));
      this.set('containers', newContainerArray);
    }
  }
});
