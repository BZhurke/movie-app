import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import MovieEditForm from '../../components/Movie/MovieEditForm/MovieEditForm';
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
                value: this.props.selectedMovie.data.Title
            },
            Year: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Year',
                    label: 'Year',
                    readOnly: 'readOnly'
                }
            },
            Released: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Released',
                    label: 'Released',
                    readOnly: 'readOnly'
                }
            },
            Runtime: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Runtime',
                    label: 'Runtime',
                    readOnly: 'readOnly'
                }
            },
            Actors: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Actors',
                    label: 'Actors',
                    readOnly: 'readOnly'
                }
            },
            Plot: {
                elementType: 'textarea',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Plot',
                    label: 'Plot',
                    readOnly: 'readOnly'
                }
            }
        }
    }

    editingModeCloseHandler = () => {
        this.props.onMovieCancel();
    }

    movieEditHandler = (event) => {
        event.preventDefault()
        this.props.changeMovieInit();
        editForm = <MovieEditForm editingFilm={ this.props.selectedMovie }/>
    }

    movieCancelHandler = (event) => {
        event.preventDefault();
        this.props.onMovieCancel();
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.movieDetails) {
            formElementsArray.push({
                id: key,
                config: this.state.movieDetails[key]
            });
        }
        let form = (
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
        );
        if(this.props.loading){
            form = <Spinner/>;
        }
        return (
            <div className={ classes.MovieEdit }>
                <Modal  show = { this.props.editingMode }
                    modalClosed = { this.props.onMovieCancel }>
                    { editForm }
                </Modal>
                <h4>Movie Details</h4>
                { form }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.movies.loading,
        token: state.auth.token,
        selectedMovie: state.editMovie.editableMovie,
        editingMode: state.editMovie.editingMode
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMovieChange: (movie, token) => dispatch(actions.changeMovie(movie, token)),
        onMovieCancel: () => dispatch(actions.cancelMovie()),
        changeMovieInit: () => dispatch(actions.changeMovieInit())

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MovieDetails, axios));