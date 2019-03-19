import React, { Component } from 'react';
import { connect } from 'react-redux';

import Movie from '../../components/Movie/Movie';
import MovieEditForm from '../../components/Movie/MovieEditForm/MovieEditForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-movie';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';

let editingForm = null;

class Movies extends Component {
    componentDidMount(){
        this.props.onFetchMovies(this.props.token);
    }

    editingModeCloseHandler = () => {
        this.props.onMovieCancel();
    }

    editMovieHandler = (id) => {
        let movieData = this.props.movies.filter(obj => {
            return obj.id === id;
        })
        this.props.changeMovieInit();
        editingForm = <MovieEditForm editingFilm={movieData[0]}/>
    }

    render() {
        let movies = <Spinner/>;
        if(!this.props.loading){
            movies = (
                this.props.movies.map(movie => (
                    <Movie 
                        key = {movie.id}
                        data = {movie.data}
                        token = {this.props.token}
                        editMovieHandler = {() => this.editMovieHandler(movie.id)}
                        />
            )));
        }
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <Modal show={this.props.editingMode} modalClosed={this.props.onMovieCancel}>
                    {editingForm}
                </Modal>
                {movies}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMovies: (token) => dispatch(action.fetchMovies(token)),
        onMovieCancel: () => dispatch(action.cancelMovie()),
        changeMovieInit: () => dispatch(action.changeMovieInit())
    };
};

const mapStateToProps = state => {
    return {
        movies: state.movies.movies,
        loading: state.movies.loading,
        editingMode: state.movies.editingMode,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Movies, axios));