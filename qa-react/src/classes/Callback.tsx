import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { handleAuthentication } from '../Auth';

interface Props {
    history: any
}
class Callback extends Component<Props, {}> {
    constructor(props: any){
        super(props);
    }

  async componentDidMount() {
    await handleAuthentication();
    this.props.history.replace('/');
  }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

// @ts-ignore
export default withRouter(Callback);