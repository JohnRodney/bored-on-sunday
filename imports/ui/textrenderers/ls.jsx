import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

export default function LsRenderer(props) {
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
}

LsRenderer.propTypes = {
  content: PropTypes.string.isRequired,
};
