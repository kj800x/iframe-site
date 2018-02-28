import React, {Component} from 'react';
import LinkEditor from "./LinkEditor";

import "./ConfigEditor.css";

export default class ConfigEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: this.props.config,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.createLinkUpdater = this.createLinkUpdater.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      config: newProps.config
    });
  }

  handleUpdate() {
    this.props.onConfigChange(this.state.config);
  }

  createLinkUpdater(part) {
    return (value) => {
      const newConfig = Object.assign({}, this.state.config);
      newConfig[part] = value;
      this.setState({
        config: newConfig,
      })
    }
  }

  render() {
    return (
      <div>
        <h1> IFrame Site Configurator </h1>
        <LinkEditor
          label={"Top Left"}
          value={this.state.config.tl}
          onChange={this.createLinkUpdater("tl")}
        />
        <LinkEditor
          label={"Top Right"}
          value={this.state.config.tr}
          onChange={this.createLinkUpdater("tr")}
        />
        <LinkEditor
          label={"Bottom Left"}
          value={this.state.config.bl}
          onChange={this.createLinkUpdater("bl")}
        />
        <LinkEditor
          label={"Bottom Right"}
          value={this.state.config.br}
          onChange={this.createLinkUpdater("br")}
        />
        <button onClick={this.handleUpdate}>Update</button>
      </div>
    );
  }

}