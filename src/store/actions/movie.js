import * as actionTypes from './actionTypes';
import axios from '../../axios-movie';

export const fetchMoviesSuccess = (movies) => {
    return {
        type: actionTypes.FETCH_MOVIES_SUCCESS,
        movies: movies
    };
};

export const fetchMoviesFail = (error) => {
    return {
        type: actionTypes.FETCH_MOVIES_FAIL,
        error: error
    };
};

export const fetchMoviesStart = () => {
    return {
        type: actionTypes.FETCH_MOVIES_START
    };
};

export const fetchMovies = (token) => {
    return dispatch => {
        dispatch(fetchMoviesStart());
        axios.get('/movies.json')
        .then(res => {
            const fetchedMovies = [];
            for (let key in res.data){
                fetchedMovies.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchMoviesSuccess(fetchedMovies));
        })
        .catch(err => {
           dispatch(fetchMoviesFail(err));
        });
    }
}