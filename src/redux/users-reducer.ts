import {followAPI, userAPI} from "../api/api";


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
    followingInProgress: any
}
export type ActionTypeUsers = {
    type: string
    userID: string
    users: Array<UsersType>
    currentPage: number
    totalCount: number
    isFetching: boolean
    followingInProgress: any
}

let initialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
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
            return {...state, users: action.users}
        }
        case CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case TOTAL_USER_COUNT: {
            return {...state, totalUserCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter((id: any) => id !== action.userID)
            }
        }

        default:
            return state;
    }
}


export const followSuccess = (userID: string) => ({type: FOLLOW, userID: userID})
export const unfollowSuccess = (userID: string) => ({type: UNFOLLOW, userID: userID})
export const setUsers = (users: Array<UsersType>) => ({type: SET_USERS, users})
export const changeCurrentPage = (currentPage: number) => ({type: CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalCount: number) => ({type: TOTAL_USER_COUNT, totalCount})
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const followIsFetching = (followingInProgress: boolean, userID: any) => ({
    type: FOLLOWING_IN_PROGRESS,
    followingInProgress,
    userID
})

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        userAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
            dispatch(changeCurrentPage(currentPage));
        });
    }
}

export const follow = (userID: string) => (dispatch: any) => {
    dispatch(followIsFetching(true, userID));
    followAPI.followUser(userID).then(resultCode => {
        if (resultCode == 0) {
            dispatch(followSuccess(userID))
        }
        dispatch(followIsFetching(false, userID));
    })
}

export const unFollow = (userID: string) => (dispatch: any) => {
    dispatch(followIsFetching(true, userID));
    followAPI.unFollowUser(userID).then(resultCode => {
        if (resultCode == 0) {
            dispatch(unfollowSuccess(userID))
        }
        dispatch(followIsFetching(false, userID));
    })
}


export default usersReducer;













