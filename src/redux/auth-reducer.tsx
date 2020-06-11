import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {StoreDispatch} from "./redux-store";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
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

export const auth = () => async (dispatch: StoreDispatch) => {
    dispatch(authIsFetching(true));
    let response = await authAPI.authMe();
    dispatch(authIsFetching(false));
    if (response.resultCode === 0) {
        let {id, email, login} = response.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let response = await authAPI.authLogin(email, password, rememberMe);
    if (response.resultCode === 0) {
        dispatch(loginId(response.data.userId))
        dispatch(auth());
    } else {
        let message = response.messages.length > 0 ? response.messages[0] : "Some error"
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.authLogout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}


export default authReducer;