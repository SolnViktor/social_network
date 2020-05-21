import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootState} from "../../../redux/redux-store";
import {
    addLikeActionCreator,
    addPostActionCreator,
    decreaseLikeActionCreator,
    updateNewPostActionCreator
} from "../../../redux/profile-reducer";


function mapStateToProps(state: RootState) {
    return {
        profilePage: state.profilePage
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        updateNewPostText: (newText: string) => {
            dispatch(updateNewPostActionCreator(newText));
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        addLike: (id: string) => {
            dispatch(addLikeActionCreator(id));
        },
        decreaseLike: (id: string) => {
            dispatch(decreaseLikeActionCreator(id))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;

