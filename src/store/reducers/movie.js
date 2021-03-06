import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    movies: [],
    loading: false,
    error: null
}

const fetchMoviesStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchMoviesSuccess = (state, action) => {
    return updateObject(state, { movies: action.movies, loading: false, error: null });
}

const fetchMoviesFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const searchMovieStart = (state, action) => {
    return updateObject(state, {loading: true, error: null});
}

const searchMovieFail = (state, action) => {
    return updateObject(state, {loading: false, error: action.error});
}

const searchMovieSuccess = (state, action) => {
    return updateObject(state, { movies: action.movies, loading: false, error: null });
}

const updateMovieList = (state, action) => {
    let updatedMovies = [...state.movies];
    const index = updatedMovies.findIndex(m => m.id === action.movie.id);
    updatedMovies[index] = action.movie;
    return updateObject(state, {movies: updatedMovies});
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.FETCH_MOVIES_START: return fetchMoviesStart(state, action);
        case actionTypes.FETCH_MOVIES_SUCCESS: return fetchMoviesSuccess(state, action);
        case actionTypes.FETCH_MOVIES_FAIL: return fetchMoviesFail(state, action);
        case actionTypes.SEARCH_MOVIES_START: return searchMovieStart(state, action);
        case actionTypes.SEARCH_MOVIES_FAIL: return searchMovieFail(state, action);
        case actionTypes.SEARCH_MOVIES_SUCCESS: return searchMovieSuccess(state, action);
        case actionTypes.UPDATE_MOVIES_LIST: return updateMovieList(state, action);
        default: return state;
    }
};

export default reducer;