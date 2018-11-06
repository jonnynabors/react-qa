import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signIn, getProfile, signOut } from '../Auth';

function NavBar(props: any) {
    const signOutUser = () => {
        signOut();
        props.history.replace('/');
    }

    return (
        <nav className="navbar is-primary">
            <div className="container">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">Learning Board</Link>
                    <Link className="navbar-item" to="/new-learning">Create a Learning Goal!</Link>
                    <span
                        className="navbar-burger burger"
                        data-target="navbarMenuHeroA"
                    >
                        <span />
                        <span />
                    </span>
                </div>
                <div id="navbarMenuHeroA" className="navbar-menu">
                    <div className="navbar-end">
                        {
                            !isAuthenticated() &&
                            <a className="navbar-item" onClick={signIn}>Sign In</a>
                        }
                        {
                            isAuthenticated() &&
                            <div>
                                <label className="mr-2 text-white">{getProfile().name}</label>
                                <a className="navbar-item" onClick={() => { signOutUser() }}>Sign Out</a>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default withRouter(NavBar);