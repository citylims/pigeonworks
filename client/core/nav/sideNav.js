Session.setDefault('expandSideNav', false);
Template.sideNav.onCreated(function(){
  this.completeAnimation = new ReactiveVar(false);

  this.autorun(() => {
    if (Session.get('expandSideNav')) {
      $('.drawer').velocity({width: "100%", opacity: ".95"}, {
        duration: 600,
        complete:() => { 
          this.completeAnimation.set(true);
        }
      })
    } else {
      $('.drawer').velocity({width: "2%", opacity: "0.2"}, {
        complete:() => {
          this.completeAnimation.set(false);
        }
      });
    }
  });
  
  this.feats = new ReactiveVar([
    {
      title: 'Creation Myth',
      path: '/',
      img: 'nav-blocks/CreationMyth.png'
    },
    {
      title: 'Flight',
      path: '/flight',
      img: 'nav-blocks/Flight.png'
    },
    {
      title: 'Pygmalion',
      path: '/pygmalion',
      img: 'nav-blocks/Pygmalion.png'
    },
    {
      title: 'Alien',
      path: '/alien',
      img: 'nav-blocks/Alien.png'
    },
    {
      title: 'Food',
      path: '/food',
      img: 'nav-blocks/Food.png'
    },
    {
      title: 'Glitchy',
      path: '/glitchy',
      img: 'nav-blocks/Glitchy.png'
    },
    {
      title: 'Grid Writer',
      path: '/gridWriter',
      img: 'nav-blocks/GridWriter.png'
    },
    {
      title: 'Audio Freeze',
      path: '/audioFreeze',
      img: 'nav-blocks/AudioFreeze.png'
    },
    {
      title: 'Outer Verse',
      path: '/outerverse',
      img: 'nav-blocks/Outerverse.png'
    },
    {
      title: 'Overlayers',
      path: '/overlayers',
      img: 'nav-blocks/Overlayers.png'
    }
  ])
});

Template.sideNav.helpers({
  feats: function() {
    return Template.instance().feats.get();
  },
  expanded: function() {
    return Session.get('expandSideNav');
  },
  completed: function() {
    return Template.instance().completeAnimation.get();
  }
});

Template.sideNav.events({
  'click .drawer': function(e,t) {
    Session.set('expandSideNav', !Session.get('expandSideNav'));
  }
});