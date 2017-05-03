import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

export default class ComponentMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
    };
  }

  /* Menu Items
   * [{
   *   icon-name:
   *   callback:
   * },
   * */

  render() {
    const { items } = this.props;
    return (
      <div
        onMouseLeave={() => this.setState({ showMenu: false })}
        className={`component-menu ${this.props.fullscreen ? 'fullscreen' : ''}`}
      >
        <FontAwesome
          className="menu-icon"
          name="ellipsis-h"
          onMouseEnter={() => this.setState({ showMenu: true })}
        />
        <ul>
          {
            items.map(item => (
              <li key={Meteor.uuid()}>
                <FontAwesome
                  className={`menu-icon ${this.state.showMenu ? '' : 'hide'}`}
                  name={item.name}
                  onClick={() => item.callback()}
                />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

ComponentMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    callback: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fullscreen: PropTypes.bool.isRequired,
};
