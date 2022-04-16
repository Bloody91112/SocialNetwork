import { instance, serverResponseType } from "./API";

export const headerAPI = {
    async getAuthUserData() {
        const response = await instance.get<serverResponseType<getAuthUserDataType>>(`auth/me`);
        return response.data;
    }
}



type getAuthUserDataType = {
        id:number
        email:string
        login: string
}
