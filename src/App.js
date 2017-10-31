import React, { Component } from 'react';
import './App.css';
import ReactPlayer from 'react-player';
import * as Youtube from 'youtube-search';

const tracks = require('./tracks.json');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'client_id': 'c5055ea6d2674aebbace5e5993054428',
			'client_secret': '53381846b4d2462e93284d9a164b104e',
			'user_id': '12171649066',
			'playlist_id': '63et1p7vh9i9yByEGIuDl4',
			'youtube_api_key': 'AIzaSyDyWrh8zgTOogyLDHzz2YjX0A2MYyCPZ2E',
			yt_results: null,
			'showSongName': false,
			'current_song': null
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
		const track_strings = tracks.items.map((i) => `${i.track.name}, ${i.track.artists[0].name}`);
		const random_track = track_strings[Math.floor(Math.random() * track_strings.length)];

		this.setState({current_song: random_track});

		return random_track;
	}

	componentDidMount() {
		if (this.isMobile()) {
			alert('Smookify is currently not supported for mobile devices. Please open this link in a desktop browser (works best in Chrome)');
		}

		var isChrome = !!window.chrome && !!window.chrome.webstore;
		if (!isChrome) {
			alert('Hey there! If Smookify doesn\'t play sound on your browser, consider using Google Chrome.');
		}

		const r = this.randomTrack();

		var options = {
			maxResults: 5,
			key: this.state.youtube_api_key
		};

		Youtube(`${r} lyrics song`, options, (err, data) => this.setState({yt_results: data}));
	}

	getSpotifyAccessToken() {
		var myHeaders = new Headers({
			'Authorization': 'Basic ' + btoa(`${this.state.client_id}:${this.state.client_secret}`),
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		
		fetch('https://accounts.spotify.com/api/token', { method: 'POST', mode: 'no-cors', headers: myHeaders, data: JSON.stringify({grant_type: 'client_credentials'}) })
			.then((response) => console.log(response));
	}

	randomStartTime() {
		// random 0 to 60 + random 20 second offset
		return Math.floor(Math.random()*60)+Math.floor(Math.random()*20);
	}

	getVideoUrl() {
		return this.state.yt_results ? this.state.yt_results[0].link + '?start=' + this.randomStartTime() + 's': 'https://www.youtube.com/watch?v=2Oo8QzDHimQ';
	}

	ref = player => {
		this.player = player;
	}

	render() {
		return (
			<div className="App">
				<div className="Player">
					<h1>Smookify</h1>
										
					<ReactPlayer
						className="hideReactPlayer"
						ref={this.ref} 
						url={this.getVideoUrl()} 
						playing
						playsinline
						config={{ attributes: { autoPlay: true } }}
					/>

					<div className="control">
						<button className="showSong" onClick={() => this.setState({showSongName: !this.state.showSongName})}>Click to Show Song Name</button>
						<button className="nextSong" onClick={() => window.location.reload(true)}>Next Song</button>
					</div>

					<h1>{this.state.showSongName ? this.state.current_song : ''}</h1>
					
				</div>
			  </div>
		);
	}
}

export default App;
