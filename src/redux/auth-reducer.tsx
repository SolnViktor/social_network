
const SET_USER_DATA = 'SET_USER_DATA';
const FETCHING = 'FETCHING';


export type actionTypeAuth = {
    type: string
    data: {id: number, email: string, login: string}
    isFetching: boolean
}
export type AuthStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    isFetching: boolean | null,
}
let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: true,
    isFetching: true,
}


function authReducer(state: AuthStateType = initialState, action: actionTypeAuth) {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }

        default:
            return state;
    }
}


export const setAuthUserData = (id: number, email: string, login: string) => {
    return {
        type: SET_USER_DATA,
        data: {id, email, login},
    }
}
export const authIsFetching = (isFetching: boolean) => ({type: FETCHING, isFetching})



export default authReducer;