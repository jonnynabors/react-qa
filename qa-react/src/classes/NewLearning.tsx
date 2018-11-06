import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { getIdToken } from '../Auth';

interface Props {
    history: any
}
interface State {
    disabled: boolean,
    title: string,
    description: string
}
class NewLearning extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            disabled: false,
            title: '',
            description: ''
        }
    }

    updateDescription(description: string) {
        this.setState({
            description
        })
    }

    updateTitle(title: string) {
        this.setState({
            title
        });
    }

    async submit() {
        this.setState({
            disabled: true
        });

        await axios.post('http://localhost:8081', {
            title: this.state.title,
            description: this.state.description,
        }, {
                headers: { 'Authorization': `Bearer ${getIdToken()}` }
            });

        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">New Learning</p>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            <div className="field">
                                <label className="label">Title:</label>
                                <div className="control">
                                    <input
                                        disabled={this.state.disabled}
                                        type="text"
                                        onBlur={(e) => { this.updateTitle(e.target.value) }}
                                        className="input is-primary"
                                        placeholder="Give your learning goal a title."
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Description:</label>
                                <input
                                    disabled={this.state.disabled}
                                    type="text"
                                    onBlur={(e) => { this.updateDescription(e.target.value) }}
                                    className="input is-primary"
                                    placeholder="Give more context to your learning goal."
                                />
                                <p className="help">Give a short, easy to remember description of this goal.</p>
                            </div>
                            <button
                                disabled={this.state.disabled}
                                className="btn btn-primary"
                                onClick={() => { this.submit() }}>
                                Submit
                    </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

// @ts-ignore
export default withRouter(NewLearning);
