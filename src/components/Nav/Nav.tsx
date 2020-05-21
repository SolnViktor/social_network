import React from 'react';
import styles from './Nav.module.css'
import { NavLink } from 'react-router-dom';
import Friends from "./Friends/Friends";
import {SidebarType} from "../../redux/store";

type DataStateType = {
    sidebar: SidebarType
}

const Nav = (props: DataStateType) => {
    let JSXFriends = props.sidebar.friends.map ( d => <Friends friendsName={d.name}/>)

    return (
        <nav className={styles.side__bar}>
            <div className={styles.item}>
                <NavLink activeClassName={styles.link} to="/profile">Profile</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink activeClassName={styles.link} to="/dialogs">Messages</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink activeClassName={styles.link} to="/users">Users</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink activeClassName={styles.link} to="/news">News</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink activeClassName={styles.link} to="/music">Music</NavLink>
            </div>
            <div className={`${styles.item} ${styles.active}`}>
                <NavLink activeClassName={styles.link} to="/settings">Settings</NavLink>
            </div>
            <div className={`${styles.item} ${styles.friends}`}>
                <h3>Friends</h3>
                <div className={styles.friends__item}>

                    {JSXFriends}

                </div>
            </div>
        </nav>
    );
}
export default Nav;