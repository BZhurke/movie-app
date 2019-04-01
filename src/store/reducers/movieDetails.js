import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    editableMovie: null,
    loading: false,
    editingMode: false
}

const changeMovieStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const changeMovieSuccess = (state, action) => {
    let newMovies = state.movies;
    for (let i in newMovies){
        if(newMovies[i].id === action.movie[0].id){
            newMovies[i].data = action.movie[0].data;
            break;
        }
    }
    return updateObject(state, { movies: newMovies, loading: false, editingMode: false });
}

const changeMovieFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const cancelMovie = (state, action) => {
    return updateObject(state, { editingMode: false });
}

const changeMovieInit = (state, action) => {
    return updateObject(state, { editingMode: true });
}

const selectedMovie = (state, action) => {
    console.log(action.selectedMovie);
    return updateObject(state, { editableMovie: action.selectedMovie });
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_MOVIE_START: return changeMovieStart(state, action);
        case actionTypes.CHANGE_MOVIE_SUCCESS: return changeMovieSuccess(state, action);
        case actionTypes.CHANGE_MOVIE_FAIL: return changeMovieFail(state, action);
        case actionTypes.CHANGE_MOVIE_CANCEL: return cancelMovie(state, action);
        case actionTypes.CHANGE_MOVIE_INIT: return changeMovieInit(state, action);
        case actionTypes.SELECTED_MOVIE: return selectedMovie(state, action);
        default: return state
    }
}

export default reducer;