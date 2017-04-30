import { Meteor } from 'meteor/meteor';
import { exec } from 'child_process';

Meteor.startup(() => {
  Meteor.methods({
    runCode(cmd) {
      return new Promise((resolve) => {
        exec(cmd, (err, out) => {
          if (err instanceof Error) {
            resolve(JSON.stringify(err));
          }
          resolve(out);
        });
      });
    },
  });
});
