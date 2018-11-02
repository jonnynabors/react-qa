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
        const randomColor = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        return this.state.questions.map((question, index) => {
            return (
                <div className="tile">
                    <div className="tile is-parent">
                        <Link to={`/question/${question.id}`}>
                            <article
                                style={{
                                    backgroundColor: `hsla(
                                ${randomColor(0, 360)},
                                ${randomColor(25, 100)}%,
                                ${randomColor(25, 50)}%,
                                1
                                )`}}
                                className="tile is-child notification is-primary">
                                <div className="is-child" key={index}>
                                    <p className="title has-text-centered">Answers: {question.answers}</p>
                                    <p className="subtitle has-text-centered">{question.title}</p>
                                    <p className="content">{question.description}</p>
                                </div>
                            </article>
                        </Link>
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