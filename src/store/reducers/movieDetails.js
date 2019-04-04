import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    editableMovie: null,
    loading: false,
    editingMode: false,
    error: null
}

const changeMovieStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const changeMovieSuccess = (state, action) => {
    return updateObject(state, { editableMovie: action.movie[0], loading: false, editingMode: false });
}

const changeMovieFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
}

const cancelMovie = (state, action) => {
    return updateObject(state, { editingMode: false });
}

const changeMovieInit = (state, action) => {
    return updateObject(state, { editingMode: true });
}

const selectedMovie = (state, action) => {
    return updateObject(state, { editableMovie: action.selectedMovie });
}

const fetchSelectedMovieStart = (state, action) => {
    return updateObject(state, { loading: true } );
}

const fetchSelectedMovieFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error } );
}

const fetchSelectedMovieSuccess = (state, action) => {
    return updateObject(state, { editableMovie: action.movie, loading: false, editingMode: false });
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_MOVIE_START: return changeMovieStart(state, action);
        case actionTypes.CHANGE_MOVIE_SUCCESS: return changeMovieSuccess(state, action);
        case actionTypes.CHANGE_MOVIE_FAIL: return changeMovieFail(state, action);
        case actionTypes.CHANGE_MOVIE_CANCEL: return cancelMovie(state, action);
        case actionTypes.CHANGE_MOVIE_INIT: return changeMovieInit(state, action);
        case actionTypes.SELECTED_MOVIE: return selectedMovie(state, action);
        case actionTypes.FETCH_MOVIE_START: return fetchSelectedMovieStart(state, action);
        case actionTypes.FETCH_MOVIE_SUCCESS: return fetchSelectedMovieSuccess(state, action);
        case actionTypes.FETCH_MOVIE_FAIL: return fetchSelectedMovieFail(state, action);
        default: return state
    }
}

export default reducer;