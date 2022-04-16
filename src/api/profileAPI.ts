import { photosType } from './../components/common/types/types';
import { profileType } from "../components/common/types/types";
import { instance, serverResponseType } from "./API";

export const profileAPI = {

    getProfile(userId: number | null | undefined){
        return instance.get<profileType>(`profile/${userId}`)
    },

    async getStatus(userId: number){
        const response = await instance.get<string>(`profile/status/${userId}`);
        return response.data;
    },

    updateStatus(status: string){
        return instance.put<serverResponseType>(`profile/status`, { status: status })
    },

    saveProfile(data: profileType){
        return instance.put<serverResponseType>(`profile`, data)
    },

    async setPhoto(file: any){
        let formData = new FormData();
        formData.append('image', file)
        const response = await instance.put<serverResponseType<savePhotoType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
}

type savePhotoType = {
    photos: photosType
}