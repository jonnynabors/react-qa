import React from 'react';
import { Route } from 'react-router-dom';
import { isAuthenticated, signIn } from '../Auth';

function SecuredRoute(props: any) {
    const { component: Component, path } = props;
    return (
        <Route path={path} render={() => {
            if (!isAuthenticated()) {
                signIn();
                return <div></div>
            }
            return <Component />
        }} />
    )
}

export default SecuredRoute;