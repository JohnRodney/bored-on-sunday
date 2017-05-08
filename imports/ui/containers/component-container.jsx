import React from 'react';
import ResizableBox from 'react-rnd';
import PropTypes from 'prop-types';
import ComponentMenu from './component-menu';

export default class ComponentContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      button: false,
      fullscreen: false,
    };

    this.hasBeenSetToFullscreen = false;
    this.MenuItems = [{
      name: 'window-close',
      callback: () => this.setState({ button: true }),
    }, {
      name: 'trash',
      callback: () => this.setState({ trash: true }),
    }, {
      name: 'television',
      callback: () => this.setState({ fullscreen: !this.state.fullscreen }),
    }];
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.fullscreen && !this.hasBeenSetToFullscreen) { this.setToFullScreen(); }
    if (!nextState.fullscreen && this.hasBeenSetToFullscreen) { this.toggleOffFullScreen(); }
    if (nextState.trash && !this.state.trash) { this.props.childProps.removeComponent(); }
  }

  setToFullScreen() {
    const { clientWidth, clientHeight } = document.body;
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = this.rnd.wrapper.getBoundingClientRect();

    this.oldSizePos = {
      width: this.rnd.wrapper.offsetWidth,
      height: this.rnd.wrapper.offsetHeight,
      x: elemRect.left - bodyRect.left,
      y: elemRect.top - bodyRect.top,
    };

    this.rnd.updateSize({ width: clientWidth - 40, height: clientHeight - 80 });
    this.rnd.updatePosition({ x: 0, y: 0 });
    this.hasBeenSetToFullscreen = true;
  }

  toggleOffFullScreen() {
    const { width, height, x, y } = this.oldSizePos;
    this.rnd.updateSize({ width, height });
    this.rnd.updatePosition({ x, y });
    this.hasBeenSetToFullscreen = false;
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
        default={{ x: 0, y: 0, width: '90%' }}
        bounds=".page"
      >
        <div className={`a-component ${this.state.button ? 'component-as-button' : ''}`}>
          {
            this.state.button ? label :
            <ComponentMenu fullscreen={this.state.fullscreen} items={this.MenuItems} />
          }
          <Content childProps={this.props.childProps} fullscreen={this.state.fullscreen} />
        </div>
      </ResizableBox>
    );
  }
}

ComponentContainer.propTypes = {
  content: PropTypes.func.isRequired,
  childProps: PropTypes.shape({
    addComponent: PropTypes.func,
    removeComponent: PropTypes.func,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

