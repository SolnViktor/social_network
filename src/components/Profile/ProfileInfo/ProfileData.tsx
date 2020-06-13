import styles from "./ProfileInfo.module.scss";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faGithubSquare, faInstagram, faTwitter, faVk} from "@fortawesome/free-brands-svg-icons";
import React from "react";

export const ProfileData = ({profile, status, updateStatus, isOwner, activateEditMode}: any) => {
    return (
        <div className={styles.description}>
            {isOwner &&
            <div className={styles.btn_container}>
                <button onClick={activateEditMode} className={styles.custom_btn}>Edit</button>
            </div>}
            <div>Nick: <span>{profile.fullName}</span></div>
            <ProfileStatusWithHooks isOwner={isOwner} status={status} updateStatus={updateStatus}/>
            <hr className={styles.line}/>

            <div>Search for a job: {profile.lookingForAJob
                ? < FontAwesomeIcon className={styles.icon__search} icon={faCheck}/>
                : < FontAwesomeIcon className={styles.icon__stop} icon={faTimes}/>}
            </div>
            <div>Description: {profile.lookingForAJobDescription} </div>
            <div>About me: {profile.aboutMe} </div>
            <div className={styles.contacts}>Contacts:

                <a href={profile.contacts.vk || 'https://vk.com'} target="_blank" rel="noopener noreferrer">
                    < FontAwesomeIcon icon={faVk} className={styles.icon}/>
                </a>
                <a href={profile.contacts.twitter || 'https://twitter.com'} target="_blank" rel="noopener noreferrer">
                    < FontAwesomeIcon icon={faTwitter} className={styles.icon}/>
                </a>
                <a href={profile.contacts.facebook || 'https://facebook.com'} target="_blank" rel="noopener noreferrer">
                    < FontAwesomeIcon icon={faFacebookF} className={styles.icon}/>
                </a>
                <a href={profile.contacts.instagram || 'https://instagram.com'} target="_blank" rel="noopener noreferrer">
                    < FontAwesomeIcon icon={faInstagram} className={styles.icon}/>
                </a>
                <a href={profile.contacts.github || 'https://github.com'} target="_blank" rel="noopener noreferrer">
                    < FontAwesomeIcon icon={faGithubSquare} className={styles.icon}/>
                </a>
            </div>
        </div>
    )
}