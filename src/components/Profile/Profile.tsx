import React from 'react';
import styles from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";





function Profile(props: any) {

    return (
        <div className={styles.main}>
            <ProfileInfo profile={props.profile}/>

            <MyPostsContainer />


        </div>)
}

export default Profile;