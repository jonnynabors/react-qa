import React, { Component } from 'react';
import NavBar from './functions/NavBar';
import { Questions } from './classes/Questions';
import { Route } from 'react-router';
import { Question } from './classes/Question';
import Callback from './classes/Callback';
import SecuredRoute from './functions/SecuredRoute';
import NewQuestion from './classes/NewQuestion';

class App extends Component {
  constructor(props: any) {
    super(props);
    document.title = "Q&A App";
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="tile is-multiline" style={{ flexWrap: 'wrap' }}>
            <Route exact path='/' component={Questions} />
        </div>
        <Route exact path='/question/:questionId' component={Question} />
        <Route exact path='/callback' component={Callback} />
        <SecuredRoute path='/new-question' component={NewQuestion} />
      </div>
    );
  }
}

export default App;
