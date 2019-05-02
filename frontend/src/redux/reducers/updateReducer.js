import { 
    ALL_POSTS, 
    ALL_POSTS_ERROR, 

    ADD_POST, 
    ADD_POST_ERROR, 
    DELETE_POST,

    ADD_PIC,
    ADD_PIC_ERROR,

    DELETE_PIC,
    DELETE_PIC_ERROR,

    EDIT_ABOUT,
    ABOUT_ME,

    OTHER_PROFILE,
     
    ALL_PICS, 
    TOP_NEWS, 
    ALL_TOPICS } from '../constants/updates';

const initialState = {
    posts: [],
    display_name: '',
    about: '',
    pics: [],
    noPics: '',
    topNews: [],
    allNews: [],
    error: null,
    errorMessage: ''
}

export default (state = initialState, action) => {
    const updated = Object.assign({}, state)

    switch(action.type) {
        case ALL_POSTS:
            updated.display_name = action.payload.posts.display_name
            updated.posts = action.payload.posts
            return updated;

        case ALL_POSTS_ERROR:
            updated.error = true
            updated.errorMessage = 'Unable to load posts'
            return updated;


        case ADD_POST:
            updated.display_name = action.name

            if(action.payload.hasOwnProperty('news')) {
                action.payload.post = ""
            }

            updated.posts.unshift(action.payload)       
            return updated;

        case ADD_POST_ERROR:
            updated.error = true
            updated.errorMessage = 'Unable to add your new post'
            return updated;

        case DELETE_POST:
            updated.posts = action.payload
            return updated;


        case ADD_PIC:
            updated.pics.unshift(action.payload) 
            window.location.reload()       
            return updated;

        case ADD_PIC_ERROR:
            updated.error = true
            updated.errorMessage = 'Unable to add image'
            return updated;


        case DELETE_PIC: 
            console.log(action)
            updated.pics = action.payload
            return updated;

        case DELETE_PIC_ERROR:
            console.log('delete pic error')
            return updated;           

        case ALL_PICS:            
            if(updated.pics.length === 0) {
                updated.noPics = 'Fill up your photo gallery by adding cool images!'
            } 
            updated.pics = action.payload.pictures
            console.log(updated)
            return updated;

        case TOP_NEWS:
            updated.topNews = action.payload
            return updated;

        case ALL_TOPICS:
            updated.allNews = action.payload
            return updated;

        case EDIT_ABOUT:
            updated.about = action.payload         
            return updated;

        case ABOUT_ME:
            updated.about = action.payload
            return updated;

        case OTHER_PROFILE:
            action.payload.forEach(item => {
                updated.about = item.about
                updated.posts = item.posts
            })
            return updated;

        default:
            return state;
    }
}