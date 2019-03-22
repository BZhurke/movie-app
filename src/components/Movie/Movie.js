import React from 'react';

import classes from './Movie.css';
import Button from '../UI/Button/Button';

const movie = (props) => {
    const data = [];
    const sortOrder = ['Poster', 'Title', 'Year', 'Released', 'Runtime', 'Actors', 'Plot'];
    for(let dataName in props.data){
        data.push({
            name: dataName,
            value: props.data[dataName]});
    }

    data.sort((a, b) => {
        return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
    });

    const dataOutput = data.map(d => {
        return (
                d.name==='Poster'   ? <img key = { d.name } src = { d.value } alt = { d.name }/> 
                                    : <span key = { d.name }>{ d.name }: { d.value }</span>
        );
    });
    
    return (
    <div className = { classes.Movie }>
        { dataOutput }
        { props.token ? <Button btnType = "Success" clicked = { props.editMovieHandler }>Edit</Button> : null}
    </div>);
};

export default movie;