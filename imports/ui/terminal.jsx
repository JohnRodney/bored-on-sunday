import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror';
import { Meteor } from 'meteor/meteor'
import 'codemirror/mode/shell/shell';
import LS from './textrenderers/ls';
import Default from './textrenderers/default';
// import PropTypes from 'prop-types';
export default class CodeEditor extends React.Component {
  constructor() {
    super();
    this.setDefaultState();
    this.runCode = this.runCode.bind(this);
    this.id = Meteor.uuid();
  }

  componentDidMount() {
    this.setupCodeMirror();
    Meteor.call('runCode', 'ls', (err, res) => {
      if (res.err) {
        this.setState({ err });
      } else {
        this.setState({ err: false, content: res.out });
      }
    });
  }

  setDefaultState() {
    this.state = {
      terminal: {},
      content: 'hello input something into the terminal',
    };
  }

  setupCodeMirror() {
    const codeMirrorInstance = CodeMirror.fromTextArea(document.getElementById(this.id), {
      mode: 'shell',
      extraKeys: { Enter: () => this.runCode() },
      theme: 'solarized dark',
      autofocus: true,
      command: '',
    });
    codeMirrorInstance.setValue("babel --presets es2015,react some.jsx");
    codeMirrorInstance.setSize(600, 30);
    this.setState({ terminal: codeMirrorInstance });
  }

  runCode() {
    const command = this.state.terminal.getValue();
    this.setState({ command });
    Meteor.call('runCode', command, (err, res) => {
      if (res.err) {
        this.setState({ err: res.err, details: res.details });
      } else {
        this.props.childProps.addComponent(eval(res.out))
        this.setState({ err: false, content: '' });
      }
    });
  }

  findRenderer() {
    if (true) {
      return <LS content={this.state.content} />;
    }
    return <Default content={this.state.content} />;
  }

  defaultLayout(renderer) {
    return (
      <div>
        <div className="terminal-home">$</div>
        <textarea id={this.id} />
        <button className="exec-terminal" onClick={this.runCode}>Click to execute or hit enter</button>
        <div id="js-target">
          <div>
            <pre>{ this.state.err ? this.state.details : ''}</pre>
          </div>
          { renderer }
        </div>
      </div>
    );
  }

  render() {
    const renderer = this.findRenderer();
    const defaultLayout = this.defaultLayout(renderer);
    return (
      <div className="terminal-container">
        { defaultLayout }
      </div>
    );
  }
}

CodeEditor.defaultProps = {};

CodeEditor.propTypes = {};
