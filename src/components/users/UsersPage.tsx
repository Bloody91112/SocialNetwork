import { useSelector } from "react-redux";
import Users from './Users'
import Preloader from "../common/preloader/Preloader";
import { getIsFetching } from "../../redux/users-selectors";


const UsersPage = () => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}

export default UsersPage