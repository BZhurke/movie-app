import React from 'react';

import classes from './Movie.css';
import Button from '../UI/Button/Button';

const movie = (props) => {
    const data = [];
    for(let dataName in props.data){
        data.push({
            name: dataName,
            value: props.data[dataName]});
    }

    const dataOutput = data.map(d => {
        return <span 
            style={{textTransform: 'capitalize', display: 'block', margin: '0 8px', borderBottom: '1px solid #ccc', padding: '5px'}}
            key={d.name}>{d.name}: {d.value}</span>
    })
    
    return (
    <div className={classes.Movie}>
        <p>{dataOutput}</p>
        {props.token ? <Button btnType="Danger">Edit</Button> : null}
    </div>);
};

export default movie;