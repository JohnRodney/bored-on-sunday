import React from 'react';
import { Meteor } from 'meteor/meteor';

export default (props) => {
  const { content } = props;
  return (
    <div>
      <ol>
        {
          content.split('\n')
            .filter(word => word.length > 0)
            .map(word => <li key={Meteor.uuid()} className="an-ls-word"><pre>{word}</pre></li>)
        }
      </ol>
    </div>
  );
};
