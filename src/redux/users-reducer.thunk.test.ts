import { serverResponseType, ResultCodeEnum } from './../api/API';
import { usersAPI } from './../api/userAPI';
import { follow, followSuccess, toggleFollowInProgress } from "./users-reducer"

jest.mock("./../api/userAPI")
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result:serverResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}



test('_follow thunk test', async () => {
    
    userAPIMock.followUser.mockReturnValue(Promise.resolve(result));

    const thunk = follow(3)
    const dispatchMock = jest.fn() 
    const getState = jest.fn()
    
    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,toggleFollowInProgress(true,3))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,followSuccess(3))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,toggleFollowInProgress(false,3))
    
})

export {}