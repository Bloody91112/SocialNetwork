
import classes from './Users.module.css'
import userPhoto from '../../assets/images/cat.jpg'
import  { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Pagination from '../common/Pagination/Pagination';
import UsersSearchForm from './UsersSearchForm';
import { filterType, requestUsers, follow, unfollow } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors';


let Users = () => {

        const totalUsersCount = useSelector(getTotalUsersCount)
        const users = useSelector(getUsers)
        const currentPage = useSelector(getCurrentPage)
        const pageSize = useSelector(getPageSize)
        const followingInProgress = useSelector(getFollowingInProgress)
        const filter = useSelector(getUsersFilter)
        
        const dispatch = useDispatch();

        useEffect( () => {
            dispatch(requestUsers(currentPage, pageSize, filter))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

        const onFilterChanged = (filter: filterType) => {
            dispatch(requestUsers(1, pageSize, filter))
        }
        const onPageChanged = (currentPage: number) => {
            dispatch(requestUsers(currentPage, pageSize, filter))
        }
        
        return (
            <div className={classes.allUsers}>
                <h1 className={classes.title}>All users</h1>
                <UsersSearchForm onFilterChanged={onFilterChanged} />
                {
                    users.map(user => <div className={classes.user} key={user.id}>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ?
                                user.photos.small :
                                userPhoto}
                                className={classes.avatar} alt="" />
                        </NavLink>
                        <div className={classes.userDescription}>
                            <div className={classes.userName}>{user.name}</div>
                            <div className={classes.userStatus}>{user.status}</div>
                            <div>{user.followed
                                ? <button className={classes.button}
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => { dispatch(unfollow(user.id)) }}>
                                    UNFOLLOW
                                </button>
                                : <button className={classes.button}
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => { dispatch(follow(user.id)) }}>
                                    FOLLOW
                                </button>
                            }</div>
                        </div>

                    </div>)
                }
                <Pagination currentPage={currentPage}
                    pageSize={pageSize}
                    totalUsersCount={totalUsersCount}
                    onPageChanged={onPageChanged} />
            </div>
        )
    }


export default Users