import React, {Component} from 'react';
import queryString from 'query-string';
import './IFrames.css';

const DEFAULT_PROFILE = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50";

function Avatar(props) {
  const isDefaultProfile = props.subject.picture.includes(DEFAULT_PROFILE);

  return (
    <div className="avatar">
      {!isDefaultProfile && <img alt="profile" className="profile" src={props.subject.picture}/>}
      {isDefaultProfile && <span className="name">{props.subject.name}</span>}
    </div>
  )
}

function getIFrameStyle(config) {
  const qs = config.link.substring(config.link.indexOf('?') + 1);
  const iframeParams = queryString.parse(qs);
  const style = {};
  if (iframeParams.IFRAME_SCALE) {
    const scale = parseFloat(iframeParams.IFRAME_SCALE);
    style["transform"] = `scale(${iframeParams.IFRAME_SCALE})`;
    style["transformOrigin"] = `top left`;
    style["width"] = `${100/scale}%`;
    style["height"] = `${100/scale}%`;
  }
  return style;
}

function IFrame(props) {
  return (
    <div className={props.className + (props.config.isFeatured ? " featured" : "")}>
      <iframe
        title={props.className.replace(/ /g, "")}
        src={props.config.link ? props.config.link : "http://iframe.coolkev.com/start.html"}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        style={getIFrameStyle(props.config)}
      />
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