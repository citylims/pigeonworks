Template.gridWriter.onCreated(function() {
  this.ascii = new ReactiveVar(false);
  this.ransom = new ReactiveVar([]);
  this.rows = new ReactiveVar([]);
  this.grid = new ReactiveVar(false);
  this.selectedGrid = new ReactiveVar('grid');
  this.gridWidth = new ReactiveVar('49');
  
  this.autorun(() => {
    if (this.ascii.get() && this.selectedGrid.get() === 'ascii') {
      var pattern = this.createRows(this.ascii.get())
      this.ransom.set(pattern.list);
      this.rows.set(pattern.rows);
    }
  });
  
  this.autorun(() => {
    if (this.grid.get() && this.selectedGrid.get() === 'grid') {
      var pattern = this.createRows(this.grid.get());
      this.ransom.set(pattern.list);
      this.rows.set(pattern.rows);
    }
  });
  
  this.createRows = (text) => {
    var rows = [];
    var newLines = 0
    // var text = this.ascii.get().split('');
    var text = text.split('')
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
    return {rows: rows, list: list}
  }
  
  this.refresh = () => {
    this.ransom.set(false);
    this.rows.set(false);
  }
});

Template.gridWriter.helpers({
  writeChar: function(){
    return Template.instance().ransom.get();
  },
  rowChar: function() {
    return Template.instance().rows.get();
  }
});

Template.gridWriter.events({
  'click [data-action="switch"]': function(e,t) {
    if (t.selectedGrid.get() == 'grid') {
      t.selectedGrid.set('ascii');
    } else {
      t.selectedGrid.set('grid')
    }
  }
});

Template.gridWriter.onRendered(function() {
  var inst = Template.instance(); 
  var asciiText = $('#ascii').html();
  this.ascii.set(asciiText);
  var gridText = $('#grid').html();
  this.grid.set(gridText);
});

