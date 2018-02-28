import React, {Component} from 'react';

import './Modal.css';

export default class Modal extends Component {

  render() {
    return (
      <div>
        <div className="ModalOverlay" onClick={this.props.onClose}/>
        <div className="ModalContents">
          {this.props.children}
        </div>
      </div>
    )
  }

}