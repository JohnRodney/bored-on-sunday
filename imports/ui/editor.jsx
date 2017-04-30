import React from 'react';
import ReactDOM from "react-dom";
import CodeMirrior from 'codemirror';
require('codemirror/mode/jsx/jsx.js');
// import PropTypes from 'prop-types';
export default class CodeEditor extends React.Component {
  constructor() {
    super();
    this.setDefaultState();
    this.runCode = this.runCode.bind(this);
  }

  componentDidMount() {
    this.setupCodeMirror();
    window.React = React;
  }

  setDefaultState() {
    this.state = {
      codeMirror: {},
      content: "hello input something into the terminal"
    };
  }

  setupCodeMirror() {
    this.setState({ codeMirror: CodeMirrior.fromTextArea(document.getElementById('mirror-target'), {
      lineNumbers: true,
      mode:  'jsx'    }) });
  }

  runCode() {
    Meteor.call('runCode', this.state.codeMirror.getValue(), (err, res) => {
      console.log(res);
      this.setState({ content: res })
    });
  }

  render() {
    return (
      <div>
        <textarea id="mirror-target" />
        <button onClick={this.runCode}>Execute</button>
        <div id="js-target">
          <ul>
          {this.state.content.split("\n").filter((line) => line.length !== 0).map((line) => <li key={Meteor.uuid()}>{line}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

CodeEditor.defaultProps = {};

CodeEditor.propTypes = {};
