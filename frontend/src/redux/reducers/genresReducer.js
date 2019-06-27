import { 
    ALL_GENRES,
    ALL_GENRES_ERROR,

    ADD_GENRE, 
    ADD_GENRE_ERROR,

    DELETE_GENRE,
    DELETE_GENRE_ERROR,
 
    SPOTIFY, 
    SPOTIFY_ERROR, 

    OTHER_GENRES,

    CHOSEN_LIST,    
    PLAYLIST,
    PLAYLIST_ID,
    PLAYLIST_ERROR } from '../constants/genres';

var initialState = {
    genres: [],
    otherGenres: [],
    spotifyGenres: [],
    images: [],
    access_code: '',
    playlist_id: '',
    link: '',
    tracks: [],
    playlists: [],
    category: '',
    error: null,
    errorMessage: ''
}

export default (state = initialState, action) => {
    const updated = Object.assign({}, state);

    switch(action.type) {
        case ALL_GENRES:        
            updated.genres = action.payload
            return updated;

        case ALL_GENRES_ERROR:
            updated.error = true
            updated.errorMessage = 'Unable to load your genre list'
            return updated;


        case ADD_GENRE:
            updated.genres.push(action.payload)
            return updated;

        case ADD_GENRE_ERROR:
            updated.error = true
            updated.errorMessage = 'Unable to add genre'
            return updated;


        case DELETE_GENRE:
            updated.genres = action.payload
            return updated;

        case DELETE_GENRE_ERROR:
            updated.error = true
            updated.errorMessage = 'Unable to delete genre'
            return updated;


        case SPOTIFY:
            updated.spotifyGenres = action.payload;
            return updated;

        case SPOTIFY_ERROR:
            updated.error = true
            updated.errorMessage = 'Unable to display the genre list'
            return updated;


        case CHOSEN_LIST:
            updated.genres = action.payload
            return updated; 

        case PLAYLIST_ID: 
            updated.playlist_id = action.id
            return updated;


        case PLAYLIST: 
            updated.playlists = action.payload.items
            return updated

        case PLAYLIST_ERROR: 
            updated.error = true

            let regex = /^.(\baccess\b)?.$/

            if(updated.errorMessage.match(regex)) {
                updated.errorMessage = action.errMessage.message + '. Please log out and log back in.'
            }

            return updated;

        case OTHER_GENRES: 
            console.log(action)
            updated.otherGenres = action.payload           
            return updated;

        default:
            return state;
    }
}