import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface State {
    learnings: any[]
}
export class Learnings extends Component<{}, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            learnings: []
        }
    }

    async componentDidMount() {
        const learnings = (await axios.get('http://localhost:8081/')).data;
        this.setState({
            learnings
        })
    }


    renderCustomers() {
        const randomColor = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        return this.state.learnings.map((learning, index) => {
            return (
                <div className="tile">
                    <div className="tile is-parent">
                        <Link to={`/learning/${learning.id}`}>
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
                                    <p className="title has-text-centered">Measurables: {learning.measurables}</p>
                                    <p className="subtitle has-text-centered">{learning.title}</p>
                                    <p className="content">{learning.description}</p>
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