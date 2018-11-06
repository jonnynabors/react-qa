import React from 'react';
import { withRouter } from 'react-router-dom';

function Field(props: any) {
    return (
        <div className="field">
            <label className="label">{props.title}:</label>
            <input
                type="text"
                onBlur={(e) => { props.onBlur(e) }}
                className="input is-primary"
                placeholder={props.placeholder}
            />
            {props.help && <p className="help">{props.help}</p>}
        </div>
    )
}

export default withRouter(Field);