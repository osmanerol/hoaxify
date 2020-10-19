import React from 'react';
import UserList from '../components/UserList';
import HoaxSubmit from '../components/HoaxSubmit';
import { useSelector } from 'react-redux';
import HoaxFeed from '../components/HoaxFeed';

const HomePage=()=>{
    const { isLoggedIn }=useSelector(store=>({isLoggedIn:store.isLoggedIn}))

    return (
        <div>
            <div className="row">
                <div className="col-md-6 mt-3">
                    {
                        isLoggedIn && <HoaxSubmit />
                    }
                    <div className="mt-1">
                        <HoaxFeed />
                    </div>
                </div>
                <div className="col-md-6 mt-3">
                    <UserList />
                </div>
            </div>
        </div>
    );
}

export default HomePage;