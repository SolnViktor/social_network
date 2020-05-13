let rerenderEntireTree: RerenderEntireTreeType = ( ) => {
    console.log ( 'State was changed')
};

type RerenderEntireTreeType = (
    state:StateType,
    addPost:AddPostType,
    updateNewPost: UpdateNewPostType
) => void

export type StateType = {
    messagesPage: MessagesPageType
    profilePage: ProfilePageType
    sidebar: SidebarType
}
export type DialogsType = {
    id: number
    name: string
}
export type PostType = {
    id: number
    messages: string
    likesCount: number
}
export type MessagesType = {
    id: number
    messages: string
}
export type FriendsType = {
    id: number
    name: string
}
export type MessagesPageType = {
    dialogs: Array<DialogsType>
    messages:Array<MessagesType>
}
export type ProfilePageType = {
    post:Array<PostType>
    newPostText: string
}
export type SidebarType = {
    friends: Array<FriendsType>
}

let state: StateType = {
    messagesPage: {
        dialogs: [
            {id: 1, name: "Viktor" },
            {id: 2, name: "Nikita" },
            {id: 3, name: "Vasil" },
            {id: 4, name: "Semen" },
            {id: 5, name: "Timofey" },
            {id: 6, name: "Andrew" }
        ],
        messages: [
            {id: 1, messages: "Hi"},
            {id: 2, messages: "How id your it-kamasutra"},
            {id: 3, messages: "Yo"},
        ]
    },
    profilePage: {
        post: [
            {id: 1, messages: "Hi", likesCount: 11},
            {id: 2, messages: "How id your it-kamasutra", likesCount: 12},
            {id: 3, messages: "I,m okey", likesCount: 5}
        ],
        newPostText: ''
    },
    sidebar: {
        friends: [
            {id:1, name: "Andrew"},
            {id:2, name: "Sasha"},
            {id:3, name: "Misha"}
        ]
    }
}

export type AddPostType = () => void

type NewPostType = {
    id: number
    messages: string
    likesCount: number
}
export type UpdateNewPostType = (newText: string) => void

export const addPost:AddPostType = () => {
    let newPost: NewPostType = {
        id: 5,
        messages: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.post.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state, addPost, updateNewPost);
}

export const updateNewPost: UpdateNewPostType = (newText: string) => {

    state.profilePage.newPostText = newText;
    rerenderEntireTree(state, addPost, updateNewPost);
}

export const subscribe = (observer: () => void) => {
    rerenderEntireTree = observer;
}


export default state;