import {followAPI, userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";


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
    portionPages: number
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
    totalUserCount: 0,
    pageSize: 10,
    portionPages: 10,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

function usersReducer(state: UsersStateType = initialState, action: ActionTypeUsers) {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id",{followed: true}) // Объеденили follow unfollow вынесли логику в ./object-helpers
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id",{followed: false})
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


export const followSuccess = (userID: string) => ({type: FOLLOW, userID})
export const unfollowSuccess = (userID: string) => ({type: UNFOLLOW, userID})
export const setUsers = (users: Array<UsersType>) => ({type: SET_USERS, users})
export const changeCurrentPage = (currentPage: number) => ({type: CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalCount: number) => ({type: TOTAL_USER_COUNT, totalCount})
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const followIsFetching = (followingInProgress: boolean, userID: any) => ({
    type: FOLLOWING_IN_PROGRESS,
    followingInProgress,
    userID
})

export const getUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        let response = await userAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
        dispatch(changeCurrentPage(page));
    }
}

export const follow = (userID: string) => async (dispatch: any) => {
    followUnollowFlow(userID, dispatch, followAPI.followUser.bind(followAPI), followSuccess);   // apiMethod & actionCreator переменые для followUnollowFlow
}

export const unFollow = (userID: string) => async (dispatch: any) => {
    followUnollowFlow(userID, dispatch, followAPI.unFollowUser.bind(followAPI), unfollowSuccess);  // apiMethod & actionCreator переменые для followUnollowFlow
}

export const followUnollowFlow = async (userID: string, dispatch: any, apiMethod: any, actionCreator: any) => {   //объеденяет follow & unfollow
    dispatch(followIsFetching(true, userID));
    let response = await apiMethod(userID);
    if (response === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(followIsFetching(false, userID));
}


export default usersReducer;













