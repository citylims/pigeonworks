import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.registerHelper('windowHeight', function(date) {
  return `${window.innerHeight}`;
});