import React, { Component } from 'react';
import NavBar from './functions/NavBar';
import { Learnings } from './classes/Learnings';
import { Route } from 'react-router';
import { Learning } from './classes/Learning';
import Callback from './classes/Callback';
import SecuredRoute from './functions/SecuredRoute';
import NewQuestion from './classes/NewLearning';

class App extends Component {
  constructor(props: any) {
    super(props);
    document.title = "Learning Plan";
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="tile is-multiline" style={{ flexWrap: 'wrap' }}>
            <Route exact path='/' component={Learnings} />
        </div>
        <Route exact path='/learning/:learningId' component={Learning} />
        <Route exact path='/callback' component={Callback} />
        <SecuredRoute path='/new-learning' component={NewQuestion} />
      </div>
    );
  }
}

export default App;
