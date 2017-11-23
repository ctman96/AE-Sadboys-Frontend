import Ember from 'ember';

export default Ember.Controller.extend({
  containers: [],
  steps: [],
  actions: {
    print: function() {
      const data = JSON.parse(localStorage.getItem('recordsToPrint'));
      
      console.log(data[0]);
    },
    clearPrintQueue: function() {
      localStorage.setItem('containersToPrint', JSON.stringify([]));
      this.set('records', []);
    },
    setData: function() {
      const data = [{
            "id": 10749,
            "number": "2006.001-TES",
            "title": "Sapiente reiciendis et quos ullam eum in omnis accusamus explicabo",
            "consignmentCode": "",
            "createdAt": 1141689600000,
            "updatedAt": 1150934400000
        },
        {
            "id": 10750,
            "number": "2005/001-PER",
            "title": "Quia minus quis",
            "consignmentCode": "",
            "createdAt": 1141689600000,
            "updatedAt": 1487721600000
        },
        {
            "id": 10751,
            "number": "2005/002-PER",
            "title": "Corrupti sed minima id dolor aliquid culpa",
            "consignmentCode": "",
            "createdAt": 1141689600000,
            "updatedAt": 1487721600000
        }];
        
      localStorage.setItem('containersToPrint', JSON.stringify(data));
      this.set('containers', data);
    }
  }
});
