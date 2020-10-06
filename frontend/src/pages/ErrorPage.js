import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorPage extends Component {
    render() {
        return (
            <div className="container mt-5 text-center">
                <h2>Page not found.</h2>
                <Link to="/">Homepage</Link>
            </div>
        )
    }
}

export default ErrorPage;