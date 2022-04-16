import { instance,serverResponseType } from "./API";


export const loginAPI = {
    async loginUser(email: string, password: string, rememberMe = false, captcha = null){
        const response = await instance.post<serverResponseType<loginUserType>>(`auth/login`, { email, password, rememberMe, captcha });
        return response.data;
    },
    logoutUser(){
        return instance.delete(`auth/login`)
    }
}

type loginUserType = {
        userId:number
}