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
    console.log('hello', nextState.fullscreen, !this.hasBeenSetToFullscreen)
    if (nextState.fullscreen && !this.hasBeenSetToFullscreen) { this.setToFullScreen(); }
    if (!nextState.fullscreen && this.hasBeenSetToFullscreen) { this.toggleOffFullScreen(); }
  }

  setToFullScreen() {
    const { clientWidth, clientHeight } = document.body;
    this.oldSize = {
      width: this.rnd.wrapper.offsetWidth,
      height: this.rnd.wrapper.offsetHeight,
    };

    this.rnd.updateSize({ width: clientWidth - 40, height: clientHeight - 80 });
    this.hasBeenSetToFullscreen = true;
  }

  toggleOffFullScreen() {
    const { width, height } = this.oldSize;
    this.rnd.updateSize({ width, height });
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
        default={{
          x: 0,
          y: 0,
          width: '100%',
        }}
        bounds=".page"
      >
        <div className={`a-component ${this.state.button ? 'component-as-button' : ''}`}>
          {
            this.state.button ? label :
            <ComponentMenu fullscreen={this.state.fullscreen} items={this.MenuItems} />
          }
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

