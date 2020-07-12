import {followAPI, userAPI} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';
import {UsersType} from '../types/types';
import {RootState} from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const CURRENT_PAGE = 'CURRENT_PAGE';
const TOTAL_USER_COUNT = 'TOTAL_USER_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGL_IS_FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS'


type InitialStateType = typeof initialState
let initialState = {
    users: [] as Array<UsersType>,
    totalUserCount: 0 as number,
    pageSize: 10 as number,
    portionPages: 10 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>    //массив ID пользователей, которые добавляются в начале процесса подписки и зачищаются когда с сервера прийдет ответ(для дизейбла нескольких кнопок подписки "follow")
}

function usersReducer(state = initialState, action: ActionsTypes): InitialStateType {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true}) // Объеденили follow unfollow вынесли логику в ./object-helpers
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
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
                    : state.followingInProgress.filter((id: number) => id !== action.userID)
            }
        }

        default:
            return state;
    }
}

type ActionsTypes = FollowSuccessType | UnfollowSuccessType | SetUsersType | ChangeCurrentPageType
    | SetTotalUsersCountType | ToggleIsFetchingType | FollowIsFetchingType

export type FollowSuccessType = {type: typeof FOLLOW, userID: number}
export const followSuccess = (userID: number):FollowSuccessType => ({type: FOLLOW, userID})
export type UnfollowSuccessType = {type: typeof UNFOLLOW, userID: number}
export const unfollowSuccess = (userID: number):UnfollowSuccessType => ({type: UNFOLLOW, userID})
export type SetUsersType = {type: typeof SET_USERS, users:Array<UsersType>}
export const setUsers = (users: Array<UsersType>):SetUsersType => ({type: SET_USERS, users})
export type ChangeCurrentPageType = {type: typeof CURRENT_PAGE, currentPage: number}
export const changeCurrentPage = (currentPage: number):ChangeCurrentPageType => ({type: CURRENT_PAGE, currentPage})
export type SetTotalUsersCountType = {type: typeof TOTAL_USER_COUNT, totalCount: number}
export const setTotalUsersCount = (totalCount: number):SetTotalUsersCountType => ({type: TOTAL_USER_COUNT, totalCount})
export type ToggleIsFetchingType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})
export type FollowIsFetchingType = {type: typeof FOLLOWING_IN_PROGRESS, followingInProgress: boolean, userID: number}
export const followIsFetching = (followingInProgress: boolean, userID: number):FollowIsFetchingType => ({
    type: FOLLOWING_IN_PROGRESS,
    followingInProgress,
    userID
})
type GetStateType = () => RootState
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsTypes>

export const getUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        let response = await userAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
        dispatch(changeCurrentPage(page));
    }
}

export const follow = (userID: number): ThunkType => async (dispatch) => {
    _followUnollowFlow(userID, dispatch, followAPI.followUser.bind(followAPI), followSuccess);   // apiMethod & actionCreator переменые для followUnollowFlow
}

export const unFollow = (userID: number): ThunkType => async (dispatch) => {
    _followUnollowFlow(userID, dispatch, followAPI.unFollowUser.bind(followAPI), unfollowSuccess);  // apiMethod & actionCreator переменые для followUnollowFlow
}

type ActionCreatorType = (userID: number) => {type: 'FOLLOW' | 'UNFOLLOW', userID:number}

export const _followUnollowFlow = async (userID: number, dispatch: DispatchType, apiMethod: any, actionCreator: ActionCreatorType) => {   //объеденяет follow & unfollow
    dispatch(followIsFetching(true, userID));
    let response = await apiMethod(userID);
    if (response === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(followIsFetching(false, userID));
}


export default usersReducer;













