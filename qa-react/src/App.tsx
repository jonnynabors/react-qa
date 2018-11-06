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
        <section className="section">
          <div className="container">
            <article className="message">
              <div className="message-header">
                <p>About this Learning Board</p>
                <button className="delete" aria-label="delete"></button>
              </div>
              <div className="message-body">
                Greetings, and welcome to your learning board. This is a lightweight tool to help you set concrete and achievable learning goals for yourself. 
                Much of this is based off of <a href="https://www.diygenius.com/how-to-create-a-self-directed-learning-plan/" target="_blank">this article</a>.
                <ol>
                  <li>Why do you want to learn this skill?</li>
                  <li>Set clear goals</li>
                  <li>Structure your time</li>
                  <li>Seek accountability</li>
                  <li>Apply what you're learning</li>
                </ol>
        </div>
            </article>
          </div>
        </section>
        <div className="tile is-multiline is-4 is-center" style={{ flexWrap: 'wrap' }}>
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
