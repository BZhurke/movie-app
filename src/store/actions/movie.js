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
    };
};

export const searchStart = () => {
    return {
        type: actionTypes.SEARCH_MOVIES_START
    };
};

export const searchSuccess = (fetchedMovies) => {
    return {
        type: actionTypes.SEARCH_MOVIES_SUCCESS,
        movies: fetchedMovies
    };
};

export const searchFail = (error) => {
    return {
        type: actionTypes.SEARCH_MOVIES_FAIL,
        error: error
    };
};

export const updateMovieList = (movie) => {
    return {
        type: actionTypes.UPDATE_MOVIES_LIST,
        movie: movie
    }
}

export const searchMovie = (movieName) => {
    return dispatch => {
        dispatch (searchStart());
        let url = 'https://www.omdbapi.com/?apikey=a9d8a61e&s=' + movieName;
        axios.get(url)
            .then(response => {
                const fetchedMovies = [];
                if(response.data.Search) {
                    for (let key in response.data.Search){
                        fetchedMovies.push({
                            data: response.data.Search[key],
                            id: response.data.Search[key].imdbID.replace(/\s/g, '')
                        });
                    }
                    dispatch(searchSuccess(fetchedMovies));
                } else {
                    dispatch(searchFail(response.data.Error));
                }
            })
            .catch(error => {
                dispatch(searchFail(error));
            })
    };
};