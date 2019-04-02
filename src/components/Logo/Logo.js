import React from 'react';


import movieLogo from '../../assets/images/movie-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className = { classes.Logo } style = {{ height: props.height }}>
        <img src = { movieLogo } alt = "MyMovies"/>
    </div>
);

export default logo;