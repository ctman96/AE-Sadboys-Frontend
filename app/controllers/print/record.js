import Ember from 'ember';

export default Ember.Controller.extend({
  records: [],
  actions: {
    update: function() {
      const recordsString = localStorage.getItem("recordsToPrint");
      var records = JSON.parse(recordsString);
      records = records ? records : [];
      
      this.set('records', records);
    },
    setData: function() {
      var records = JSON.parse(localStorage.getItem("recordsToPrint"));

      if (records) {
        // don't do anything for now
      }
      else {
        records = [
          {id: 51, createdAt: 1063651956000, title: "Laboriosam at sapiente temporibus"},
          {id: 52, createdAt: 1063653108000, title: "Consequatur voluptas soluta in incidunt omnis praesentium illum beatae in voluptate adipisci ipsum accusamus id est"},
          {id: 53, createdAt: 1063654030000, title: "Expedita ea recusandae culpa tempore"},
        ];
        
        localStorage.setItem("recordsToPrint", JSON.stringify(records));
      }
    }
  }
});
