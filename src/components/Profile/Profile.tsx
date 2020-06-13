import React from 'react';
import styles from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";





function Profile(props: any) {


    return (
        <div className={styles.main}>
            <ProfileInfo saveProfile={props.saveProfile} isOwner={props.isOwner} status={props.status} profile={props.profile} updateStatus={props.updateStatus} loadPhoto={props.loadPhoto}/>

            <MyPostsContainer />


        </div>)
}

export default Profile;