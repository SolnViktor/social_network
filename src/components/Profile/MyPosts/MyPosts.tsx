import React from "react";
import styles from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostType} from "../../../redux/state";


type DataPostType = {
    dataPost: Array<PostType>
    addPost: () => void
    dataText: string
    updateNewPost: (newText: string) => void
}


const MyPosts = (props: DataPostType) => {

    let JSXPost = props.dataPost.map (
        (post) => (
            <Post message={post.messages} likes={post.likesCount}/>
            )
    )

    let newPostElement: any = React.createRef();


    let addPost = () => {
         props.addPost();
    }

    function onPostChange () {
        let newText = newPostElement.current.value;
        props.updateNewPost(newText);
    }

    return (
        <div className={styles.blog}>
            <h3 className={styles.title}>my posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}
                              onChange={onPostChange}
                              value={props.dataText}/>
                </div>

                <div>
                    <button onClick={addPost}>Add Post</button>
                </div>
            </div>
            <div className={styles.posts}>
                {JSXPost}
            </div>
        </div>
    )
}
export default MyPosts;

