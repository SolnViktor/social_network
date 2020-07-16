import preloader from '../../../accets/Spinner-1s-200px.svg'
import React from "react";
import styles from './Preloader.module.css'


function Preloader () {

    return <div className={styles.preloader}>
        <img src={preloader} alt={"preloader"}/>
    </div>
}

export default Preloader;