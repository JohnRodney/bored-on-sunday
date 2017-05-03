import React from 'react';
import ResizableBox from 'react-rnd';
import PropTypes from 'prop-types';
import ComponentMenu from './component-menu';

export default class ComponentContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      button: false,
    };
    this.MenuItems = [{
      name: 'window-close',
      callback: () => this.setState({ button: true }),
    }, {
      name: 'trash',
      callback: () => console.log('trash'),
    }, {
      name: 'television',
      callback: () => console.log('fullscreen'),
    }];
  }

  render() {
    const Content = this.props.content;
    const label = (
      <button
        onMouseDown={() => { this.flag = true; }}
        onMouseMove={() => { this.flag = false; }}
        onMouseUp={() => { this.setState({ button: !this.flag }); }}
      >
        {this.props.label}
      </button>
    );
    return (
      <ResizableBox
        ref={(c) => { this.rnd = c; }}
        className={` ${this.state.button ? 'resize-component-as-button' : ''}`}
        default={{
          x: 0,
          y: 0,
          width: '100%',
        }}
        bounds=".page"
      >
        <div className={`a-component ${this.state.button ? 'component-as-button' : ''}`}>
          { this.state.button ? label : <ComponentMenu items={this.MenuItems} /> }
          <Content childProps={this.props.childProps} />
        </div>
      </ResizableBox>
    );
  }
}

ComponentContainer.propTypes = {
  content: PropTypes.func.isRequired,
  childProps: PropTypes.shape({
    addComponent: PropTypes.func,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

