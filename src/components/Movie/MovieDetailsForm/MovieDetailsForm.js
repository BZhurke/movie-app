import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './MovieDetailsForm.css'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-movie';
import * as actions from '../../../store/actions/index';

class MovieEditForm extends Component {
    state = {
        movieForm: {
            Poster: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Poster Link',
                    label: 'Poster Link'
                },
                value: this.props.editingFilm.data.Poster,
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            Title: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Title',
                    label: 'Title'
                },
                value: this.props.editingFilm.data.Title,
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            Year: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Year',
                    label: 'Year'
                },
                value: this.props.editingFilm.data.Year,
                validation: {
                    required: true,
                    minLength: 4,
                    isNumeric: true
                },
                valid: true,
                touched: false
            },
            Released: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Released',
                    label: 'Released'
                },
                value: this.props.editingFilm.data.Released,
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            Runtime: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Runtime',
                    label: 'Runtime'
                },
                value: this.props.editingFilm.data.Runtime,
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            Actors: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Actors',
                    label: 'Actors'
                },
                value: this.props.editingFilm.data.Actors,
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            Plot: {
                elementType: 'input',
                elementConfig: {
                    text: 'text',
                    placeholder: 'Plot',
                    label: 'Plot'
                },
                value: this.props.editingFilm.data.Plot,
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    }

    movieSubmitHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack();
        const formData = {};
        for(let formElementId in this.state.movieForm) {
            formData[formElementId] = this.state.movieForm[formElementId].value;
        }
        const movie = {
            [this.props.editingFilm.id]: {data: formData}
        }
        this.props.onMovieChange(movie, this.props.token);
    }

    movieCancelHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack();
        this.props.onMovieCancel();
    }


    inputChangedHandler = (event, inputId) =>{
        const updatedMovieForm = {
            ...this.state.movieForm
        };
        const updatedFormElement = {
            ...updatedMovieForm[inputId]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedMovieForm[inputId] = updatedFormElement;

        let formIsValid = true;
        for(let inputId in updatedMovieForm) {
            formIsValid = updatedMovieForm[inputId].valid && formIsValid;
        }
        this.setState({movieForm: updatedMovieForm, formIsValid: formIsValid});
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    componentWillReceiveProps(nextProps) {
        const updatedForm = {...this.state.movieForm}
        for(let key in updatedForm){
            if(updatedForm[key].value !== nextProps.editingFilm.data[key]){
                updatedForm[key].value = nextProps.editingFilm.data[key]
            }
            this.setState({movieForm: updatedForm});
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.movieForm) {
            formElementsArray.push({
                id: key,
                config: this.state.movieForm[key]
            });
        }
        let form = (
            <form >
                {formElementsArray.map(formElement => (
                    <Input
                        key = { formElement.id }
                        label = { formElement.config.elementConfig.label } 
                        elementType = { formElement.config.elementType }
                        elementConfig = { formElement.config.elementConfig }
                        value = { formElement.config.value }
                        invalid = { !formElement.config.valid }
                        shouldValidate = { formElement.config.validation }
                        touched = { formElement.config.touched }
                        changed = { (event) => this.inputChangedHandler(event, formElement.id) }
                        />
                ))}
                <Button btnType = "Danger" clicked = { this.movieCancelHandler }>CANCEL</Button>
                <Button btnType = "Success" disabled = { !this.state.formIsValid } clicked = { this.movieSubmitHandler }>SUBMIT CHANGES</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner/>;
        }
        return (
            <div className={ classes.MovieEdit }>
                <h4>Edit movie details</h4>
                { form }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.movies.loading,
        token: state.auth.token,
        editingFilm: state.editMovie.editableMovie
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMovieChange: (movie, token) => dispatch(actions.changeMovie(movie, token)),
        onMovieCancel: () => dispatch(actions.cancelMovie())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(MovieEditForm, axios)));