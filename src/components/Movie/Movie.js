import React from 'react';

import classes from './Movie.css';

const movie = (props) => {
    const data = [];
    const sortOrder = ['Poster', 'Title', 'Year', 'Released', 'Runtime', 'Actors', 'Type', 'imdbID','Plot'];
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
                d.name === 'Poster' ? <img key = { d.name } src = { d.value } alt = { d.name } /> :
                d.name === 'Title' ?  <span key = { d.name }>{ d.name }: { d.value }</span> :
                d.name === 'Plot' ?  <span key = { d.name }>{ d.name }: { d.value }</span> : null
        );
    });

    
    return (
    <div className = { classes.Movie } onClick = {props.clicked}>
        { dataOutput }
    </div>);
};

export default movie;