import axios from "axios";
import {ProfileType} from '../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "534bf17a-74cd-41e2-bbdf-789a8b44abb1"
    },
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export const profileAPI = {
    getUserProfileFromId(userId: number) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getStatus (userId: number) {
        return instance.get(`profile/status/${userId}`)
            .then (response => {
                return response.data
            });
    },
    updateStatus (status: string) {
        return instance.put(`profile/status/`, {status : status});
    },
    loadPhoto (photo: string) {
        let data = new FormData();
        data.append("image", photo)
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        return instance.put(`profile/photo`, data, config)
    },
    updateProfile (formData: ProfileType) {
        return instance.put(`profile/`, formData); // Важно !! formData а не {formData}   !!
    },

}

export const userAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?sortOrder=asc&page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            } )
    },
}

export const followAPI = {
    unFollowUser(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data.resultCode
            } )
    },
    followUser(id: number) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data.resultCode
            } )
    }
}

type AuthMeType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type AuthLoginType = {
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
    data: {userId: number}
}
type AuthLogoutType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}


export const authAPI = {
    authMe () {
        return instance.get<AuthMeType>(`auth/me`)
            .then(response => {
                return response.data
            })
    },

    authLogin (email:string, password:string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<AuthLoginType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data
            })
    },
    authLogout () {
        return instance.delete<AuthLogoutType>(`auth/login`)
    }
}
export const securityAPI = {
    getCaptcha () {
        return instance.get(`security/get-captcha-url`)
    }
}