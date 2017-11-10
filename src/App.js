import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import * as Youtube from 'youtube-search';

const tracks = require('./tracks.json');
const youtube_api_key = require('./keys.json');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'youtube_api_key': youtube_api_key.youtube,
			yt_results: null,
			'showSongName': false,
			'current_song': null,
			'playing': true
		}
	}

	// adapted from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
	isMobile() {
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
	}

	randomTrack() {
		const index = Math.floor(Math.random() * tracks.length);
		const random_track = tracks[index];

		this.setState({current_song: random_track});

		return random_track;
	}

	componentDidMount() {
		document.addEventListener('keyup', (e) => {
			if(e.keyCode === 32) {
				this.setState({playing: !this.state.playing})
			}
		})
		if (this.isMobile()) {
			alert('Smookify is currently not supported for mobile devices. Please open this link in a desktop browser (works best in Chrome)');
		}

		var isChrome = !!window.chrome && !!window.chrome.webstore;
		if (!isChrome) {
			alert('Hey there! If Smookify doesn\'t play sound on your browser, consider using Google Chrome.');
		}

		var options = {
			maxResults: 5,
			key: this.state.youtube_api_key
		};

		const track = this.randomTrack();
		
		Youtube(`${track.title} ${track.artist} vevo`, options, (err, data) => this.setState({yt_results: data}));

	}

	randomStartTime() {
		// random 0 to 60 + random 20 second offset
		return Math.floor(Math.random()*60)+Math.floor(Math.random()*20);
	}

	getVideoUrl() {
		return this.state.yt_results ? this.state.yt_results[0].link + '?start=' + this.randomStartTime() + 's': '';
	}

	ref = player => {
		this.player = player;
	}

	renderCurrentSong() {
		const song = this.state.current_song;
		return this.state.showSongName ? 
			` ${song.genre}: "${song.title}," ${song.artist} (${song.year})` : ``;
	}

	render() {
		const {
			playing
		} = this.state
		return (
			<div className="App">
				<div className="Player">
					<h1>Smookify</h1>
					<h1>Week 11</h1>

					{ this.state.timer }

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

					<h2 style={{'font-weight': '300', 'color': 'white', 'font-size': '24pt'}}>{this.renderCurrentSong()}</h2>

				</div>
			  </div>
		);
	}
}

function nextSongViaKeyPress(e) {
	if(e.keyCode === 37 || e.keyCode === 39) {
		window.location.reload(true)
	}
}

window.addEventListener('keyup', nextSongViaKeyPress)

export default App;
