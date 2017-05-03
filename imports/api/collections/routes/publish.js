import { Meteor } from 'meteor/meteor';
import Routes from './collection';

Meteor.publish('routes', () => Routes.find());
