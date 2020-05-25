import preloader from "../../../accets/default_users_ava/loader.svg";
import React from "react";
import styles from './Preloader.module.css'


function Preloader () {

    return <div className={styles.preloader}>
        <img src={preloader} />
    </div>
}

export default Preloader;