import React, { Component } from 'react';
import './App.css';
import ReactPlayer from 'react-player';
import * as Youtube from 'youtube-search';

const SpotifyWebApi = require('spotify-web-api-js');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'client_id': 'c5055ea6d2674aebbace5e5993054428',
			'client_secret': '53381846b4d2462e93284d9a164b104e',
			'user_id': '12171649066',
			'playlist_id': '63et1p7vh9i9yByEGIuDl4',
			'youtube_api_key': 'AIzaSyDyWrh8zgTOogyLDHzz2YjX0A2MYyCPZ2E',
			yt_results: null
		}
	}

	componentDidMount() {
		const token = this.getSpotifyAccessToken();
		var spHeaders = new Headers({
			Authorization: `Bearer ${token}`
		});

		fetch(`https://api.spotify.com/v1/users/${this.state.user_id}/playlists/${this.state.playlist_id}/tracks`, 
			{method: 'GET', mode: 'no-cors', headers: spHeaders})
			.then((data) => console.log(data));

		var options = {
			maxResults: 5,
			key: this.state.youtube_api_key
		};

		Youtube('alice cooper schools out studio', options, (err, data) => this.setState({yt_results: data}));
	}

	getSpotifyAccessToken() {
		var myHeaders = new Headers({
			'Authorization': 'Basic ' + btoa(`${this.state.client_id}:${this.state.client_secret}`),
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		
		fetch('https://accounts.spotify.com/api/token', { method: 'POST', mode: 'no-cors', headers: myHeaders, data: JSON.stringify({grant_type: 'client_credentials'}) })
			.then((response) => console.log(response));
	}

	getVideoUrl() {
		return this.state.yt_results ? this.state.yt_results[0].link : 'https://www.youtube.com/watch?v=2Oo8QzDHimQ';
	}

	randomSeek() {
		this.player.seekTo(Math.random());
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
						className="showReactPlayer"
						ref={this.ref} 
						url={this.getVideoUrl()} 
						onStart={this.randomSeek.bind(this)} playing 
					/>
				</div>
			  </div>
		);
	}
}

export default App;
