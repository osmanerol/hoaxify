import React, { Component } from 'react';
import ProfileCard from '../components/ProfileCard';

class UserPage extends Component {
    render() {
        return (
            <div>
                <ProfileCard {...this.props} />
            </div>
        );
    }
}

export default UserPage;