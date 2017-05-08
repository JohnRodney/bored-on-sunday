import { Mongo } from 'meteor/mongo';

class Files extends Mongo.Collection {
  insert(doc, callback) {
    return super.insert(doc, callback);
  }
  update(selector, modifier, options, callback) {
    return super.update(selector, modifier, options, callback);
  }
  upsert(selector, modifier, ...args) {
    return super.update(selector, modifier, ...args);
  }
  remove(selector) {
    return super.remove(selector);
  }
}

export default new Files('files');
