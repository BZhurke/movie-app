import * as actionTypes from './actionTypes';
import axios from '../../axios-movie';

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
    };
};

export const changeMovieInit = () => {
    return {
        type: actionTypes.CHANGE_MOVIE_INIT
    };
};

export const selectedMovie = (selectedMovie) => {
    return {
        type: actionTypes.SELECTED_MOVIE,
        selectedMovie: selectedMovie
    };
}

export const fetchSelectedMovieStart = () => {
    return {
        type: actionTypes.FETCH_MOVIE_START
    };
};

export const fetchSelectedMovieSuccess = (fetchedMovie) => {
    return {
        type: actionTypes.FETCH_MOVIE_SUCCESS,
        movie: fetchedMovie
    };
};

export const fetchSelectedMovieFail = (error) => {
    return {
        type: actionTypes.FETCH_MOVIE_FAIL,
        error: error
    };
};

export const fetchSelectedMovie = (movieId) => {
    return dispatch => {
        dispatch (fetchSelectedMovieStart());
        let url = 'https://www.omdbapi.com/?apikey=a9d8a61e&i=' + movieId;
        axios.get(url)
            .then(response => {
                if(response) {
                    const fetchedMovie = {
                        data: response.data,
                        id: response.data.imdbID
                    }
                    dispatch(fetchSelectedMovieSuccess(fetchedMovie));
                } else {
                    dispatch(fetchSelectedMovieFail(response.data));
                }
            })
            .catch(error => {
                dispatch(fetchSelectedMovieFail(error));
            })
    };
}