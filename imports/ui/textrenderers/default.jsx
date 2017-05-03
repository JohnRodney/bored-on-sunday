import React from 'react';
import PropTypes from 'prop-types';

export default function DefaultRenderer(props) {
  const { content } = props;
  return <div>{ content }</div>;
}

DefaultRenderer.propTypes = {
  content: PropTypes.string.isRequired,
};
