import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import * as Youtube from 'youtube-search';

const tracks = require('../tracks.json');
const youtube_api_key = require('../keys.json');


export default class GenreTest extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    // const { playing } = this.state;
    return (
      <div className="GenreTest">
        <h1>Guess Genre and Year | Week 14</h1>
        {/*<ReactPlayer*/}
          {/*className="hideReactPlayer"*/}
          {/*ref={this.ref}*/}
          {/*url={this.getVideoUrl()}*/}
          {/*playsinline*/}
          {/*playing={playing}*/}
          {/*config={{ attributes: { autoPlay: true } }}*/}
        {/*/>*/}

        {/*<div className="control">*/}
          {/*<button className="showSong" onClick={() => this.setState({showSongName: !this.state.showSongName})}>Show Song</button>*/}
          {/*<button className="nextSong" onClick={this.clickNextSong}>Next Song</button>*/}
        {/*</div>*/}
        {/*<h2 className="songDetails">{this.songDetails()}</h2>*/}
      </div>
    )
  }
}

