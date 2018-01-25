import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import * as Youtube from 'youtube-search';

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ytResults: null,
      showSongName: false,
      currentSong: null,
      playing: true,
      finished: false,
    };

    this.state.playedHistory = this.createEmptyBooleanArray();

    this.youtube_api_key = require('../keys.json');
    this.tracks = this.props.tracks || require('../tracks.json');

    this.clickNextSong = this.clickNextSong.bind(this);
    this.createEmptyBooleanArray = this.createEmptyBooleanArray.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', (e) => {
      if(e.keyCode === 32) {
        this.setState({ showSongName: !this.state.showSongName, playing: !this.state.playing })
      }

      if (e.keyCode === 39) {
        this.clickNextSong();
      }
    });

    this.getYoutubeResults(this.randomTrack());
  }

  createEmptyBooleanArray() {
    let a = [];
    for (let i = 0; i < this.tracks.length; i++) a.push(0);
    return a;
  }

  static randomStartTime() {
    return Math.floor(Math.random()*60)+Math.floor(Math.random()*30)
  }

  /**
   * Given a track object, update Youtube data
   * @param track Track object with title and artist
   */
  getYoutubeResults(track) {
    const options = {
      maxResults: 5,
      key: this.youtube_api_key.youtube
    };
    this.setState({ currentSong: track, playing: true });
    Youtube(`${track.title} ${track.artist} official`, options, (err, data) => this.setState({ytResults: data}));
  }

  getVideoUrl() {
    return this.state.ytResults ? this.state.ytResults[0].link + '?start=' + Quiz.randomStartTime() + 's': '';
  }

  /**
   * Check if all the songs have been played
   * @returns {boolean} True if quiz finished, False otherwise
   */
  quizIsFinished() {
    for (let i = 0; i < this.state.playedHistory.length; i++) {
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
      current_index = Math.floor(Math.random() * this.tracks.length);
      if (this.state.playedHistory[current_index] === 0) {
        played = true;
        let tmp_history = this.state.playedHistory;
        tmp_history[current_index] = 1;
        this.setState({ playedHistory: tmp_history });
      }
    }

    const track = this.tracks[current_index];

    this.getYoutubeResults(track);

    return track;
  }

  ref = player => {
    this.player = player;
  }

  songDetails() {
    const song = this.state.currentSong;
    return this.state.showSongName ?
      ` ${song.genre}: "${song.title || song.track}" ${song.artist} (${song.year})` : ``;
  }

  clickNextSong() {
    if (this.quizIsFinished()) {
      this.setState({ playing: false, finished: true })
    } else {
      const current_song = this.randomTrack();
      this.setState({ currentSong: current_song, showSongName: false });
    }
  }

  render() {
    const { playing } = this.state;
    return (
      <div className="Quiz">
        <h1>{this.props.title || 'Week 14'}</h1>
        <ReactPlayer
          className="hideReactPlayer"
          ref={this.ref}
          url={this.getVideoUrl()}
          playsinline
          playing={playing}
          config={{ attributes: { autoPlay: true } }}
        />

        <div className="control">
          <button className="showSong" onClick={() => this.setState({showSongName: !this.state.showSongName})}>Show Song</button>
          <button className="nextSong" onClick={this.clickNextSong}>Next Song</button>
        </div>

        { this.state.finished ? 'Quiz finished' : '' }
        <h2 className="songDetails">{this.songDetails()}</h2>
      </div>
    )
  }
}

