import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/shell/shell';
import LS from './textrenderers/ls';
import Default from './textrenderers/default';
// import PropTypes from 'prop-types';
export default class CodeEditor extends React.Component {
  constructor() {
    super();
    this.setDefaultState();
    this.runCode = this.runCode.bind(this);
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
    const codeMirrorInstance = CodeMirror.fromTextArea(document.getElementById('mirror-target'), {
      mode: 'shell',
      extraKeys: { Enter: () => this.runCode() },
      theme: 'solarized dark',
      autofocus: true,
      command: '',
    });
    codeMirrorInstance.setSize(200, 30);
    this.setState({ terminal: codeMirrorInstance });
  }

  runCode() {
    const command = this.state.terminal.getValue();
    this.setState({ command });
    Meteor.call('runCode', command, (err, res) => {
      if (res.err) {
        this.setState({ err: res.err, details: res.details });
      } else {
        this.setState({ err: false, content: res.out });
      }
    });
  }

  findRenderer() {
    if (true) {
      return <LS content={this.state.content} />;
    }
    return <Default content={this.state.content} />;
  }

  reOpen() {
    this.setState({ button: false });
    setTimeout(() => {
      const codeMirrorInstance = CodeMirror.fromTextArea(document.getElementById('mirror-target'), {
        mode: 'shell',
        extraKeys: { Enter: () => this.runCode() },
        theme: 'solarized dark',
        autofocus: true,
        command: '',
      });
      codeMirrorInstance.setSize(200, 30);
      this.setState({ terminal: codeMirrorInstance });
    }, 1000);
  }

  defaultLayout(renderer) {
    return (
      <div>
        <div className="close" onClick={() => this.setState({ button: true })} />
        <div className="terminal-home">$</div>
        <textarea id="mirror-target" />
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

  buttonLayout() {
    return (
      <button onClick={() => this.reOpen()}>T</button>
    );
  }

  render() {
    const renderer = this.findRenderer();
    const defaultLayout = this.defaultLayout(renderer);
    return (
      <div className={`terminal-container ${this.state.button ? 'component-as-button' : ''}`}>
        { this.state.button ? this.buttonLayout() : defaultLayout }
      </div>
    );
  }
}

CodeEditor.defaultProps = {};

CodeEditor.propTypes = {};
