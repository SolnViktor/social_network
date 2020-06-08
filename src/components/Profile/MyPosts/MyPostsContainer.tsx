import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootState} from "../../../redux/redux-store";
import {
    addLikeActionCreator,
    addPostActionCreator,
    decreaseLikeActionCreator,
} from "../../../redux/profile-reducer";
import {reset} from "redux-form";


function mapStateToProps(state: RootState) {
    return {
        profilePage: state.profilePage
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        addPost: (newPost: string) => {
            dispatch(addPostActionCreator(newPost));
        },
        addLike: (id: string) => {
            dispatch(addLikeActionCreator(id));
        },
        decreaseLike: (id: string) => {
            dispatch(decreaseLikeActionCreator(id))
        },
        resetForm: () => {
            dispatch(reset('myPosts'));
        }

    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;

