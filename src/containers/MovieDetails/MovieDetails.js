import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import MovieEditForm from '../../components/Movie/MovieEditForm/MovieEditForm';
import Movie from '../../components/Movie/Movie';
import classes from '../../components/Movie/MovieEditForm/MovieEditForm.css'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-movie';
import * as actions from '../../store/actions/index';

let editForm = null;

class MovieDetails extends Component {
    state = {
        movieDetails: {
            Title: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Title',
                    label: 'Title',
                    readOnly: 'readOnly'
                },
                value: '' 
            },
            Year: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Year',
                    label: 'Year',
                    readOnly: 'readOnly'
                },
                value: '' 
            },
            Released: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Released',
                    label: 'Released',
                    readOnly: 'readOnly'
                },
                value: '' 
            },
            Runtime: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Runtime',
                    label: 'Runtime',
                    readOnly: 'readOnly'
                },
                value: '' 
            },
            Actors: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Actors',
                    label: 'Actors',
                    readOnly: 'readOnly'
                },
                value: '' 

            },
            Plot: {
                elementType: 'textarea',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Plot',
                    label: 'Plot',
                    readOnly: 'readOnly'
                },
                value: '' 
            }
        },
        movieId: null
    }

    editingModeCloseHandler = () => {
        this.props.onMovieCancel();
    }

    movieEditHandler = (event) => {
        const movieData = this.props.selectedMovie; 
        event.preventDefault()
        this.props.history.push(window.location.pathname  + '/edit');
        this.props.changeMovieInit();
        editForm = <MovieEditForm editingFilm = { movieData }/>
    }

    movieCancelHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack()
    }

    editMovieHandler = (id) => {
        let movieData = this.props.movies.filter(obj => {
            return obj.id === id;
        })
        this.props.history.push('/film/'+id);
        this.props.selectedMovieHandler(movieData[0]);
    }


    componentDidMount() {
        if(this.props.selectedMovie){
            const updatedDetails = {...this.state.movieDetails};
            for(let key in updatedDetails){
                if(updatedDetails[key].value !== this.props.selectedMovie.data[key]){
                    updatedDetails[key].value = this.props.selectedMovie.data[key]
                }
                this.setState({movieDetails: updatedDetails});
            }
        }
    }

    componentWillReceiveProps (nextProps){
        const updatedDetails = {...this.state.movieDetails};
        for(let key in updatedDetails){
            if(updatedDetails[key].value !== nextProps.selectedMovie.data[key]){
                updatedDetails[key].value = nextProps.selectedMovie.data[key]
            }
            this.setState({movieDetails: updatedDetails});
        }
        if(nextProps.history.action ==='POP'){
            let movieData = nextProps.movies.filter(obj => {
                return obj.id === nextProps.match.params.id;
            })
            nextProps.selectedMovieHandler(movieData[0]);
        }
    }

 
    render() {
        const formElementsArray = [];
        for (let key in this.state.movieDetails) {
            formElementsArray.push({
                id: key,
                config: this.state.movieDetails[key]
            });
        }
        let form = (this.props.movies.length === 0 ? <Redirect to='/'/> : null);
        if (this.props.movies.length !== 0) {
            form = (
                <div>
                    <div>
                        <img key ={ this.props.selectedMovie.data.Poster } src = { this.props.selectedMovie.data.Poster } alt = { this.props.selectedMovie.data.Poster } />
                    </div>
                    <form>
                        {formElementsArray.map(formElement => (
                            <Input
                                key = { formElement.id }
                                label = { formElement.config.elementConfig.label } 
                                elementType = { formElement.config.elementType }
                                elementConfig = { formElement.config.elementConfig }
                                value = { formElement.config.value }
                                />
                        ))}
                        <Button btnType = "Success" disabled = { !this.props.token } clicked = { (event) => this.movieEditHandler(event) }>EDIT DETAILS</Button>
                    </form>
                </div>
            );
        }
        
        const movies = this.props.movies.filter(m => {return m.id !== this.props.selectedMovie.id});
        let movie = ( this.props.movies.length === 0 ? null :
            movies.splice(-3).map(movie => (
                <Movie 
                    key = { movie.id }
                    data = { movie.data }
                    clicked = {() => this.editMovieHandler(movie.id)}
                    />
        )));

        
        return (
            <>
                <div className={ classes.MovieEdit }>
                    <Modal  show = { this.props.editingMode }
                        modalClosed = { this.movieCancelHandler }>
                        { editForm }
                    </Modal>
                    <h4>Movie Details</h4>
                    { form }
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    { movie }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.editMovie.loading,
        selectedMovie: state.editMovie.editableMovie,
        editingMode: state.editMovie.editingMode,
        movies: state.movies.movies
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMovieCancel: () => dispatch(actions.cancelMovie()),
        changeMovieInit: () => dispatch(actions.changeMovieInit()),
        selectedMovieHandler: (movieData) => dispatch(actions.selectedMovie(movieData)),
        onFetchMovies: () => dispatch(actions.fetchMovies()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MovieDetails, axios));