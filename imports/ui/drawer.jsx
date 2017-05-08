import React from 'react';
import PropTypes from 'prop-types';

export default class Drawer extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }

  render() {
    const { toolBox } = this.props;
    return (
      <div>
        <div className={`tool-box-container ${this.state.show ? '' : 'hide'}`}>
          <div className="drawer-container">
            <div className="close" onClick={() => this.setState({ show: false })} />
            <ol>
              {
                toolBox.map(tool => (
                  <li
                    className="a-tool" key={`drawer-tool-${tool.label}`}
                    onClick={() => this.props.addComponent(tool.Component)}
                  >
                    <span className="tool-name">{tool.name}</span>
                    <span className="tool-description">{tool.description}</span>
                  </li>
                ))
              }
            </ol>
          </div>
          <div className="drawer-overlay" />
        </div>
        <button
          className={`open-toolbox-drawer ${this.state.show ? 'hide' : ''}`}
          onClick={() => this.setState({ show: true })}
        ><span className="fa fa-wrench" /></button>
      </div>
    );
  }
}

Drawer.propTypes = {
  addComponent: PropTypes.func.isRequired,
  toolBox: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    Component: PropTypes.func.isRequired,
  })).isRequired,
};
