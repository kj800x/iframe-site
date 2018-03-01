import React, {Component} from 'react';
import './IFrames.css';

function Avatar(props) {
  return (
    <div className="avatar">
      <img className="profile" src={props.subject.picture}/>
      <span className="name">{props.subject.name}</span>
    </div>
  )
}

function IFrame(props) {
  return (
    <div className={props.className}>
      <iframe src={props.config.link ? props.config.link : "http://iframe.coolkev.com/start.html"} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen/>
      <Avatar subject={props.config.who}/>
    </div>
  )
}

export default class IFrames extends Component {

  render() {
    return <div>
      <IFrame className="top left" config={this.props.config.tl}/>
      <IFrame className="bottom left" config={this.props.config.bl}/>
      <IFrame className="top right" config={this.props.config.tr}/>
      <IFrame className="bottom right" config={this.props.config.br}/>
    </div>
  }

}