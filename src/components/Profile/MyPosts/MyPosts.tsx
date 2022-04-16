import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { getTestingMode } from '../../../redux/profile-selectors';
import { addPost } from '../../../redux/profile-reducer';
import AddPostForm from './AddPostForm';
import { AppStateType } from '../../../redux/redux-store';
import { postsType } from '../../common/types/types';


type formDataType = {
    postText: string
}

const MyPosts = () => {

    const testingMode = useSelector(getTestingMode)
    const posts: Array<postsType> = useSelector( (state:AppStateType) => state.profile.posts )
    const dispatch = useDispatch()
    

    let onSubmit = (formData: formDataType) => {
        dispatch(addPost(formData.postText))
    }

    let postsElements = posts.map((post: postsType) => <Post message={post.message} likesCount={post.likesCount} avatar={post.avatar} key={post.id} />)

    return (
        <div className={testingMode ? classes.postsBlockDT + " " + classes.postsBlock : classes.postsBlock}>
            <h3>My posts</h3>
            <ReduxAddPostForm onSubmit={onSubmit} />
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}

let ReduxAddPostForm = reduxForm<formDataType, unknown>({ form: 'addNewPostForm' })(AddPostForm)

export default MyPosts;