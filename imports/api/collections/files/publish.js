import { Meteor } from 'meteor/meteor';
import Files from './collection';

Meteor.publish('files', () => Files.find());
