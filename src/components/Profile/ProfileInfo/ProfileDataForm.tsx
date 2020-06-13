import styles from "./ProfileInfo.module.scss";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faGithubSquare, faInstagram, faTwitter, faVk} from "@fortawesome/free-brands-svg-icons";
import React from "react";
import {createField, Input, Textarea} from "../../Common/FormsControls/FormsControl";
import {reduxForm} from 'redux-form'
import stylesFC from "../../Common/FormsControls/FormsControl.module.scss";

const ProfileDataForm = ({status, updateStatus, isOwner, handleSubmit, error}: any) => {
    return (
        <form className={styles.description} onSubmit={handleSubmit}>
            {isOwner &&
            <div className={styles.btn_container}>
                <button className={styles.custom_btn}>Save</button>
            </div>}
            <div>Nick: {createField ("Full name", "fullName", [], Input, {}, '')}
            </div>
            <ProfileStatusWithHooks isOwner={isOwner} status={status} updateStatus={updateStatus}/>
            <hr className={styles.line}/>

            <div>Search for a job:
                <div className={styles.checkbox}>
                    {createField ("", "lookingForAJob", [], Input, {type: "checkbox"}, '')}
                </div>

            </div>
            <div>My professional skills: {createField ("Description", "lookingForAJobDescription", [], Textarea, {rows: 3, cols: 70}, '')}</div>
            <div>About me: {createField ("About me", "aboutMe", [], Textarea, {rows: 3, cols: 70}, '')}</div>
            <div className={styles.contacts}>Contacts:
                <div>
                    VK: {createField ("https://vk.com", "contacts.vk", [], Input, {}, '')}
                </div>
                <div>
                    Twitter: {createField ("https://twitter.com", "twitter", [], Input, {}, '')}
                </div>
                <div>
                    Facebook: {createField ("https://facebook.com", "facebook", [], Input, {}, '')}
                </div>
                <div>
                    Instagram: {createField ("https://instagram.com", "instagram", [], Input, {}, '')}
                </div>
                <div>
                    Github: {createField ("https://github.com", "github", [], Input, {}, '')}
                </div>
            </div>
            {error && <div className={stylesFC.errorMessage}>{error}</div>}
        </form>
    )
}

const ProfileDataReduxForm:any = reduxForm({form: 'edit-profile'})(ProfileDataForm); // !!default export не работает!! только {reduxForm}

export default ProfileDataReduxForm;