import React from 'react';
import CodeMirror from 'codemirror';
import { Meteor } from 'meteor/meteor';
import 'codemirror/mode/jsx/jsx';
import boilerPlate from './boilerplate';
// import PropTypes from 'prop-types';


export default class CodeEditor extends React.Component {
  constructor() {
    super();
    this.setDefaultState();
    this.id = Meteor.uuid();
  }

  componentDidMount() {
    this.setupCodeMirror();
  }

  setDefaultState() {
    this.state = {
      jsxeditor: {},
    };
  }

  setupCodeMirror() {
    const codeMirrorInstance = CodeMirror.fromTextArea(document.getElementById(this.id), {
      mode: 'jsx',
      theme: 'solarized dark',
      autofocus: true,
      lineNumbers: true,
      command: '',
    });

    codeMirrorInstance.setValue(boilerPlate);
    this.setState({ jsxeditor: codeMirrorInstance });
  }

  saveFile() {
    const code = this.state.jsxeditor.getValue();
    Meteor.call('runCode', `echo "${code}" > some.jsx`, (err, res) => {
      if (res.err) {
        this.setState({ err });
      } else {
        this.setState({ err: false, content: res.out });
      }
    });
  }

  defaultLayout() {
    return (
      <div>
        <div
          onMouseDown={e => e.stopPropagation()}
          className="code-mirror-container"
        >
          <textarea id={this.id} />
        </div>
        <button className="compile" onClick={() => this.saveFile()}>Click to save your react component</button>
        <div id="js-target">
          <div>
            <pre>{ this.state.err ? this.state.details : ''}</pre>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const defaultLayout = this.defaultLayout();
    return (
      <div className="code-editor">
        { defaultLayout }
      </div>
    );
  }
}

CodeEditor.defaultProps = {};

CodeEditor.propTypes = {};
