import React from 'react';
import Terminal from './terminal';
import JsxEditor from './jsxeditor';
import ComponentContainer from './containers/component-container';
/* TODO: in order for a created component to have a dependency via
 * import I need to import it here.  Depenedency chain needs to be refactored
 * so users can import any valid publish NPM packages.
 * * */


export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      Components: [{
        id: Meteor.uuid(),
        Component: Terminal,
        label: 'T',
      }, {
        id: Meteor.uuid(),
        Component: JsxEditor,
        label: 'J',
      }],
    };
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
    const Comps = this.state.Components;
    const Components = Comps.slice(0, i).concat(Comps.slice(i + 1, Comps.length));
    this.setState({ Components });
  }

  render() {
    return (
      <div>
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
