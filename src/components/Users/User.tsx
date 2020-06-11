import React from 'react';
import {UsersType} from "../../redux/users-reducer";
import styles from "./Users.module.scss"
import userAva from '../../accets/default_users_ava/user_ava.jpg'
import {NavLink} from 'react-router-dom';
import Paginator from "../Common/Paginator/Paginator";


function User({user, followingInProgress, unFollow, follow}: any) {

    return (
        <div className={styles.user_item}>
            <div className={styles.user}>
                <NavLink to={'/profile/' + user.id}>
                    <img className={styles.avatar} src={user.photos.small !== null ? user.photos.small : userAva}
                         alt=""/>
                </NavLink>
                {user.followed
                    ? <button disabled={followingInProgress.some((id: number) => id === user.id)}
                              onClick={() => {
                                  unFollow(user.id)
                              }}
                              className={followingInProgress.some((id: number) => id === user.id)
                                  ? `${styles.button} ${styles.disabled}`
                                  : styles.button}>Unfollow</button>
                    : <button disabled={followingInProgress.some((id: number) => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}
                              className={followingInProgress.some((id: number) => id === user.id)
                                  ? `${styles.button} ${styles.disabled}`
                                  : styles.button}> Follow </button>}
            </div>
            <div className={styles.user_description}>
                <div className={styles.name}>
                    <h3>{user.name}</h3>
                    <span>Status: {user.status}</span>
                </div>
                <div className={styles.location}>
                    <div>Country: {"user.location.country"}</div>
                    <div>City: {"user.location.city"}</div>
                </div>
            </div>
        </div>
    )
}

export default User;