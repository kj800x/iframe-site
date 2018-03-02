import React, {Component} from 'react';
import LinkEditor from "./LinkEditor";

import "./ConfigEditor.css";

const PARTS = ["tl", "tr", "bl", "br"];

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

  createFeaturedChange(part) {
    return (value) => {
      const newConfig = Object.assign({}, this.state.config);
      if (value) {
        for (let i = 0; i < PARTS.length; i++) {
          newConfig[PARTS[i]].isFeatured = false;
        }
      }
      newConfig[part].isFeatured = value;
      this.setState({
        config: newConfig,
      })
    }
  }

  render() {
    return (
      <div>
        <h4> Hello {this.props.displayName} </h4>
        <h5> Configuring room <b>{this.props.room} @ {this.props.host}:{this.props.port}</b> </h5>
        <table className="LinkEditorTable">
          <LinkEditor
            label={"Top Left"}
            value={this.state.config.tl.link}
            isFeatured={this.state.config.tl.isFeatured}
            onChange={this.createLinkUpdater("tl")}
            onFeaturedChange={this.createFeaturedChange("tl")}
          />
          <LinkEditor
            label={"Top Right"}
            value={this.state.config.tr.link}
            isFeatured={this.state.config.tr.isFeatured}
            onChange={this.createLinkUpdater("tr")}
            onFeaturedChange={this.createFeaturedChange("tr")}
          />
          <LinkEditor
            label={"Bottom Left"}
            value={this.state.config.bl.link}
            isFeatured={this.state.config.bl.isFeatured}
            onChange={this.createLinkUpdater("bl")}
            onFeaturedChange={this.createFeaturedChange("bl")}
          />
          <LinkEditor
            label={"Bottom Right"}
            value={this.state.config.br.link}
            isFeatured={this.state.config.br.isFeatured}
            onChange={this.createLinkUpdater("br")}
            onFeaturedChange={this.createFeaturedChange("br")}
          />
        </table>
        <button className="updateButton" onClick={this.handleUpdate}>Update</button>
      </div>
    );
  }

}