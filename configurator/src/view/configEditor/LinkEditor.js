import React, {Component} from 'react';
import LinkWizard from "../linkWizard/LinkWizard";
import Modal from "../modal/Modal";

import "./LinkEditor.css";

export default class LinkEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showWizard: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.hideWizard = this.hideWizard.bind(this);
    this.showWizard = this.showWizard.bind(this);
    this.handleWizardDone = this.handleWizardDone.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      showWizard: false
    });
  }

  handleInputChange(event) {
    this.props.onChange(event.target.value);
  }

  hideWizard() {
    this.setState({
      showWizard: false,
    });
  }

  showWizard() {
    this.setState({
      showWizard: true,
    });
  }

  handleWizardDone(value) {
    this.props.onChange(value);
    this.hideWizard();
  }

  renderWizardModal() {
    if (!this.state.showWizard) {
      return null;
    }
    return (
      <Modal onClose={this.hideWizard}>
        <LinkWizard
          onDone={this.handleWizardDone}
          onCancel={this.hideWizard}
        />
      </Modal>
    )
  }

  render() {
    return (
      <tr>
        <td className="quadrant"> {this.props.label}:</td>
        <td><input className="link" value={this.props.value} onChange={this.handleInputChange}/></td>
        <td className="wizard">
          <button onClick={this.showWizard}>Wizard</button>
          {this.renderWizardModal()} </td>
      </tr>
    );
  }

}