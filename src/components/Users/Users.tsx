import React from 'react';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import { UsersType } from '../../types/types';


type UsersPageType = {
    users: Array<UsersType>
    follow: (userID: string) => void
    unFollow: (userID: string) => void
    pageSize: number
    totalUserCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followingInProgress: any
    portionPages: number
}

function Users({currentPage, onPageChanged, totalUserCount, pageSize, users, portionPages, ...props}: UsersPageType) {

    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalUserCount={totalUserCount} pageSize={pageSize} portionPages={portionPages}/>
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