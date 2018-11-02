import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface State {
    questions: any[]
}
export class Questions extends Component<{}, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            questions: []
        }
    }

    async componentDidMount() {
        const questions = (await axios.get('http://localhost:8081/')).data;
        this.setState({
            questions
        })
    }

    renderCustomers() {
        return this.state.questions.map((question, index) => {
            return (
                <div className="tile">
                    <div className="tile is-parent is-8">
                        <article className="tile is-child notification is-primary">
                            <Link to={`/question/${question.id}`}>
                                <div className="is-child" key={index}>
                                    <p className="title has-text-centered">Answers: {question.answers}</p>
                                    <p className="subtitle has-text-centered">{question.title}</p>
                                    <p className="content">{question.description}</p>
                                </div>
                            </Link>
                        </article>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <>
                {this.renderCustomers()}
            </>
        )
    }

}