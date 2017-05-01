import React from 'react';
import ResizableBox from 'react-rnd';

export default class ComponentContainer extends React.Component{
  constructor() {
    super();
    this.state = {
      button: false,
    };
  }

  render() {
    const Content = this.props.content;
    const label = (
      <button
        onMouseDown={() => { this.flag = true; }}
        onMouseMove={() => { this.flag = false; }}
        onMouseUp={() => { this.flag ? this.setState({ button: false }) : this.setState({ button: true }); }}
      >{this.props.label}</button>
    );
    return (
      <ResizableBox
        className={` ${this.state.button ? 'resize-component-as-button' : ''}`}
        default={{
          x: 0,
          y: 0,
          width: '100%',
        }}
        bounds=".page"
        maxWidth={this.state.button ? '60px' : '1000px'}
      >
        <div className="a-component">
          <div className={` ${this.state.button ? 'component-as-button' : ''}`}>
            { this.state.button ? '' :
              <div
                className="close"
                onClick={() => this.setState({ button: true })}
              />
            }
            { this.state.button ? label : <Content childProps={this.props.childProps}/> }
          </div>
        </div>
      </ResizableBox>
    );
  }
}
