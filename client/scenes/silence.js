Template.silence.onCreated(function() {
  this.activeClass = new ReactiveVar(false);
});

Template.silence.helpers({
  activeClass() {
    return Template.instance().activeClass.get() ? Template.instance().activeClass.get() : 'dark';
  }
});

Template.silence.onRendered(function() {
  let inst = Template.instance();
  // timing taken from actual artwork
  //  All - (glow down in 2 sec, flicker 8 sec)
  //  dark - 1 sec //rrl 1
  //  silence-2 (glow in 2 sec, wait 2 sec)
  //  violence1 (wait 3)
  //  violins-1 (wait 3)
  //  silence-1 (wait 3)
  //  violence-2 (wait 3)
  //  violins-2 (wait 3) 
  // 30 seconds.
  this.loop = () => {
    inst.activeClass.set('glow-in');
    Meteor.setTimeout(() => {
      inst.activeClass.set('flicker');
      Meteor.setTimeout(() => {
        inst.activeClass.set('dark');
        Meteor.setTimeout(() => {
          inst.activeClass.set('g-silence-2 flicker-inner');
          Meteor.setTimeout(() => {
            inst.activeClass.set('g-violence-1 flicker-inner');;
            Meteor.setTimeout(() => {
              inst.activeClass.set('g-violins-1 flicker-inner');
              Meteor.setTimeout(() => {
                inst.activeClass.set('g-silence-1 flicker-inner');
                Meteor.setTimeout(() => {
                  inst.activeClass.set('g-violence-2 flicker-inner');
                  Meteor.setTimeout(() => {
                    inst.activeClass.set('g-violins-2 flicker-inner');
                    // Meteor.setTimeout(() => {
                    //   inst.activeClass.set('dark');
                    // }, 3000);
                  }, 3000);
                }, 3000);
              }, 3000);
            }, 3000);
          }, 3000);
        }, 1000);
      }, 8000);
    }, 2000);
  };
  
  this.loop();
  
  Meteor.setInterval(() => {
    this.loop();  
    // TODO animate to the side and show blurb about bruce nauman (pygmalion)
  }, 30000);
});

