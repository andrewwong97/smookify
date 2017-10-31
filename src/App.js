import React, { Component } from 'react';
import './App.css';
import ReactPlayer from 'react-player';
import * as Youtube from 'youtube-search';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'client_id': 'c5055ea6d2674aebbace5e5993054428',
			'client_secret': '53381846b4d2462e93284d9a164b104e',
			'user_id': '12171649066',
			'spotify_uri': 'https://open.spotify.com/embed?uri=spotify:user:12171649066:playlist:63et1p7vh9i9yByEGIuDl4',
			'youtube_api_key': 'AIzaSyDyWrh8zgTOogyLDHzz2YjX0A2MYyCPZ2E',
			yt_results: null
		}
	}

	componentDidMount() {
		var options = {
			maxResults: 5,
			key: this.state.youtube_api_key
		};

		Youtube('alice cooper schools out studio', options, (err, data) => this.setState({yt_results: data}));
		console.log(this.state.yt_results);	
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
