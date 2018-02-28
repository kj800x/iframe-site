import React, {Component} from 'react';

export default class IFrames extends Component {

  render() {
    return <div>
      <iframe className="top left" src={this.props.config.tl} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen/>
      <iframe className="bottom left" src={this.props.config.bl} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen/>
      <iframe className="top right" src={this.props.config.tr} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen/>
      <iframe className="bottom right" src={this.props.config.br} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen/>
    </div>
  }

}