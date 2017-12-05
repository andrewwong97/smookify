import React, { Component } from 'react';
import Quiz from './components/Quiz';
import GenreTest from './components/GenreTest';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quiz: true
    };

    if (this.isMobile()) {
      alert('Smookify is currently not supported for mobile devices. Please open this link in a desktop browser (works best in Chrome/Firefox)');
    }
    let isChrome = !!window.chrome && !!window.chrome.webstore;
    if (!isChrome) {
      alert('Hey there! If Smookify doesn\'t play sound on your browser, consider using Google Chrome.');
    }
    this.toggleState = this.toggleState.bind(this);
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

  toggleState() {
    this.setState({ quiz: !this.state.quiz });
  }

  render() {
    return (
      <div className="App">
        <div className="Nav-wrapper">
          <h1><a href="http://awong.io/smookify">Smookify</a></h1>
          <ul className="Nav">
            <li onClick={this.toggleState}>Quiz</li>
            <li onClick={this.toggleState}>Genre-Test</li>
          </ul>
        </div>
        {this.state.quiz ? <Quiz /> : <GenreTest />}
        <img src="tip.png" alt="" className="tips"/>
      </div>
    );
  }
}

export default App;
