import axios from 'axios';
import { GET_ALL_GAMES, CREATE_GAME, GET_GAME_DETAIL, GET_ALL_GENRES, SEARCH_GAME, GET_ALL_PLATFORMS, DELETE_GAME, EDIT_GAME } from './actions';

export function getGames() {
    return async function(dispatch) {
        const result = await axios.get('http://localhost:3001/videogames');
        let paginado = [];
      
        
        while(result.data.length) {

            if(result.data[15]) {
            paginado.push(result.data.splice(0, 15))
            }
            else {
                paginado.push(result.data.splice(0, result.data.length+1))
            }
        }
        return dispatch({
            type: GET_ALL_GAMES,
            payload: paginado
        });

    };
};

export function getGenres() {
    return async function(dispatch) {
        const result = await axios.get('http://localhost:3001/genres');
        return dispatch({
            type: GET_ALL_GENRES,
            payload: result.data
        });
    };
};

export function getDetail(id) {
    if(id === 0) {
        return {
            type: GET_GAME_DETAIL,
            payload: false,
        }
    }
    return async function(dispatch) {
        const result = await axios.get(`http://localhost:3001/videogames/${id}`);
        return dispatch({
            type: GET_GAME_DETAIL,
            payload: result.data
        });
    };
};

export function searchGame(name) {
    if(name === 0) {
        return {
            type: SEARCH_GAME,
            payload: false,
        }
    }
    return async function(dispatch) {
        const result = await axios.get(`http://localhost:3001/videogames?name=${name}`);
        return dispatch({
            type: SEARCH_GAME,
            payload: result.data
        })
    }
};


export function getPlatforms() {
    return async function (dispatch){
        const result = await axios.get('http://localhost:3001/platforms');
        return dispatch({
            type: GET_ALL_PLATFORMS,
            payload: result.data
        })
    }
};

export function postGame(game) {
    if(game === 0) {
        return {
            type: CREATE_GAME,
            payload: {}
        }
    }
    else {
        return async function (dispatch) {
            const result = await axios.post('http://localhost:3001/videogames', game);
            return dispatch({
                type: CREATE_GAME,
                payload: result.data
            })
        }
    }
};


export function deleteGame(id) {
    return async function(dispatch) {
        const result = await axios.delete(`http://localhost:3001/videogames/${id}`);
        return dispatch({
            type: DELETE_GAME,
            payload: result.data
        });
    };
};


export function putGame(game, id) {
    return async function(dispatch) {
        const result = await axios.put(`http://localhost:3001/videogames/${id}`, game);
        return dispatch({
            type: EDIT_GAME,
        });
    };
};

