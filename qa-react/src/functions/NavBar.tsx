import React from 'react';
import {Link} from 'react-router-dom';

export function NavBar() {
    return (
        <nav className="navbar is-primary">
              <div className="container">
                <div className="navbar-brand">
                  <Link className="navbar-item" to="/">Q&A App</Link>
                </div>
            </div>
        </nav>
    )
}
