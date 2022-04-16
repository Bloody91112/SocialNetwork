import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "eff852e3-484c-406c-bcf5-897fd666c48d"
    },
})

export enum ResultCodeEnum  {
    Success = 0,
    Error = 1
}

export type serverResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}