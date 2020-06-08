import React from 'react';
import {UsersType} from "../../redux/users-reducer";
import styles from "./Users.module.scss"
import userAva from '../../accets/default_users_ava/user_ava.jpg'
import { NavLink } from 'react-router-dom';



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

function Users (props: UsersPageType) {


    let pagesCount = Math.ceil(props.totalUserCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map( (p, i) => {
                    return <span onClick={() => {props.onPageChanged(p)}}
                                 className={props.currentPage === p
                                     ? `${styles.current_page} ${styles.page_number}`
                                     : styles.page_number}>{p},
                    </span>
                })}
            </div>
            {props.users.map((u: any) => {
                    return (
                        <div key={u.id} className={styles.user_item}>
                            <div className={styles.user}>
                                <NavLink to={'/profile/' + u.id}>
                                <img className={styles.avatar} src={u.photos.small !== null ? u.photos.small : userAva}
                                     alt=""/>
                                </NavLink>
                                {u.followed
                                    ? <button disabled={props.followingInProgress.some( (id:number) => id === u.id)}
                                              onClick={() => {props.unFollow(u.id)}}
                                              className={props.followingInProgress.some( (id:number) => id === u.id)
                                                  ? `${styles.button} ${styles.disabled}`
                                                  : styles.button}>Unfollow</button>
                                    : <button disabled={props.followingInProgress.some( (id:number) => id === u.id)}
                                              onClick={() => {props.follow(u.id)}}
                                              className={props.followingInProgress.some( (id:number) => id === u.id)
                                                  ? `${styles.button} ${styles.disabled}`
                                                  : styles.button}> Follow </button>}
                            </div>
                            <div className={styles.user_description}>
                                <div className={styles.name}>
                                    <h3>{u.name}</h3>
                                    <span>Status: {u.status}</span>
                                </div>
                                <div className={styles.location}>
                                    <div>Country: {"u.location.country"}</div>
                                    <div>City: {"u.location.city"}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            )
            }
        </div>
    )

}

export default Users;