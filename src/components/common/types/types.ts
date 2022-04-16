import avatar from "../../../assets/images/myAv.jpg"

export type userType = {
    id: number
    name: string
    status: string
    photos: {
        small: string | null
        large: string | null
    }
    followed?: boolean
}

export type postsType = {
    id: number
    message: string
    likesCount: number
    avatar: typeof avatar
}

export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe:string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: photosType
}

export type photosType = {
    small: string | null
    large: string | null
}

export type newsType = {
    id: number
    title: string
    text: string
    author: string
    authorAvatar: string
    likesCount: number
}
