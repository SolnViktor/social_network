import React from 'react';
import n from './Nav.module.css'
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className={n.side__bar}>
            <div className={n.item}><NavLink activeClassName={n.link} to="/profile">Profile</NavLink></div>
            <div className={n.item}><NavLink activeClassName={n.link} to="/dialogs">Messages</NavLink></div>
            <div className={n.item}><NavLink activeClassName={n.link} to="/news">News</NavLink></div>
            <div className={n.item}><NavLink activeClassName={n.link} to="/music">Music</NavLink></div>
            <div className={`${n.item} ${n.active}`}><NavLink activeClassName={n.link} to="/settings">Settings</NavLink></div>
        </nav>
    );
}
export default Nav;