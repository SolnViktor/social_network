import React from 'react';
import {UsersType} from "../../redux/users-reducer";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";


type UsersPageType = {
    users: Array<UsersType>
    follow: (userID: string) => void
    unFollow: (userID: string) => void
    pageSize: number
    totalUserCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followingInProgress: any
}

function Users({currentPage, onPageChanged, totalUserCount, pageSize, users, ...props}: UsersPageType) {

    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalUserCount={totalUserCount} pageSize={pageSize}/>
            {users.map((u: any) =>
                    <User key={u.id}
                                         user={u}
                                         followingInProgress={props.followingInProgress}
                                         follow={props.follow}
                                         unFollow={props.unFollow}
            />
            )}
        </div>
    )
}

export default Users;