import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import MovieDetailsForm from '../../components/Movie/MovieDetailsForm/MovieDetailsForm';
import classes from '../../components/Movie/MovieDetailsForm/MovieDetailsForm.css'
import Movie from '../../components/Movie/Movie';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-movie';
import * as action from '../../store/actions/index';

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        // eslint-disable-next-line
        let editForm = null;
    }

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
        moviePoster: {
            posterUrl: ''
        }
    }

    editingModeCloseHandler = () => {
        this.props.onMovieCancel();
    }

    movieEditHandler = (event) => {
        const movieData = this.props.selectedMovie; 
        event.preventDefault()
        this.props.history.push(window.location.pathname  + '/edit');
        this.props.changeMovieInit();
        this.editForm = <MovieDetailsForm editingFilm = { movieData }/>
    }

    movieCancelHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack()
        this.props.onMovieCancel();
    }

    editMovieHandler = (id) => {
        let movieData = this.props.movies.filter(obj => {
            return obj.id === id;
        });
        if(!movieData[0].data.Plot){
            this.props.fetchSelectedMovie(id);
            this.props.updateMovieList(this.props.selectedMovie);
        }
        if(this.props.match.params.id !== id){
            this.props.history.push('/film/'+id);
            this.props.selectedMovieHandler(movieData[0]);
        }
    }

    updateState = (newValues) => {
        const updatedDetails = {...this.state.movieDetails};
        const updatedPoster = {...this.state.moviePoster};
        for(let key in updatedDetails){
            if(updatedDetails[key].value !== newValues.selectedMovie.data[key]){
                updatedDetails[key].value = newValues.selectedMovie.data[key]
            }
            this.setState({movieDetails: updatedDetails });
        }
        updatedPoster.posterUrl = newValues.selectedMovie.data.Poster;
        this.setState({moviePoster: updatedPoster});
    }


    componentDidMount() {
        if(!this.props.selectedMovie && this.props.movies.length === 0 ) {
            let pathNameMas = window.location.pathname.split('/');
            let id = pathNameMas.filter((el) => el.includes('tt') )
            this.props.fetchSelectedMovie(id);
            this.props.onFetchMovies();
        }
        else if(!this.props.selectedMovie.Plot && this.props.movies.length !== 0){
            let pathNameMas = window.location.pathname.split('/');
            let id = pathNameMas.filter((el) => el.includes('tt') )
            this.props.fetchSelectedMovie(id);
        } 
        else if(this.props.selectedMovie && this.props.movies.length !== 0) {
            this.updateState(this.props);
        }
    }

    componentWillReceiveProps (nextProps){
        if(nextProps.selectedMovie && nextProps.movies.length !== 0) {
            this.updateState(nextProps);
        }
        if(nextProps.movies.length !== 0 && nextProps.selectedMovie && nextProps.selectedMovie.id !== nextProps.match.params.id) {
            let movieData = [];
            movieData = nextProps.movies.filter(obj => {
                return obj.id === nextProps.match.params.id;
            });
            if(movieData.length !==0) {
                nextProps.selectedMovieHandler(movieData[0]);
            } 
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
        let form = <Spinner/>;
        if (!this.props.loadingSelectedMovie && this.props.movies.length !== 0) {
            form = (
                <div>
                    <div>
                        <img key ={ this.state.moviePoster.posterUrl } src = { this.state.moviePoster.posterUrl } alt = { this.state.moviePoster.posterUrl } />
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
        
        let movie = <Spinner/>;
        if(this.props.movies.length !== 0 && !this.props.loadingSelectedMovie) {
            movie = this.props.movies.filter(m => {return m.id !== this.props.selectedMovie.id}).splice(-3).map(movie => (
                    <Movie 
                        key = { movie.id }
                        data = { movie.data }
                        clicked = {() => this.editMovieHandler(movie.id)}
                        />
            ));
        }

        return (
            <>
                <div className={ classes.MovieEdit }>
                    <Modal  show = { this.props.editingMode }
                        modalClosed = { this.movieCancelHandler }>
                        { this.editForm }
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
        loadingSelectedMovie: state.editMovie.loading,
        selectedMovie: state.editMovie.editableMovie,
        editingMode: state.editMovie.editingMode,
        movies: state.movies.movies,
        loadingMovies: state.movies.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSelectedMovie: (movieId) => dispatch(action.fetchSelectedMovie(movieId)),
        onFetchMovies: () => dispatch(action.fetchMovies()),
        selectedMovieHandler: (movieData) => dispatch(action.selectedMovie(movieData)),
        onMovieCancel: () => dispatch(action.cancelMovie()),
        changeMovieInit: () => dispatch(action.changeMovieInit()),
        updateMovieList: (movie) => dispatch(action.updateMovieList(movie)) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MovieDetails, axios));