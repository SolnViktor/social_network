import React from "react";
import styles from "./MyPosts.module.css"
import Post from "./Post/Post";
import {reduxForm, Field} from 'redux-form'
import {ProfilePageType} from "../../../redux/profile-reducer";
import {maxLengthCreator, required} from '../../../utils/validators/validators'
import {Textarea} from "../../Common/FormsControls/FormsControl";


type DataPostType = {
    profilePage: ProfilePageType
    addPost: (value: string) => void
    addLike: (id: string) => void
    decreaseLike: (id: string) => void
    resetForm: (form:string) => void
}

function MyPosts(props: DataPostType) {

    let JSXPost = props.profilePage.post.map(
        (post: any) => (
            <Post key={post.id}
                  message={post.messages}
                  likes={post.likesCount}
                  addLike={props.addLike}
                  decreaseLike={props.decreaseLike}
                  id={post.id}
            />
        )
    )


    const addPostBody = (value: any) => {
        props.addPost(value.post);
        props.resetForm('myPosts');
    }

    return (
        <div className={styles.blog}>
            <h3 className={styles.title}>My posts</h3>
            <PostFormRedux onSubmit={addPostBody}/>
            <div className={styles.posts}>
                {JSXPost}
            </div>
        </div>
    )
}
export default MyPosts;

const maxLength10 = maxLengthCreator(50);

const PostsForm = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
                <Field
                    name={"post"}
                    component={Textarea}
                    className={styles.area}
                    validate={[required, maxLength10]}
                />
                <button className={styles.button}>Add Post</button>
        </form>
    )
}
let PostFormRedux = reduxForm({form: 'myPosts'})(PostsForm);




