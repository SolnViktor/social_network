import React from 'react';
import styles from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVk, faTwitter, faFacebookF, faInstagram, faGithubSquare} from '@fortawesome/free-brands-svg-icons';
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultAva from "../../../accets/default_users_ava/user_ava.jpg"


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

const ProfileInfo = ({profile, status, updateStatus}: ProfileInfoType) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={styles.profile}>
            <div className={styles.avatar}>
                <img className={styles.ava__img} src={profile.photos.large ? profile.photos.large : defaultAva } alt=""/>
            </div>
            <div className={styles.description}>
                <div>Nick: <span >{profile.fullName}</span></div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <hr className={styles.line}/>

                <div>Search for a job: {profile.lookingForAJob
                    ? < FontAwesomeIcon className={styles.icon__search} icon={faCheck}/>
                    : < FontAwesomeIcon className={styles.icon__stop} icon={faTimes}/>}
                </div>
                <div>Description: {profile.lookingForAJobDescription} </div>
                <div>About me: {profile.aboutMe} </div>
                <div className={styles.contacts}>Contacts:

                    <a href='https://vk.com' target="_blank" rel="noopener noreferrer">
                        < FontAwesomeIcon icon={faVk} className={styles.icon}/>
                    </a>
                    <a href='https://twitter.com' target="_blank" rel="noopener noreferrer">
                        < FontAwesomeIcon icon={faTwitter} className={styles.icon}/>
                    </a>
                    <a href='https://facebook.com' target="_blank" rel="noopener noreferrer">
                        < FontAwesomeIcon icon={faFacebookF} className={styles.icon}/>
                    </a>
                    <a href='https://instagram.com' target="_blank" rel="noopener noreferrer">
                        < FontAwesomeIcon icon={faInstagram} className={styles.icon}/>
                    </a>
                    <a href='https://github.com' target="_blank" rel="noopener noreferrer">
                        < FontAwesomeIcon icon={faGithubSquare} className={styles.icon}/>
                    </a>
                </div>
            </div>


        </div>
    )
}

export default ProfileInfo;