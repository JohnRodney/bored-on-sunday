import React from 'react';
import Terminal from './terminal';
import JsxEditor from './jsxeditor';
import ComponentContainer from './containers/close';
import moment from 'moment';


export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      Components: [],
    };
  }

  pushComponent(component) {
    const { Components } = this.state;
    Components.push(component);
    this.setState({ Components });
  }

  render() {
    return (
      <div className="page">
        <div className="component-container">
          <ComponentContainer
            childProps={{
              addComponent: component => this.pushComponent(component),
            }} content={Terminal} label="T" />
        </div>
        <div className="component-container">
          <ComponentContainer
            childProps={{
              addComponent: component => this.pushComponent(component),
            }} content={JsxEditor} label="J" />
        </div>
        {
          this.state.Components.map((Component, i)=> (
            <div className="component-container">
              <ComponentContainer
                childProps={{
                  addComponent: component => this.pushComponent(component),
                }} content={Component} label={i} />
            </div>
          ))
        }
      </div>
    );
  }
}

Home.defaultProps = {};

Home.propTypes = {};
