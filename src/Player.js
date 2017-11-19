import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import * as Youtube from 'youtube-search';



const tracks = require('./tracks.json');
const youtube_api_key = require('./keys.json');

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yt_results: null,
            'showSongName': false,
            'current_song': null,
            'playing': true,
            'current_index': 0
        }

        window.addEventListener('keyup', this.nextSongViaKeyPress);
    }

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

        let isChrome = !!window.chrome && !!window.chrome.webstore;
        if (!isChrome) {
            alert('Hey there! If Smookify doesn\'t play sound on your browser, consider using Google Chrome.');
        }

        const options = {
            maxResults: 5,
            key: youtube_api_key.youtube
        };

        const track = this.randomTrack();

        Youtube(`${track.title} ${track.artist} lyrics music video`, options, (err, data) => this.setState({yt_results: data}));

    }

    randomStartTime() {
        // random 0 to 90 + random 35 second offset
        return Math.floor(Math.random()*90)+Math.floor(Math.random()*35);
    }

    getVideoUrl() {
        return this.state.yt_results ? this.state.yt_results[0].link + '?start=' + this.randomStartTime() + 's': '';
    }

    ref = player => {
        this.player = player;
    }

    songDetails() {
        const song = this.state.current_song;
        return this.state.showSongName ?
            ` ${song.genre}: "${song.title}," ${song.artist} (${song.year})` : ``;
    }

    // render arrow keys tip
    renderTip() {
        return this.state.current_index === tracks.length / 2 ?
            <h2 style={{'fontWeight': '300', 'color': 'white', 'fontSize': '24pt'}}>Tip: Use arrow keys to navigate between songs.</h2> : '';
    }

    randomTrack() {
        const current_index = Math.floor(Math.random() * tracks.length);
        const current_song = tracks[current_index];

        this.setState({ current_song, current_index });

        return current_song;
    }

    render() {
        const { playing } = this.state
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
                    <button className="nextSong" onClick={() => window.location.reload(true)}>Next Song</button>
                </div>

                { this.renderTip() }

                <h2 style={{'fontWeight': '300', 'color': 'white', 'fontSize': '24pt'}}>{this.songDetails()}</h2>

            </div>
        )
    }
}

