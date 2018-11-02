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
                <div className="tile is-vertical is-4">
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-primary">
                            <div className="content is-bold" key={index}>
                                <p className="title">Answers: {question.answers}</p>
                                <p className="subtitle">{question.title}</p>
                                <p className="subtitle">{question.description}</p>
                            </div>
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