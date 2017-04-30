import React from 'react';
import Editor from './editor';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Editor />
      </div>
    );
  }
}

Home.defaultProps = {};

Home.propTypes = {};
