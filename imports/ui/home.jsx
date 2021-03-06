import React from 'react';
import Terminal from './terminal';
import JsxEditor from './components/jsx-editor/editor';
import Background from './background';
import ComponentContainer from './containers/component-container';
import Drawer from './drawer';
/* TODO: in order for a created component to have a dependency via
 * import I need to import it here.  Depenedency chain needs to be refactored
 * so users can import any valid publish NPM packages.
 * * */


export default class Home extends React.Component {
  constructor() {
    super();
    const background = {
      id: Meteor.uuid(),
      Component: Background,
      label: '3d',
      name: '3js-background',
      description: 'a react component for lagging out your dom.',
    };

    const terminal = {
      id: Meteor.uuid(),
      Component: Terminal,
      label: 'T',
      name: 'react-terminal-component',
      description: 'A component for accessing your terminal via the web browser in a meteor environment.',
    };
    const jsxEditor = {
      id: Meteor.uuid(),
      Component: JsxEditor,
      label: 'J',
      name: 'react-jsx-editor',
      description: 'A code mirror jsx editor as a react component saves a file to some.jsx.',
    };
    /* TODO: Look for a collection in DB of tools to put in toolbox
     * */

    const def = () => [terminal, jsxEditor];
    this.state = { Components: def(), toolBox: def().concat([background]) };
  }

  pushComponent(component) {
    this.setState({
      Components: this.state.Components.concat([{
        id: Meteor.uuid(),
        Component: component,
        label: this.state.Components.length,
      }]),
    });
  }

  removeComponent(i) {
    const { Components } = this.state;
    Components.splice(i, 1);
    this.setState({ Components });
  }

  render() {
    return (
      <div>
        <Drawer toolBox={this.state.toolBox} addComponent={component => this.pushComponent(component)} />
        { this.state.Components.length === 0 ? <p className="tool-box-icon-tip thought">Add a component to the screen</p> : '' }
        <div className="page">
          {
            this.state.Components.map((Component, i) => (
              <div
                key={`${Component.id}`}
                className="component-container"
              >
                <ComponentContainer
                  childProps={{
                    addComponent: component => this.pushComponent(component),
                    removeComponent: (function removeCurry(index) {
                      return () => this.removeComponent(index);
                    }.bind(this)(i)),
                  }}
                  content={Component.Component}
                  label={Component.label.toString()}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
