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
    Meteor.call('runCode', 'cat local.css', (err, res) => {
      if (res.err) {
        this.setState({ err });
      } else {
        this.setState({ err: false, content: res.out });
      }
    });

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
      if (res.err) {
        this.setState({ err: res.err, details: res.details });
      } else {
        this.setState({ err: false, content: res.out });
      }
    });
  }

  render() {
    return (
      <div>
        <textarea id="mirror-target" />
        <button onClick={this.runCode}>Execute</button>
        <div id="js-target">
          <div>
          {this.state.content}
          { this.state.err ? this.state.details : ''}
          </div>
        </div>
      </div>
    );
  }
}

CodeEditor.defaultProps = {};

CodeEditor.propTypes = {};
