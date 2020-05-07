import React from 'react';
import m from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const Profile = () => {
    return (
        <div className={m.main}>
            <ProfileInfo />

            <MyPosts />


        </div>)
}

export default Profile;