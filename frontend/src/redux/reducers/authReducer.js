import {  
    ALL_USERS,
    LOG_IN_CHECK, 
    ON_SUCCESS,
    EXPIRATION, 
    LOG_OUT,
    
    PROFILE_PIC,
    MAIN_PIC,

    FRIEND_REQUESTS,
    FRIEND_REQUEST_LIST,
    DECLINE_REQUEST,
    CANCEL_REQUEST,

    PENDING_REQUESTS,
    PENDING_REQUEST_LIST,

    OTHER_PROFILE,
    OTHER_PROFILE_PIC,
    // OTHER_GENRES,

    FRIENDS,
    FRIENDS_LIST,

    DELETE_ACCOUNT
} from '../constants/auth';

var initialState = {
    email: '',
    name: '',
    user_id: null,
    current_id: null,
    spotifyID: null,
    link: '',
    images: [],

    allUsers: [],
    friendRequests: [],
    pendingRequests: [],
    friends: [],
    userPosts: [],
    isAccepted: null,

    logError: null,
    logMessage: '',
    profilePic: '',
    otherProfilePic: '',
    profilePictures: [],
    otherAbout: ''
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state)

    switch(action.type) {
        case ALL_USERS:  
            updated.allUsers = action.payload           
            return updated;

        case ON_SUCCESS:
            updated.name = action.resp.display_name
            updated.email = action.resp.email
            updated.spotifyID = action.resp.id
            updated.link = action.resp.href
            updated.images = action.resp.images
            return updated;

        case LOG_IN_CHECK:
            updated.user_id = action.payload.id
            updated.name = action.payload.display_name
            return updated;

        case EXPIRATION:
            updated.login = null
            return updated;

        case LOG_OUT:
            updated.login = null
            return updated;

        case FRIEND_REQUESTS:
            return updated;

        case FRIEND_REQUEST_LIST:
            updated.friendRequests = action.payload
            return updated;

        case PENDING_REQUESTS:
            return updated;

        case PENDING_REQUEST_LIST:
            updated.pendingRequests = action.payload
            return updated;

        case FRIENDS: 
            // action.payload.pendingRequests          
            return updated;

        case FRIENDS_LIST:
            updated.friends = action.payload.friends
            return updated;

        case DECLINE_REQUEST:
            updated.friendRequests = action.payload.friendRequests
            return updated;

        case CANCEL_REQUEST:
            updated.pendingRequests = action.payload.pendingRequests
            return updated;

        case PROFILE_PIC:
            // put request
            updated.profilePic = action.payload.profilePic
            return updated;

        case MAIN_PIC:
            // get request
            updated.profilePic = action.payload.profilePic
            return updated;


        case OTHER_PROFILE: 
            console.log(action.payload)
            updated.otherAbout = action.payload.about           
            updated.friends = action.payload.friends
            updated.userPosts = action.payload.posts
            return updated;

        case OTHER_PROFILE_PIC:
            console.log(action.payload)
            // updated.otherProfilePic = action.payload
            return updated;

        case DELETE_ACCOUNT:
            console.log(action.payload)
            return updated;

        default:
            return updated;
    }
}