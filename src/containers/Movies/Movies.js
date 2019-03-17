import React, { Component } from 'react';
import { connect } from 'react-redux';

import Movie from '../../components/Movie/Movie';
import axios from '../../axios-movie';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Movies extends Component {
    componentDidMount(){
        this.props.onFetchMovies(this.props.token);
    }

    render() {
        let movies = <Spinner/>;
        if(!this.props.loading){
            movies = (
                this.props.movies.map(movie => (
                    <Movie 
                        key = { movie.id }
                        data = { movie.data }
                        token = { this.props.token }
                        />
            )));
        }
        return (
            <div>
                {movies}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMovies: (token) => dispatch(action.fetchMovies(token))
    };
};

const mapStateToProps = state => {
    return {
        movies: state.movies.movies,
        loading: state.movies.loading,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Movies, axios));