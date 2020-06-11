import React from 'react';
import styles from './Nav.module.css'
import { NavLink } from 'react-router-dom';




const Nav = () => {


    return (
        <nav className={styles.side__bar}>
            <div className={styles.item}>
                <NavLink className={styles.link} activeClassName={styles.active__link} to="/profile">Profile</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink className={styles.link} activeClassName={styles.active__link} to="/dialogs">Messages</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink className={styles.link} activeClassName={styles.active__link} to="/users">Users</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink className={styles.link} activeClassName={styles.active__link} to="/news">News</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink className={styles.link} activeClassName={styles.active__link} to="/music">Music</NavLink>
            </div>
            <div className={`${styles.item} ${styles.active}`}>
                <NavLink className={styles.link} activeClassName={styles.active__link} to="/settings">Settings</NavLink>
            </div>

        </nav>
    );
}
export default Nav;