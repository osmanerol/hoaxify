import React, { useState, useEffect } from 'react';
import { getUsers } from '../api/ApiCall';
import { useTranslation } from 'react-i18next';
import UserListItem from '../components/UserListItem';

const UserList=()=>{
    const [page,setPage]=useState({
        content:[],
        size:3,
        number:0
    });

    const loadUsers=(page)=>{
        getUsers(page)
        .then(response=>{
            setPage(response.data);
        })
    }
    
    useEffect(()=>{
        loadUsers();
    },[])

    const onClickNext=()=>{
        const nextPage=page.number +1;
        loadUsers(nextPage);
    }

    const onClickPrevious=()=>{
        const previousPage=page.number -1;
        loadUsers(previousPage);
    }

    const { t }=useTranslation();
    const { content:users, first, last }=page;
    return (
        <div className="card mt-3">
            <h3 className="card-header text-center">{t("Users")}</h3>
            <div className="list-group">
                {
                    users.map(user=>(
                            <UserListItem key={user.username} user={user}/>
                        )
                    )
                }
            </div>
            <div>
                {
                    first===false && <button className="btn btn-sm btn-light" onClick={onClickPrevious}>{t("Previous")}</button>
                }
                {
                    last===false && <button className="btn btn-sm btn-light float-right" onClick={onClickNext}>{t("Next")}</button>
                }
            </div>
        </div>
    );
}

export default UserList;