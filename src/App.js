import React, { Component } from 'react';
import Player from './Player';

class App extends Component {
	constructor(props) {
		super(props);
        if (this.isMobile()) {
            alert('Smookify is currently not supported for mobile devices. Please open this link in a desktop browser (works best in Chrome/Firefox)');
        }
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
			  </div>
		);
	}
}



export default App;
