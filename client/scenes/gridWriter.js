Template.gridWriter.onCreated(function() {
  this.ascii = new ReactiveVar(false);
  this.ransom = new ReactiveVar([]);
  this.rows = new ReactiveVar([]);
  
  this.autorun(() => {
    if (this.ascii.get()) {
      var rows = [];
      var newLines = 0
      var text = this.ascii.get().split('');
      var list = _.map(text, (item) => {
        if (item === "\n") {
          newLines++
        }
        return item.toLowerCase();
      });
        
      if (list[0] === '\n') {
        list.shift();
      }
      
      var lastIndex = 0;
      for (var i = 0; i < newLines; i++) {
        for (var r = 0; r < list.length; r++) {
          if (list[r] === '\n') {
            if (r > lastIndex) {
              var row = list.slice(lastIndex, r)
              row.shift(); 
              var obj = {
                row: row
              }
              rows.push(obj);  
              lastIndex = r;
            }
          }
        }
      }
      this.ransom.set(list);
      this.rows.set(rows);
    }
  });
});


Template.gridWriter.onRendered(function() {
  var inst = Template.instance(); 
  var asciiText = $('#ascii').html();
  this.ascii.set(asciiText);
});

Template.gridWriter.helpers({
  writeChar: function(){
    return Template.instance().ransom.get();
  },
  rowChar: function() {
    return Template.instance().rows.get();
  }
})