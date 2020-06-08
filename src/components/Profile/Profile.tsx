import React from 'react';
import styles from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";





function Profile(props: any) {


    return (
        <div className={styles.main}>
            <ProfileInfo status={props.status} profile={props.profile} updateStatus={props.updateStatus}/>

            <MyPostsContainer />


        </div>)
}

export default Profile;