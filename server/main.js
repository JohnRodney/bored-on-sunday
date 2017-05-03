import { Meteor } from 'meteor/meteor';
import { exec } from 'child_process';
import '../imports/api/collections/routes/publish';

Meteor.startup(() => {
  Meteor.methods({
    runCode(cmd) {
      return new Promise((resolve) => {
        exec(cmd, (err, out, details) => {
          if (err instanceof Error) {
            resolve({ err, out, details });
          }
          resolve({ err, out, details });
        });
      });
    },
  });
});
