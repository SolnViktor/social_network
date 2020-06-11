import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import {render} from "@testing-library/react";
import App from "../App";
import React from "react";
import {v1} from "uuid";

let state = {
    post: [
        {id: v1(), messages: "Hi", likesCount: 11},
        {id: v1(), messages: "How are you?", likesCount: 12},
        {id: v1(), messages: "I,m okey", likesCount: 5}
    ],
    profile: null,
    isFetching: true,
    status: ''
}

it('length of post should be incremented', () => {
    //1.test data
    let action = addPostActionCreator("something");

    //2.action
    let newState = profileReducer(state, action);

    //3.expectation
    expect (newState.post.length).toBe(4);
});

it('messages of new post should be correct', () => {
    //1.test data
    let action = addPostActionCreator("something");

    //2.action
    let newState = profileReducer(state, action);

    //3.expectation
    expect (newState.post[3].messages).toBe('something');
});
it('after deleting length of messages should be decremented', () => {
    //1.test data
    let action = deletePost(1);

    //2.action
    let newState = profileReducer(state, action);

    //3.expectation
    expect (newState.post.length).toBe(2);
});
it("after deleting length of messages shouldn't be decremented if id is incorrect", () => {
    //1.test data
    let action = deletePost(1);

    //2.action
    let newState = profileReducer(state, action);

    //3.expectation
    expect (newState.post.length).toBe(3);
});

