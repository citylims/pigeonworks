import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

BlazeLayout.setRoot('body');
Template.registerHelper('windowHeight', function(date) {
  return `${window.innerHeight}`;
});