import React, {Component} from 'react';

import FEATURED_LINKS from './constants/featuredLinks';
import buildYoutubeLoopedVideoUrl from "./util/buildYoutubeLoopedVideoUrl";
import buildYoutubeLivestreamUrl from "./util/buildYoutubeLivestreamUrl";
import buildRoomInRoomUrl from "./util/buildRoomInRoomUrl";

export default class LinkWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "livestreamVideoId": "",
      "loopedVideoId": "",
      "roomInRoomRoom": "",
    };
    this.createFeaturedLinkHandler = this.createFeaturedLinkHandler.bind(this);
    this.setLoopedVideoId = this.setLoopedVideoId.bind(this);
    this.setLivestreamVideoId = this.setLivestreamVideoId.bind(this);
    this.setRoomInRoomRoom = this.setRoomInRoomRoom.bind(this);
    this.setLinkToLivestream = this.setLinkToLivestream.bind(this);
    this.setLinkToLoopedVideo = this.setLinkToLoopedVideo.bind(this);
    this.setLinkToRoomInRoom = this.setLinkToRoomInRoom.bind(this);
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

  setLinkToLivestream() {
    this.props.onDone(buildYoutubeLivestreamUrl(this.state.livestreamVideoId))
  }

  setLinkToLoopedVideo() {
    this.props.onDone(buildYoutubeLoopedVideoUrl(this.state.loopedVideoId))
  }

  setLinkToRoomInRoom() {
    this.props.onDone(buildRoomInRoomUrl(this.state.roomInRoomRoom))
  }

  renderFeaturedLinks() {
    return FEATURED_LINKS.map((featuredLink) => {
      return (
        <div key={featuredLink.link}>
          <button onClick={this.createFeaturedLinkHandler(featuredLink.link)}>{featuredLink.name}</button>
        </div>
      )
    });
  }

  renderYoutubeLivestreamPrompt() {
    return (
      <div>
        YouTube Livestream Video ID: <input value={this.state.livestreamVideoId} onChange={this.setLivestreamVideoId} />
        <button onClick={this.setLinkToLivestream}>Go</button>
      </div>
    )
  }

  renderYoutubeVideoPrompt() {
    return (
      <div>
        YouTube Looped Video ID: <input value={this.state.loopedVideoId} onChange={this.setLoopedVideoId} />
        <button onClick={this.setLinkToLoopedVideo}>Go</button>
      </div>
    )
  }

  renderRoomInRoomPrompt() {
    return (
      <div>
        Room: <input value={this.state.roomInRoomRoom} onChange={this.setRoomInRoomRoom} />
        <button onClick={this.setLinkToRoomInRoom}>Go</button>
        <br />(manage by loading the config page with <code>?room={this.state.roomInRoomRoom}</code>)
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
          <h3>Room in Room (nested iframe page)</h3>
          {this.renderRoomInRoomPrompt()}
        </div>
        <button onClick={this.props.onCancel}>Cancel</button>
      </div>
    )
  }

}