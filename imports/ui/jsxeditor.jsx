import React from 'react';
import CodeMirror from 'codemirror';
import { Meteor } from 'meteor/meteor';
import 'codemirror/mode/jsx/jsx';
import boilerPlate from './boilerplate';
import PropTypes from 'prop-types';


export default class CodeEditor extends React.Component {
  constructor() {
    super();
    this.setDefaultState();
    this.id = Meteor.uuid();
  }

  componentDidMount() {
    this.setupCodeMirror();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.fullscreen && !this.props.fullscreen) {
      this.goFullScreen(document.body.clientWidth - 40, document.body.clientHeight - 80);
    } else if (!nextProps.fullscreen && this.props.fullscreen) {
      console.log('leaving')
      this.leaveFullScreen();
    }
  }

  setDefaultState() {
    this.state = {
      jsxEditor: {},
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
    this.setState({ jsxEditor: codeMirrorInstance });
  }

  saveFile() {
    const code = this.state.jsxEditor.getValue();
    Meteor.call('runCode', `echo "${code}" > some.jsx`, (err, res) => {
      if (res.err) {
        this.setState({ err });
      } else {
        this.setState({ err: false, content: res.out });
      }
    });
  }


  leaveFullScreen() {
    const codeMirrorInstance = this.state.jsxEditor;
    const height = this.oldHeight;
    codeMirrorInstance.setSize('100%', height);
  }

  goFullScreen(x, y) {
    const codeMirrorInstance = this.state.jsxEditor;
    const height = document.querySelector('.code-mirror-container').offsetHeight;
    this.oldHeight = height;
    codeMirrorInstance.setSize('100%', y - 40);
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

CodeEditor.propTypes = {
  fullscreen: PropTypes.bool.isRequired,
};
