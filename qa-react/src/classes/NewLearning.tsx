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
            <div className="row">
              <div className="col-12">
                <div className="card border-primary">
                  <div className="card-header">New Learning</div>
                  <div className="card-body text-left">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Title:</label>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        onBlur={(e) => {this.updateTitle(e.target.value)}}
                        className="form-control"
                        placeholder="Give your learning goal a title."
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Description:</label>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        onBlur={(e) => {this.updateDescription(e.target.value)}}
                        className="form-control"
                        placeholder="Give more context to your learning goal."
                      />
                    </div>
                    <button
                      disabled={this.state.disabled}
                      className="btn btn-primary"
                      onClick={() => {this.submit()}}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

}

// @ts-ignore
export default withRouter(NewLearning);
