import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "534bf17a-74cd-41e2-bbdf-789a8b44abb1"
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
    loadPhoto (photo: any) {
        let data = new FormData();
        data.append("image", photo)
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        return instance.put(`profile/photo`, data, config)
    },
    updateProfile (formData: any) {
        return instance.put(`profile/`, formData); // Важно !! formData а не {formData}   !!
    },

}

export const userAPI = {
    getUsers(currentPage: any = 1, pageSize: any = 10) {
        return instance.get(`users?sortOrder=asc&page=${currentPage}&count=${pageSize}`)
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

    authLogin (email:string, password:string, rememberMe: boolean = false, captcha : any = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data
            })
    },
    authLogout () {
        return instance.delete(`auth/login`)
    }
}
export const securityAPI = {
    getCaptcha () {
        return instance.get(`security/get-captcha-url`)
    }
}