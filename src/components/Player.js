import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import * as Youtube from 'youtube-search';

const tracks = require('../tracks.json');
const youtube_api_key = require('../keys.json');


const createEmptyBooleanArray = () => {
  let a = [];
  for (let i = 0; i < tracks.length; i++) a.push(0);
  return a;
};

const randomStartTime = () => {
  return Math.floor(Math.random()*60)+Math.floor(Math.random()*30);
}

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yt_results: null,
      showSongName: false,
      'current_song': null,
      playing: true,
      finished: false,
      'played_history': createEmptyBooleanArray()
    }

    window.addEventListener('keyup', this.nextSongViaKeyPress);
    this.clickNextSong = this.clickNextSong.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.showSongName !== nextState.showSongName;
  // }

  nextSongViaKeyPress(e) {
    if(e.keyCode === 37 || e.keyCode === 39) {
      window.location.reload(true)
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', (e) => {
      if(e.keyCode === 32) {
        this.setState({playing: !this.state.playing})
      }
    });

    this.getYoutubeResults(this.randomTrack());
  }

  /**
   * Given a track object, update Youtube data
   * @param track Track object with title and artist
   */
  getYoutubeResults(track) {
    const options = {
      maxResults: 5,
      key: youtube_api_key.youtube
    };
    this.setState({ current_song: track });
    Youtube(`${track.title} ${track.artist} official`, options, (err, data) => this.setState({yt_results: data}));
  }

  getVideoUrl() {
    return this.state.yt_results ? this.state.yt_results[0].link + '?start=' + randomStartTime() + 's': '';
  }

  /**
   * Check if all the songs have been played
   * @returns {boolean} True if quiz finished, False otherwise
   */
  quizIsFinished() {
    for (let i = 0; i < this.state.played_history.length; i++) {
      if (i === 0) {
        return false
      }
    }
    return true; // all 1's
  }

  /**
   * Pull random track from rep list. Update played history.
   * @returns current song object {genre, name, artist, title}
   */
  randomTrack() {
    let played = false;
    let current_index = 0;
    while (!played) {
      current_index = Math.floor(Math.random() * tracks.length);
      if (this.state.played_history[current_index] === 0) {
        played = true;
        let tmp_history = this.state.played_history;
        tmp_history[current_index] = 1;
        this.setState({ played_history: tmp_history });
      }
    }

    const track = tracks[current_index];

    this.getYoutubeResults(track);

    return track;
  }

  ref = player => {
    this.player = player;
  }

  songDetails() {
    const song = this.state.current_song;
    return this.state.showSongName ?
      ` ${song.genre}: "${song.title}" ${song.artist} (${song.year})` : ``;
  }

  // render arrow keys tip
  renderTip() {
    return this.state.current_index === tracks.length / 2 ?
      <h2 className="songDetails">Tip: Use arrow keys to navigate between songs.</h2> : '';
  }

  clickNextSong() {
    if (this.quizIsFinished()) {
      this.setState({ playing: false, finished: true })
    } else {
      const current_song = this.randomTrack();
      this.setState({ current_song });
    }
  }

  render() {
    const { playing } = this.state;
    return (
      <div className="Player">
        <h1>Smookify <span style={{'fontWeight': '300'}}>|</span> Week 13</h1>
        <ReactPlayer
          className="hideReactPlayer"
          ref={this.ref}
          url={this.getVideoUrl()}
          playsinline
          playing={playing}
          config={{ attributes: { autoPlay: true } }}
        />

        <div className="control">
          <button className="showSong" onClick={() => this.setState({showSongName: !this.state.showSongName})}>Click to Show Song Name</button>
          <button className="nextSong" onClick={this.clickNextSong}>Next Song</button>
        </div>

        { this.renderTip() }

        { this.state.finished ? 'Quiz finished' : '' }
        <h2 className="songDetails">{this.songDetails()}</h2>
      </div>
    )
  }
}

