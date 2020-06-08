import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const FETCHING = 'FETCHING';
const LOGIN = 'LOGIN';


export type actionTypeAuth = {
    type: string
    payload: { id: number | null, email: string, login: string }
    isFetching: boolean
    isAuth: boolean
    id: number
}
export type AuthStateType = {
    id: number | null,
    email: string | null,
    login: any
    isAuth: any
    isFetching: any

}
let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
}


function authReducer(state: AuthStateType = initialState, action: actionTypeAuth) {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case LOGIN:
            return {
                ...state,
                login: action.id
            }

        default:
            return state;
    }
}


export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth},
    }
}


export const authIsFetching = (isFetching: boolean) => ({type: FETCHING, isFetching})
export const loginId = (id: any) => ({type: LOGIN, id})

export const auth = () => {
    return (dispatch: any) => {
        dispatch(authIsFetching(true))
        authAPI.authMe().then(response => {
            dispatch(authIsFetching(false))
            if (response.resultCode === 0) {
                let {id, email, login} = response.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        })
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {

    authAPI.authLogin(email, password, rememberMe).then(data => {
        if (data.resultCode === 0) {
            dispatch(loginId(data.data.userId))
            dispatch(auth());
        } else {
            alert(data.messages[0])
        }
    })
}

export const logout = () => (dispatch: any) => {
    authAPI.authLogout().then(data => {
        if (data.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    })
}


export default authReducer;