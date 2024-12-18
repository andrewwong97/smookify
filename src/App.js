import React, { Component } from 'react';
import Player from './components/Player';

class App extends Component {
	constructor(props) {
		super(props);
        if (this.isMobile()) {
            alert('Smookify is currently not supported for mobile devices. Please open this link in a desktop browser (works best in Chrome/Firefox)');
        }
        let isChrome = !!window.chrome && !!window.chrome.webstore;
        if (!isChrome) {
            alert('Hey there! If Smookify doesn\'t play sound on your browser, consider using Google Chrome.');
        }
        alert('Smookify is a music quiz app that uses the Youtube API to play songs. Due to YouTu be API\'s deprecation and/or API key limitations, this app may no longer work.');
	}

    // adapted from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    isMobile() {
        return !!( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        );
    }

	render() {
		return (
			<div className="App">
				<Player/>
        <img src="tip.png" alt="" className="tips"/>
			  </div>
		);
	}
}

export default App;
