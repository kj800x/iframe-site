import React, {Component} from 'react';

import FEATURED_LINKS from './constants/featuredLinks';
import buildYoutubeLoopedVideoUrl from "./util/buildYoutubeLoopedVideoUrl";
import buildYoutubeLivestreamUrl from "./util/buildYoutubeLivestreamUrl";
import buildRoomInRoomUrl from "./util/buildRoomInRoomUrl";
import buildTiledEmojiUrl from './util/buildTiledEmojiUrl';
import buildScaledUrl from './util/buildScaledUrl';

import "./LinkWizard.css";

export default class LinkWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "livestreamVideoId": "",
      "loopedVideoId": "",
      "roomInRoomRoom": "",
      "loopedVideoStartAt": "0",
      "tiledEmojiValue": "",
      "scaledUrl": props.oldUrl,
      "scaleFactor": "1",
    };
    this.createFeaturedLinkHandler = this.createFeaturedLinkHandler.bind(this);
    this.setLoopedVideoId = this.setLoopedVideoId.bind(this);
    this.setLivestreamVideoId = this.setLivestreamVideoId.bind(this);
    this.setRoomInRoomRoom = this.setRoomInRoomRoom.bind(this);
    this.setTiledEmojiValue = this.setTiledEmojiValue.bind(this);
    this.setScaleFactor = this.setScaleFactor.bind(this);
    this.setScaledUrl = this.setScaledUrl.bind(this);
    this.setLinkToLivestream = this.setLinkToLivestream.bind(this);
    this.setLinkToLoopedVideo = this.setLinkToLoopedVideo.bind(this);
    this.setLinkToRoomInRoom = this.setLinkToRoomInRoom.bind(this);
    this.setLinkToTiledEmoji = this.setLinkToTiledEmoji.bind(this);
    this.setLinkToScaledUrl = this.setLinkToScaledUrl.bind(this);
    this.setLoopedVideoStartAt = this.setLoopedVideoStartAt.bind(this);
  }

  createFeaturedLinkHandler(value) {
    return () => {
      this.props.onDone(value)
    }
  }

  setLivestreamVideoId(event) {
    this.setState({
      "livestreamVideoId": event.target.value,
    })
  }

  setLoopedVideoId(event) {
    this.setState({
      "loopedVideoId": event.target.value,
    })
  }

  setRoomInRoomRoom(event) {
    this.setState({
      "roomInRoomRoom": event.target.value,
    })
  }

  setLoopedVideoStartAt(event) {
    this.setState({
      "loopedVideoStartAt": event.target.value,
    })
  }

  setTiledEmojiValue(event) {
    this.setState({
      "tiledEmojiValue": event.target.value,
    })
  }

  setScaledUrl(event) {
    this.setState({
      "scaledUrl": event.target.value,
    })
  }

  setScaleFactor(event) {
    this.setState({
      "scaleFactor": event.target.value,
    })
  }

  setLinkToLivestream() {
    this.props.onDone(buildYoutubeLivestreamUrl(this.state.livestreamVideoId))
  }

  setLinkToLoopedVideo() {
    this.props.onDone(buildYoutubeLoopedVideoUrl(this.state.loopedVideoId, this.state.loopedVideoStartAt))
  }

  setLinkToRoomInRoom() {
    this.props.onDone(buildRoomInRoomUrl(this.state.roomInRoomRoom))
  }

  setLinkToTiledEmoji() {
    this.props.onDone(buildTiledEmojiUrl(this.state.tiledEmojiValue));
  }

  setLinkToScaledUrl() {
    this.props.onDone(buildScaledUrl(this.state.scaledUrl, this.state.scaleFactor));
  }

  renderFeaturedLinks() {
    return FEATURED_LINKS.map((featuredLink) => {
      return (
        <div key={featuredLink.link} style={{"margin-right": "10px", "display": "inline"}}>
          <button onClick={this.createFeaturedLinkHandler(featuredLink.link)}>{featuredLink.name}</button>
        </div>
      )
    });
  }

  renderTiledEmojiPrompt() {
    return (
      <div>
        Tiled Emoji: <input value={this.state.tiledEmojiValue} onChange={this.setTiledEmojiValue}/>
        <button onClick={this.setLinkToTiledEmoji}>Go</button>
      </div>
    )
  }

  renderScaledWebpagePrompt() {
    return (
      <div>
        Scaled URL: <input value={this.state.scaledUrl} onChange={this.setScaledUrl}/> <br />
        Scale Factor: <input value={this.state.scaleFactor} onChange={this.setScaleFactor}/>
        <button onClick={this.setLinkToScaledUrl}>Go</button>
      </div>
    )
  }

  renderYoutubeLivestreamPrompt() {
    return (
      <div>
        YouTube Livestream Video ID: <input value={this.state.livestreamVideoId} onChange={this.setLivestreamVideoId}/>
        <button onClick={this.setLinkToLivestream}>Go</button>
      </div>
    )
  }

  renderYoutubeVideoPrompt() {
    return (
      <div>
        YouTube Looped Video ID: <input value={this.state.loopedVideoId} onChange={this.setLoopedVideoId}/> start
        at <input className="time" value={this.state.loopedVideoStartAt} onChange={this.setLoopedVideoStartAt}/> sec <button
        onClick={this.setLinkToLoopedVideo}>Go</button>
      </div>
    )
  }

  renderRoomInRoomPrompt() {
    return (
      <div>
        Room: <input value={this.state.roomInRoomRoom} onChange={this.setRoomInRoomRoom}/>
        <button onClick={this.setLinkToRoomInRoom}>Go</button>
        <br/>(manage by loading the config page with <code>?room={this.state.roomInRoomRoom}</code>)
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Link Wizard</h2>
        <div>
          <h3>Featured Links</h3>
          {this.renderFeaturedLinks()}
        </div>
        <div>
          <h3>Custom YouTube</h3>
          {this.renderYoutubeLivestreamPrompt()}
          {this.renderYoutubeVideoPrompt()}
        </div>
        <div>
          <h3>Tiled Emoji</h3>
          {this.renderTiledEmojiPrompt()}
        </div>
        <div>
          <h3>Scaled Webpage</h3>
          {this.renderScaledWebpagePrompt()}
        </div>
        <div>
          <h3>Room in Room (nested iframe page)</h3>
          {this.renderRoomInRoomPrompt()}
        </div>
        <button onClick={this.props.onCancel}>Cancel</button>
      </div>
    )
  }

}

//http://home.coolkev.com/emoji.html?emoji=butt_holdings