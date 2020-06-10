import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from './List';

class Example extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h1 className="text-center"> TODO List App </h1>
                        <List />
                    </div>
                </div>
            </div>
        );
    }
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
