import React from 'react';
import {UsersType} from "../../redux/users-reducer";
import styles from "./Users.module.css"
import axios from 'axios'
import userAva from '../../accets/default_users_ava/user_ava.jpg'

type UsersPageType = {
    users: Array<UsersType>
    follow: (userID: string) => void
    unFollow: (userID: string) => void
    setUsers: (users: Array<UsersType>) => void
    pageSize: number
    totalUserCount: number
    currentPage: number
    changeCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

class Users extends React.Component<any> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then( response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }
    onPageChanged = (pageNumber: number) => {
        this.props.changeCurrentPage (pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then( response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUserCount / this.props.pageSize)
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

    return (
        <div>
            <div>
                { pages.map ( p => {
                    return <span onClick={ () => {this.onPageChanged (p) } }
                                 className={ this.props.currentPage === p ? `${styles.current_page} ${styles.page__number}` : styles.page__number}>{p},
                    </span>
                })}
            </div>
            { this.props.users.map((u: any) => {
                        return (
                            <div key={u.id} className={styles.user__item}>
                                <div className={styles.user}>
                                    <img className={styles.avatar} src={u.photos.small !== null ? u.photos.small : userAva}
                                         alt=""/>
                                    {u.followed
                                        ? <button onClick={() => {
                                            this.props.unFollow(u.id)
                                        }} className={styles.button}>Unfollow</button>
                                        : <button onClick={() => {
                                            this.props.follow((u.id))
                                        }} className={styles.button}>Follow</button>}

                                </div>
                                <div className={styles.user__description}>
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
}

export default Users;