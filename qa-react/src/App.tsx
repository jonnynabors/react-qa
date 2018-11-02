import React, { Component } from 'react';
import { NavBar } from './functions/NavBar';
import { Questions } from './classes/Questions';

class App extends Component {
  constructor(props: any) {
    super(props);
    document.title = "Q&A App";
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="tile is-ancestor">
          <Questions />
        </div>
      </div>
    );
  }
}

export default App;
