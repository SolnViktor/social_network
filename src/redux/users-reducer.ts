import {v1} from "uuid"

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const CURRENT_PAGE = 'CURRENT_PAGE';
const TOTAL_USER_COUNT = 'TOTAL_USER_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGL_IS_FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS'


export type UsersType = {
    id: string
    avaUrl: string
    followed: boolean
    fullName: string
    status: string
    location: { city: string, country: string }
}
export type UsersStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: boolean
}
export type ActionTypeUsers = {
    type: string
    userID: string
    users: Array<UsersType>
    currentPage: number
    totalCount: number
    isFetching: boolean
    followingInProgress: boolean
}

let initialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: false
}

function usersReducer(state: UsersStateType = initialState, action: ActionTypeUsers) {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }

        case SET_USERS: {
             return { ...state, users: action.users}
        }
        case CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage}
        }
        case TOTAL_USER_COUNT: {
            return {...state, totalUserCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case FOLLOWING_IN_PROGRESS: {
            return {...state, followingInProgress: action.followingInProgress}
        }

        default:
            return state;
    }
}


export const follow = (userID: string) => ({type: FOLLOW, userID: userID})
export const unfollow = (userID: string) => ({type: UNFOLLOW, userID: userID})
export const setUsers = (users: Array<UsersType>) => ({type: SET_USERS, users})
export const changeCurrentPage = (currentPage: number) => ({type:CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalCount: number) => ({type: TOTAL_USER_COUNT,totalCount})
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING,isFetching})
export const followIsFetching = (followingInProgress: boolean) => ({type: FOLLOWING_IN_PROGRESS,followingInProgress})


export default usersReducer;