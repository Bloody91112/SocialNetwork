import { userType } from "../components/common/types/types";
import { instance, serverResponseType } from "./API";


type getUsersType = {
    items: Array<userType>
    totalCount:number
    error: string | null
}




export const usersAPI = {
    async getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        const response = await instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`));
        return response.data;
    },

    async followUser(userId: number) {
        const response = await instance.post<serverResponseType>(`follow/${userId}`);
        return response.data;
    },

    async unfollowUser(userId: number) {
        const response = await instance.delete<serverResponseType>(`follow/${userId}`);
        return response.data;
    }
}

