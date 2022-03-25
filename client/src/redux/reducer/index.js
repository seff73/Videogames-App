import { CREATE_GAME, DELETE_GAME, EDIT_GAME, GET_ALL_GAMES, GET_ALL_GENRES, GET_ALL_PLATFORMS, GET_GAME_DETAIL, SEARCH_GAME } from "../actions/actions";

const initialState = {
    videogames: [],
    genres: [],
    videogame: {},
    searchGames: [],
    platforms: [],
    createdRes: null,
    deletedRes: null,
}

function rootReducer(state = initialState, action) {
    switch(action.type) {

        case GET_ALL_GAMES:
            return {
                ...state,
                videogames: action.payload,
            };
        
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            };
        
        case GET_GAME_DETAIL:
            return {
                ...state,
                videogame: action.payload
            };
        
        case SEARCH_GAME:
            return {
                ...state,
                searchGames: action.payload
            };

        case GET_ALL_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            };
        
        case CREATE_GAME:
            return {
                ...state,
                createdRes: action.payload
            };

        case DELETE_GAME:
            return {
                ...state,
                deletedRes: action.payload
            };

        case EDIT_GAME:
            return {
                state,
            };
            
        default:
            return {
                state
            };

    }
};

export default rootReducer;