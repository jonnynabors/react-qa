import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isAuthenticated } from '../Auth';

interface Props {
    submitAnswer: Function
}
interface State {
    answer: string
}
class SubmitAnswer extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            answer: '',
        };
    }

    updateAnswer(answer: string) {
        this.setState({
            answer
        });
    }

    submit() {
        this.props.submitAnswer(this.state.answer);

        this.setState({
            answer: '',
        });
    }

    render() {
        if (!isAuthenticated()) return null;
        return (
            <>
                <div className="form-group text-center">
                    <label htmlFor="exampleInputEmail1">Answer:</label>
                    <input
                        type="text"
                        onChange={(e) => { this.updateAnswer(e.target.value) }}
                        className="form-control"
                        placeholder="Share your answer."
                        value={this.state.answer}
                    />
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => { this.submit() }}>
                    Submit
                </button>
                <hr className="my-4" />
            </>
        )
    }
}

// @ts-ignore
export default withRouter(SubmitAnswer);
