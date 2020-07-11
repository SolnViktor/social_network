import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {StoreDispatch} from "./redux-store";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const FETCHING = 'social-network/auth/FETCHING';
const LOGIN = 'social-network/auth/LOGIN';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';



export type AuthActionType = {
    type: string
    payload: { id: number | null, email: string, login: string }
    isFetching: boolean
    isAuth: boolean
    id: number
    captchaUrl: string
}

export type AuthStateType = typeof initialState

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null | number,
    isAuth: false,
    isFetching: true,
    captchaUrl: null as string | null,
}


function authReducer(state = initialState, action: AuthActionType):AuthStateType {

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
                login: action.id,
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

type SetAuthUserDataPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataPayloadType
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean):SetAuthUserDataActionType => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth},
    }
}

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string | null}
}
export const getCaptchaUrlSuccess = (captchaUrl: string | null):GetCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})
type AuthIsFetchingActionType = {
    type: typeof FETCHING
    isFetching: boolean
}
export const authIsFetching = (isFetching: boolean):AuthIsFetchingActionType => ({type: FETCHING, isFetching})
type LoginIdActionType = {type: typeof LOGIN, id: string}
export const loginId = (id: string):LoginIdActionType => ({type: LOGIN, id})

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

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const getCaptchaUrl = () => async (dispatch: StoreDispatch) => {
    let response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export const logout = () => async (dispatch: StoreDispatch) => {
    let response = await authAPI.authLogout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}


export default authReducer;