import React, { Component } from 'react';
import axios from 'axios';

interface Props {
    match: any
}
interface State {
    question: any
}
export class Question extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            question: null
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const question = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;
        console.log(question);
        this.setState({
            question
        });
    }

    render() {
        const { question } = this.state;
        if (question === null) return <p>Loading...</p>;
        return (
            <div className="container">
                <div className="tile is-vertical is-12 ">
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-info">
                            <div className="content is-bold">
                                <p className="title">{question.title}</p>
                                <p className="subtitle">{question.description}</p>
                                <p className="subtitle">Answers:</p>
                                {
                                    question.answers.map((answer: any, index: number) => (
                                        <p className="content" key={index}>{answer.answer}</p>
                                    ))
                                }
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}