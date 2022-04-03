import { CHANGE_CURRENT_PAGE, CREATE_GAME, DELETE_GAME, EDIT_GAME, FILTER_BY_GENRES, GET_ALL_GAMES, GET_ALL_GENRES, GET_ALL_PLATFORMS, GET_BY_CREATOR, GET_BY_RATING, GET_BY_SORT, GET_GAME_DETAIL, SEARCH_GAME } from "../actions/actions";

const initialState = {
    videogames: [],
    genres: [],
    videogame: {},
    searchGames: [],
    platforms: [],
    createdRes: null,
    deletedRes: null,
    allGamesCopy: [],
    filtered: [],
    currentPage: 0,
    
}

function rootReducer(state = initialState, action) {
    switch(action.type) {

        case GET_ALL_GAMES:
            return {
                ...state,
                videogames: action.payload,
                allGamesCopy: action.payload,
                filtered: action.payload,
                sorted: action.payload,
                stared: action.payload,
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

        case FILTER_BY_GENRES:
            state.videogames = state.allGamesCopy
            const filter = ()=> {
                if(action.payload === 'All') {
                    return state.videogames
                }
                else {
                    let result = []
                    let paginado = []

                    for(let i= 0; i<state.videogames.length; i++) {
                        result.push(state.videogames[i].filter(game => game.genres?.includes(action.payload)))
                        result.flat();
                    };
                   
                    result = result.flat(10)
                    while(result.length) {
                        if(result[15]) {
                            paginado.push(result.splice(0, 15))
                        }
                        else {
                            paginado.push(result.splice(0, result.length+1))
                        }
                    }
                    return paginado;
                }
            }
            const filtered = filter();
            //console.log(filtered)
            return {
                ...state,
                videogames: filtered,
                filtered: filtered,
                
                
            };

        case GET_BY_SORT:
            state.videogames = state.filtered
            let sorted = [];
            
            action.payload === 'A-Z'? 
            sorted = state.videogames.flat().sort(function(a, b){
                         if(a.name > b.name) {
                             return 1
                         }
                        if(b.name > a.name ){
                            return -1
                        }
                         return 0
                        })
            
            : action.payload === 'Z-A'? 
            sorted = state.videogames.flat().sort(function (a, b){
                        if(a.name > b.name) {
                             return -1
                        }
                        if(b.name > a.name ){
                            return 1
                        }
                        return 0
            })
            :
            sorted = state.videogames.flat();
            
            let paginado = [];
            while(sorted.length) {
                if(sorted[15]) {
                    paginado.push(sorted.splice(0, 15))
                }
                else {
                    paginado.push(sorted.splice(0, sorted.length+1))
                }
            }
            //console.log(paginado)
            return {
                ...state,
                videogames: paginado,
                sorted: paginado,
                        
            };

        case GET_BY_RATING:
            state.videogames = state.sorted
            let filteredRating = [];
            let result = [];
            if(action.payload === 'All') {
                result = state.videogames
            }
            else {
                filteredRating = state.videogames.flat().filter(game => Math.floor(game.rating) === Math.floor(action.payload) );
            
                /*if(filteredRating.length === 1) {
                    result = filteredRating
                    console.log(result)
                }*/
                while(filteredRating.length >= 1) {
                    if(filteredRating[15]) {
                        result.push(filteredRating.splice(0, 15))
                        
                    }
                    else {
                    result.push(filteredRating.splice(0, filteredRating.length+1))
                    }
                }
                
            }
            //console.log(result)
            return {
                ...state,
                videogames: result,
                stared: result,
                
                
            };

        case GET_BY_CREATOR:
            state.videogames = state.stared;
            let byCreator = [];
            let creator = []

            if(action.payload === 'All') {
                byCreator.push(state.videogames.flat());
            }
            else if(action.payload === 'API') {
                byCreator = state.videogames.flat().filter(game => !game.createdInDb);
            }
            else {
                byCreator = state.videogames.flat().filter(game => game.createdInDb);
            };
            //console.log(byCreator)            
            if(byCreator.length === 1) {
                creator = byCreator
            }
            while(byCreator.length > 1) {
                if(byCreator[15]) {
                    creator.push(byCreator.splice(0, 15))
                }
                else {
                creator.push(byCreator.splice(0, byCreator.length+1))
                }
            };
           
            //console.log(creator)    
            return {
                ...state,
                videogames: creator
            };
            
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };

        default:
            return {
                state
            };

    }
};

export default rootReducer;