import React, { Component } from 'react';
import axios from 'axios';
import { getIdToken } from '../Auth';
import SubmitMeasurable from './SubmitMeasurable';

interface Props {
    match: any
}
interface State {
    learning: any
}
export class Learning extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            learning: null
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const learning = (await axios.get(`http://localhost:8081/${params.learningId}`)).data;
        console.log(learning);
        this.setState({
            learning
        });
    }

    async refreshLearning() {
        const { match: { params } } = this.props;
        const learning = (await axios.get(`http://localhost:8081/${params.learningId}`)).data;
        this.setState({
          learning,
        });
      }

      async submitMeasurable(measurable: string) {
        await axios.post(`http://localhost:8081/measurable/${this.state.learning.id}`, {
          measurable,
        }, {
          headers: { 'Authorization': `Bearer ${getIdToken()}` }
        });
        await this.refreshLearning();
      }

    render() {
        const { learning } = this.state;
        if (learning === null) return <p>Loading...</p>;
        return (
            <div className="container">
                <div className="tile is-vertical is-12 ">
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-info">
                            <div className="content is-bold">
                                <p className="title">{learning.title}</p>
                                <p className="subtitle">{learning.description}</p>
                                <p className="subtitle">Measurables:</p>
                                <SubmitMeasurable submitMeasurable={this.submitMeasurable.bind(this)} />
                                {
                                    learning.measurables.map((measurable: any, index: number) => (
                                        <p className="content" key={index}>{measurable.measurable}</p>
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