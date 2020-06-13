import React, {useState} from 'react';
import styles from './ProfileInfo.module.scss'
import Preloader from "../../Common/Preloader/Preloader";
import defaultAva from "../../../accets/default_users_ava/user_ava.jpg"
import {ProfileData} from "./ProfileData";
import ProfileDataReduxForm from "./ProfileDataForm";
import stylesFC from "../../Common/FormsControls/FormsControl.module.scss";


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
    isOwner: boolean
    loadPhoto: any
    saveProfile: any
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, loadPhoto, saveProfile}: any) => {
    let [editMode, setEditMode] = useState (false);
    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
    }

    if (!profile) {
        return <Preloader/>
    }
    const handleFileLoad = (e: any) => {
        if(e.target.files.length) {
            loadPhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: any) => {
        debugger
        saveProfile(formData).then( () => {
            deactivateEditMode();
            }
        )
    }


    return (
        <div className={styles.profile}>
            <div className={styles.avatar}>
                <div>
                    <img className={styles.ava__img} src={profile.photos.large || defaultAva } alt=""/>
                </div>
                {isOwner &&
                <div className={styles.btn}>
                    <label htmlFor="file-upload" className={styles.custom_btn}>
                        <span>Set your avatar</span>
                    </label>
                    <input id="file-upload" className={styles.btn_hide} type={"file"} name="Set avatar" onChange={handleFileLoad}/>
                </div>}
            </div>

            {editMode ? <ProfileDataReduxForm onSubmit={onSubmit} initialValues={profile} status={status} updateStatus={updateStatus} isOwner={isOwner}/>
            : <ProfileData activateEditMode={activateEditMode} profile={profile} status={status} updateStatus={updateStatus} isOwner={isOwner}/>
            }
        </div>
    )
}

export default ProfileInfo;