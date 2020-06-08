import React from 'react';
import styles from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVk, faTwitter, faFacebookF, faInstagram, faGithubSquare} from '@fortawesome/free-brands-svg-icons';
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import ProfileStatus from './ProfileStatus'


type ProfileInfoType = {
    profile: {
        aboutMe: string
        contacts: any
        lookingForAJob: boolean
        lookingForAJobDescription: string
        fullName: string
        userId: number
        photos: any
    }
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={styles.profile}>
            <div className={styles.avatar}>
                <img className={styles.ava__img} src={props.profile.photos.large} alt=""/>
            </div>
            <div className={styles.description}>
                <div>Nick: <span >{props.profile.fullName}</span></div>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                <hr className={styles.line}/>

                <div>Search for a job: {props.profile.lookingForAJob
                    ? < FontAwesomeIcon className={styles.icon__search} icon={faCheck}/>
                    : < FontAwesomeIcon className={styles.icon__stop} icon={faTimes}/>}
                </div>
                <div>Description: {props.profile.lookingForAJobDescription} </div>
                <div>About me: {props.profile.aboutMe} </div>
                <div className={styles.contacts}>Contacts:

                    <a href='https://vk.com' target="_blank">
                        < FontAwesomeIcon icon={faVk} className={styles.icon}/>
                    </a>
                    <a href='https://twitter.com' target="_blank">
                        < FontAwesomeIcon icon={faTwitter} className={styles.icon}/>
                    </a>
                    <a href='https://facebook.com' target="_blank">
                        < FontAwesomeIcon icon={faFacebookF} className={styles.icon}/>
                    </a>
                    <a href='https://instagram.com' target="_blank">
                        < FontAwesomeIcon icon={faInstagram} className={styles.icon}/>
                    </a>
                    <a href='https://github.com' target="_blank">
                        < FontAwesomeIcon icon={faGithubSquare} className={styles.icon}/>
                    </a>
                </div>
            </div>


        </div>
    )
}

export default ProfileInfo;