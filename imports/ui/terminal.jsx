import React from 'react';
import CodeMirror from 'codemirror';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import 'codemirror/mode/shell/shell';
import LS from './textrenderers/ls';
import Default from './textrenderers/default';

export default class Terminal extends React.Component {
  constructor() {
    super();
    this.setDefaultState();
    this.runCode = this.runCode.bind(this);
    this.id = Meteor.uuid();
    this.handleTerminalResponse = this.handleTerminalResponse.bind(this);
  }

  componentDidMount() {
    this.setupCodeMirror();
  }

  setDefaultState() {
    this.state = {
      terminal: {},
      content: 'hello input something into the terminal',
    };
  }

  getCodeMirrorOptions() {
    return {
      mode: 'shell',
      extraKeys: { Enter: () => this.runCode() },
      theme: 'solarized dark',
      autofocus: true,
      command: '',
    };
  }

  setupCodeMirror() {
    const { fromTextArea } = CodeMirror;
    const target = document.getElementById(this.id);
    const options = this.getCodeMirrorOptions();
    const codeMirrorInstance = fromTextArea(target, options);

    codeMirrorInstance.setValue('babel --presets es2015,react some.jsx');
    codeMirrorInstance.setSize(600, 30);
    this.setState({ terminal: codeMirrorInstance });
  }

  handleTerminalResponse(err, res) {
    let component = false;
    try {
      component = eval(res.out);
    } catch (e) { component = false; }
    if (component) this.props.childProps.addComponent(component);

    this.setState({ err: res.err, content: res.out, details: res.details });
  }

  runCode() {
    const command = this.state.terminal.getValue();
    this.setState({ command });
    Meteor.call('runCode', command, this.handleTerminalResponse);
  }

  findRenderer() {
    if (typeof (this.state.content) === 'string') {
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

Terminal.defaultProps = {
  childProps: {},
};

Terminal.propTypes = {
  childProps: PropTypes.shape({
    addComponent: PropTypes.func,
  }).isRequired,
};
