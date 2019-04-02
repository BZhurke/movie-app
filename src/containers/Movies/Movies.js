import React, { Component } from 'react';
import { connect } from 'react-redux';

import Movie from '../../components/Movie/Movie';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-movie';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';


class Movies extends Component {
    state = {
        controls: {
            movieName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Search Movie'
                },
                value: ''
            }
        }
    }

    

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
        this.props.history.push('/film/'+id);
        this.props.selectedMovie(movieData[0]);
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSearchMovie(this.state.controls.movieName.value);
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let searchForm = formElementsArray.map(formElement => (
            <Input  key = { formElement.id }
                        elementType = { formElement.config.elementType }
                        elementConfig = { formElement.config.elementConfig }
                        value = { formElement.config.value } 
                        changed = { (event) => this.inputChangeHandler(event, formElement.id)}
                />
        ));

        let movies = <Spinner/>;
        if(!this.props.loading){
            movies = this.props.error ? <h4>{this.props.error}</h4> : (
                this.props.movies.map(movie => (
                    <Movie 
                        key = { movie.id }
                        data = { movie.data }
                        clicked = {() => this.editMovieHandler(movie.id)}
                        />
            )));
        }
        return (
            <React.Fragment>
                <form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center' }} onSubmit = {this.submitHandler}>
                    { searchForm }
                    <Button btnType="Success">SEARCH</Button>
                </form>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    { movies }
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMovies: (token) => dispatch(action.fetchMovies(token)),
        onMovieCancel: () => dispatch(action.cancelMovie()),
        onSearchMovie: (movieName) => dispatch(action.searchMovie(movieName)),
        selectedMovie: (movieData) => dispatch(action.selectedMovie(movieData))
    };
};

const mapStateToProps = state => {
    return {
        movies: state.movies.movies,
        loading: state.movies.loading,
        token: state.auth.token,
        error: state.movies.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Movies, axios));