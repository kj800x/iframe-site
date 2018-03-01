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
      newConfig[part].link = value;
      this.setState({
        config: newConfig,
      })
    }
  }

  render() {
    return (
      <div>
        <h4> Hello {this.props.displayName} </h4>
        <table className="LinkEditorTable">
          <LinkEditor
            label={"Top Left"}
            value={this.state.config.tl.link}
            onChange={this.createLinkUpdater("tl")}
          />
          <LinkEditor
            label={"Top Right"}
            value={this.state.config.tr.link}
            onChange={this.createLinkUpdater("tr")}
          />
          <LinkEditor
            label={"Bottom Left"}
            value={this.state.config.bl.link}
            onChange={this.createLinkUpdater("bl")}
          />
          <LinkEditor
            label={"Bottom Right"}
            value={this.state.config.br.link}
            onChange={this.createLinkUpdater("br")}
          />
        </table>
        <button className="updateButton" onClick={this.handleUpdate}>Update</button>
      </div>
    );
  }

}