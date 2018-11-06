import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isAuthenticated } from '../Auth';

interface Props {
    submitMeasurable: Function
}
interface State {
    answer: string
}
class SubmitMeasurable extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            answer: '',
        };
    }

    updateMeasurable(answer: string) {
        this.setState({
            answer
        });
    }

    submit() {
        this.props.submitMeasurable(this.state.answer);

        this.setState({
            answer: '',
        });
    }

    render() {
        if (!isAuthenticated()) return null;
        return (
            <>
                <div className="form-group text-center">
                    <label htmlFor="exampleInputEmail1">Measurable:</label>
                    <input
                        type="text"
                        onChange={(e) => { this.updateMeasurable(e.target.value) }}
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
export default withRouter(SubmitMeasurable);
