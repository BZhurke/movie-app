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

export const fetchMovies = () => {
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

export const changeMovieSuccess = (movie) => {
    return {
        type: actionTypes.CHANGE_MOVIE_SUCCESS,
        movie: movie,
    };
};

export const changeMovieFail = (error) => {
    return {
        type: actionTypes.CHANGE_MOVIE_FAIL,
        error: error
    };
};

export const changeMovieStart = () => {
    return{
        type: actionTypes.CHANGE_MOVIE_START
    };
};

export const changeMovie = (movie, token) => {
    return dispatch => {
        dispatch(changeMovieStart());
        axios.patch('/movies.json?auth=' + token, movie)
            .then(res => {
                const fetchedMovie = [];
                for (let key in res.data){
                    fetchedMovie.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(changeMovieSuccess(fetchedMovie))
            })
            .catch(error => {
                dispatch(changeMovieFail(error))
            });
    };
};

export const cancelMovie = () => {
    return {
        type: actionTypes.CHANGE_MOVIE_CANCEL
    }
};

export const changeMovieInit = () => {
    return {
        type: actionTypes.CHANGE_MOVIE_INIT
    }
}