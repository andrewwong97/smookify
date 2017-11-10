import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import * as Youtube from 'youtube-search';

const tracks = require('./tracks.json');
const youtube_api_key = require('./keys.json');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			yt_results: null,
			'showSongName': false,
			'current_song': null,
			'playing': true,
			'current_index': 0
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

		this.setState({current_song: random_track, current_index: index });

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
			key: youtube_api_key.youtube
		};

		const track = this.randomTrack();
		
		Youtube(`${track.title} ${track.artist} lyrics music video`, options, (err, data) => this.setState({yt_results: data}));

	}

	randomStartTime() {
		// random 0 to 60 + random 35 second offset
		return Math.floor(Math.random()*60)+Math.floor(Math.random()*35);
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

	// render tip for some random index
	renderTip() {
		return this.state.current_index === tracks.length / 2 ?
		 <h2 style={{'fontWeight': '300', 'color': 'white', 'fontSize': '24pt'}}>Tip: Use arrow keys to navigate between songs.</h2> : '';
	}

	render() {
		const {
			playing
		} = this.state
		return (
			<div className="App">
				<div className="Player">
					<h1>Smookify <span style={{'fontWeight': '300'}}>|</span> Week 12</h1>
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

					{ this.state.current_song == null ? <div className="loading-pulse"></div> : '' }

					{ this.renderTip() }

					<h2 style={{'fontWeight': '300', 'color': 'white', 'fontSize': '24pt'}}>{this.renderCurrentSong()}</h2>

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
