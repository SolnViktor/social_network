import React from 'react';
import styles from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from '../../redux/state';


type DataPostType = {
    dataState: ProfilePageType
    addPost: () => void
    updateNewPost: (newText: string) => void

}

const Profile = (props: DataPostType) => {
    return (
        <div className={styles.main}>
            <ProfileInfo />

            <MyPosts dataPost={props.dataState.post}
                     addPost={props.addPost}
                     dataText={props.dataState.newPostText}
                     updateNewPost={props.updateNewPost}
            />


        </div>)
}

export default Profile;