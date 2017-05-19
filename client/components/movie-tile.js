'use strict';

import React from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

const cardStyle = {
    width: '300px',
    height: '450px'
};

const cardTitleStyle = {
    maxHeight: '450px',
}

/**
 * Movie tile component
 * TODO: Image error handling
 * 
 * @function MovieTile
 * @return {Component}
 */
const MovieTile = ({title, release, posterImg, overview}) => (
    <Card style = {cardStyle}>
        <CardMedia
            overlay = {
                <CardTitle
                    style = {cardTitleStyle}
                    title = {title}
                    subtitle = {overview}
                />
            }
        >
            <img 
                src = {posterImg} 
                style = {cardStyle}
            />
        </CardMedia>
    </Card>
);

export default MovieTile;