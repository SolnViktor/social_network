import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={s.blog}>
            <h3 className={s.title}>my posts</h3>
            <div>
                <div>
                    <textarea name="My name" id="text"></textarea>
                </div>

                <div>
                <button>Add Post</button>
                </div>
            </div>
            <div className={s.posts}>
            <Post message="Hi, how are you?" likes={10}/>
            <Post message="It's my first post" likes={15}/>
            </div>
        </div>
    )
}
export default MyPosts;

