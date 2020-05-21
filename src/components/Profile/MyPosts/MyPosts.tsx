import React, {ChangeEvent, KeyboardEvent} from "react";
import styles from "./MyPosts.module.css"
import Post from "./Post/Post";
import {ProfilePageType} from "../../../redux/store";


type DataPostType = {
    profilePage: ProfilePageType
    updateNewPostText: (newText: string) => void
    addPost: () => void
    addLike: (id: string) => void
    decreaseLike: (id: string) => void
}

function MyPosts(props: DataPostType) {

    let JSXPost = props.profilePage.post.map(
        (post) => (
            <Post key={post.id}
                  message={post.messages}
                  likes={post.likesCount}
                  addLike={props.addLike}
                  decreaseLike={props.decreaseLike}
                  id={post.id}
            />
        )
    )


    function addPost() {
        props.addPost();
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.charCode === 13)
            addPost()
    }

    function onPostChange(e: ChangeEvent<HTMLTextAreaElement>) {
        let newText = e.target.value;
        props.updateNewPostText(newText);
    }

    return (
        <div className={styles.blog}>
            <h3 className={styles.title}>My posts</h3>
            <div>
                <div>
                    <textarea
                        className={styles.area}
                        onChange={onPostChange}
                        value={props.profilePage.newPostText}
                        onKeyPress={onKeyPressHandler}
                        cols={110}
                        rows={5}
                        placeholder="Your post"
                    />
                </div>

                <div>
                    <button className={styles.button} onClick={addPost}>Add Post</button>
                </div>
            </div>
            <div className={styles.posts}>
                {JSXPost}
            </div>
        </div>
    )
}

export default MyPosts;

