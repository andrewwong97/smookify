import React, { Component } from 'react';
import Quiz from './Quiz';

export default class GenreTest extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="GenreTest">
        <Quiz title="Guess Genre and Year | Beta" tracks={require('../genre-test.json')}/>
      </div>
    )
  }
}

