import React, {Component} from 'react';

import FEATURED_LINKS from './constants/featuredLinks';
import buildYoutubeLoopedVideoUrl from "./util/buildYoutubeLoopedVideoUrl";
import buildYoutubeLivestreamUrl from "./util/buildYoutubeLivestreamUrl";

export default class LinkWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "livestreamVideoId": "",
      "loopedVideoId": "",
    };
    this.createFeaturedLinkHandler = this.createFeaturedLinkHandler.bind(this);
    this.setLoopedVideoId = this.setLoopedVideoId.bind(this);
    this.setLivestreamVideoId = this.setLivestreamVideoId.bind(this);
    this.setLinkToLivestream = this.setLinkToLivestream.bind(this);
    this.setLinkToLoopedVideo = this.setLinkToLoopedVideo.bind(this);
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

  setLinkToLivestream() {
    this.props.onDone(buildYoutubeLivestreamUrl(this.state.livestreamVideoId))
  }

  setLinkToLoopedVideo() {
    this.props.onDone(buildYoutubeLoopedVideoUrl(this.state.loopedVideoId))
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
        <button onClick={this.props.onCancel}>Cancel</button>
      </div>
    )
  }

}