import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { getIdToken } from '../Auth';
import Field from '../functions/Field';

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
                            <Field
                                onBlur={(e: any) => { this.updateTitle(e.target.value) }}
                                title="Title"
                                placeholder="Give your learning goal a title."
                            />
                            <Field
                                onBlur={(e: any) => { this.updateDescription(e.target.value) }}
                                title="Description"
                                placeholder="Give more context to your learning goal."
                                help="Give a short, easy to remember description of this goal."
                            />
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
