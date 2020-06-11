import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "3d0ef147-33bd-496d-b0fb-fc0d143c3299"
    },
})

export const profileAPI = {
    getUserProfileFromId(userId: any) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getStatus (userId: any) {
        return instance.get(`profile/status/${userId}`)
            .then (response => {
                return response.data
            });
    },
    updateStatus (status: any) {
        return instance.put(`profile/status/`, {status : status});
    },
}

export const userAPI = {
    getUsers(currentPage: any = 1, pageSize: any = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            } )
    },
}

export const followAPI = {
    unFollowUser(id: any) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data.resultCode
            } )
    },
    followUser(id: any) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data.resultCode
            } )
    }
}
export const authAPI = {
    authMe () {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            })
    },

    authLogin (email:string, password:string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => {
                return response.data
            })
    },
    authLogout () {
        return instance.delete(`auth/login`)
    }
}