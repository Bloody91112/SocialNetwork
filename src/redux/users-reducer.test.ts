import usersReducer, { followSuccess, initialStateType, unfollowSuccess } from "./users-reducer"


let state: initialStateType
beforeEach( () => {

    state = {
        users: [
            {id: 0, name: '1', followed: false, status: 'hi', photos: {large: null, small: null}},
            {id: 1, name: '2', followed: false, status: 'hi', photos: {large: null, small: null}},
            {id: 2, name: '3', followed: false, status: 'hi', photos: {large: null, small: null}},
            {id: 3, name: '4', followed: false, status: 'hi', photos: {large: null, small: null}},
            {id: 4, name: '5', followed: true,  status: 'hi', photos: {large: null, small: null}},
    
    
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [] as Array<number>, // array of users id
        filter: { 
            term: '',
            friend: null as null | boolean
        }
    }
})

test("_follow success", () => {
    
    const newState = usersReducer( state,unfollowSuccess(4) )

     expect(newState.users[1].followed).toBeFalsy()
     
})

test("_unfollow success", () => {
    
    const newState = usersReducer( state,followSuccess(1) )
    
     
     expect(newState.users[1].followed).toBeTruthy()

})




export {}