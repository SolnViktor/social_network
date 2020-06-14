import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {StoreDispatch} from "./redux-store";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const FETCHING = 'social-network/auth/FETCHING';
const LOGIN = 'social-network/auth/LOGIN';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';



export type actionTypeAuth = {
    type: string
    payload: { id: number | null, email: string, login: string }
    isFetching: boolean
    isAuth: boolean
    id: number
    captchaUrl: any
}
export type AuthStateType = {
    id: number | null,
    email: string | null,
    login: any
    isAuth: any
    isFetching: any
    captchaUrl: any
}

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
    captchaUrl: null,
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
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
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
export const getCaptchaUrlSuccess = (captchaUrl: any) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

export const authIsFetching = (isFetching: boolean) => ({type: FETCHING, isFetching})
export const loginId = (id: any) => ({type: LOGIN, id})

export const auth = () => async (dispatch: StoreDispatch) => {
    dispatch(authIsFetching(true));
    let response = await authAPI.authMe();
    dispatch(authIsFetching(false));
    if (response.resultCode === 0) {
        let {id, email, login} = response.data;
        dispatch(setAuthUserData(id, email, login, true));
        dispatch(getCaptchaUrlSuccess(null))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    let response = await authAPI.authLogin(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
        dispatch(loginId(response.data.userId))
        dispatch(auth());
    } else {
        if (response.resultCode === 10){
            dispatch(getCaptchaUrl());
        }
        let message = response.messages.length > 0 ? response.messages[0] : "Some error"
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.authLogout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}


export default authReducer;