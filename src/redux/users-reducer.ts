import {v1} from "uuid"

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const CURRENT_PAGE = 'CURRENT_PAGE';
const TOTAL_USER_COUNT = 'TOTAL_USER_COUNT'


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
}
export type ActionTypeUsers = {
    type: string
    userID: string
    users: Array<UsersType>
    currentPage: number
    totalCount: number
}

let initialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
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

        default:
            return state;
    }
}


export const followAC = (userID: string) => ({type: FOLLOW, userID: userID})
export const unfollowAC = (userID: string) => ({type: UNFOLLOW, userID: userID})
export const setUsersAC = (users: Array<UsersType>) => ({type: SET_USERS, users})
export const changeCurrentPageAC = (currentPage: number) => ({type:CURRENT_PAGE, currentPage: currentPage})
export const setTotalUsersCountAC = (totalCount: number) => ({type: TOTAL_USER_COUNT,totalCount: totalCount})


export default usersReducer;