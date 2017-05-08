import React from 'react';
import Files from '../../../api/collections/files/collection';

export default class EditorHeader extends React.Component {
  constructor() {
    super();

    this.state = {
      id: Meteor.uuid(),
      menu: {
        file: ['new', 'save', 'save as', 'load'],
        help: ['save a component', 'render a component', 'load a component'],
      },
      currentOption: 'none',
      currentExecution: 'none',
      showFiles: false,
    };
  }

  justChanged(option, nextState) {
    return this.state.currentExecution !== option && nextState.currentExecution === option;
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.justChanged('new', nextState)) {
      this.props.codeMirrorInstance.setValue('');
    } else if (this.justChanged('save', nextState)) {
      const filename = document.getElementById(`${this.state.id}-filename`).value;
      Files.insert({ name: filename, content: this.props.codeMirrorInstance.getValue() });
    } else if (this.justChanged('load', nextState)) {
      Meteor.subscribe('files', () => {
        this.setState({ files: Files.find().fetch(), showFiles: true });
      });
    }
  }

  getFileView() {
    return (
      <div className="file-view-container">
        <div className="files-container">
          {
            this.state.files.map((file) => {
              return (
                <div
                  onClick={() => {
                    this.props.codeMirrorInstance.setValue(file.content);
                    document.getElementById(`${this.state.id}-filename`).value = file.name;
                    this.setState({ showFiles: false, currentExecution: 'none' });
                  }}
                  className="a-file"
                >
                  {file.name}
                </div>
              );
            })
          }
        </div>
        <div className="files-overlay" />
      </div>
    );
  }

  getSubMenuLayout(option) {
    return (
      <div className="sub-menu-content">
        {
          this.state.menu[option].map((subOption) => {
            return (
              <div
                className="editor-submenu-option"
                onClick={() => this.setState({ currentExecution: subOption })}
                key={`${this.state.id}-${option}-${subOption}`}
              >
                {subOption}
              </div>
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="editor-menu">
        {
          Object.keys(this.state.menu).map((option) => {
            return (
              <div
                onMouseEnter={() => { this.setState({ currentOption: option }); }}
                onMouseLeave={() => { this.setState({ currentOption: 'none' }); }}
                className={`editor-menu-option ${this.state.currentOption === option ? 'active' : ''}`}
                key={`editor-${this.state.id}-${option}`}
              >
                { option }
                { this.state.currentOption === option ? this.getSubMenuLayout(option) : ''}
              </div>
            );
          })
        }
        <div className="filename-input-container">
          Filename:
          <input
            id={`${this.state.id}-filename`}
            className="filename"
          />
        </div>
        { this.state.showFiles ? this.getFileView() : '' }
      </div>
    );
  }
}
