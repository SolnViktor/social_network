import React from 'react';
import styles from './Header.module.css';
import siteLogo from '../../accets/siteLogo/siteLogo.png'
import { NavLink } from 'react-router-dom';



const Header = (props: any) => {
    return (
    <header className={styles.header}>
        <img className={styles.logo_img} src={siteLogo}
             alt="logo"/>
             <div className={styles.login_block}>
                 { props.isAuth === true
                     ? <div> {props.login} - <button onClick={props.logout}>Logout</button></div>
                     : <NavLink to={'/login'}>Login</NavLink> }
             </div>

    </header>
    )
}

export default Header;

