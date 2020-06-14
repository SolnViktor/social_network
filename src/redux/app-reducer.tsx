import {auth} from "./auth-reducer";


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


export type actionTypeApp = {
    type: string
    initialized: boolean
}
export type AuthStateType = {
    initialized: boolean

}
let initialState = {
    initialized: false
}


function appReducer(state: AuthStateType = initialState, action: actionTypeApp) {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}


export const initializedSuccess = (initialized: boolean) => ({type: INITIALIZED_SUCCESS, initialized})

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(auth());
    // dispatch(somethingelse());
    // dispatch(somethingelse());
    Promise.all([promise]) // ! В auth-reducer добавили return перед запросом на сервер
        .then( () => {           // ! теперь auth() вернет resolve. ПОсле чего мы можем добавить аналогичные
            dispatch(initializedSuccess(true)); // промисы и после их выполнения сделать инициализацию
        })


}

export default appReducer;