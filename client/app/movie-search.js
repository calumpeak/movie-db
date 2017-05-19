'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieSearchContainer from 'containers/movie-search';
import TextField from 'components/text-field';
import Button from 'components/button';
import MovieTile from 'components/movie-tile';
import InfiniteScroll from 'components/infinite-scroll';
import CircularProgress from 'material-ui/CircularProgress';

const containerStyle = {
    padding: '10px',
};

const movieContainerStyle = {
    display: 'inline-block',
    margin: '10px'
};

const progressStyle = {
    position: 'absolute',
    margin: 'auto',
    zIndex: 100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
};

/**
 * Movie Search Component
 * Responsible for rendering out search and movie tile components
 * Based on passed props
 * 
 * @class MovieSearch
 */
class MovieSearch extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            query: ''
        };

        this.onTextFieldChange = this.onTextFieldChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onEndOfList = this.onEndOfList.bind(this);
    }

    /**
     * Updates the query state on text field change
     * 
     * @for MovieSearch
     * @method onTextFieldChange
     */
    onTextFieldChange (event) {
        this.setState({ query: event.target.value });
    }

    /**
     *  Triggered by infinite scroll strategy
     *  If we have pages remaining when the user reaches the 
     *  bottom of the page then we fetch the next batch of movies
     * 
     * @for MovieSearch
     * @method onEndOfList
     */
    onEndOfList () {
        const { page, pages, findMovies } = this.props;
        const { query } = this.state;

        if (page >= pages) {
            return;
        }

        findMovies(query, page + 1);
    }

    /**
     * Calls find movies with state query value
     * 
     * @for MovieSearch
     * @method onButtonClick
     */
    onButtonClick () {
        const { findMovies } = this.props;
        const { query } = this.state;

        findMovies(query);
    }

    render () {
        const { query } = this.state;
        const { movies, fetching } = this.props;
    
        return (
            <div style = {containerStyle}>
                <TextField 
                    value = {query} 
                    onChange = {this.onTextFieldChange} 
                    hint = 'Search Movies' 
                />
                <Button 
                    label = 'Movie Search' 
                    onClick = {this.onButtonClick}
                    disabled = {fetching}
                />
                <div>
                    {movies.map((movie) =>
                        <div key = {movie.id} style = {movieContainerStyle}>
                            <MovieTile {...movie} />
                        </div>
                    )}
                </div>
                {movies.length ? <InfiniteScroll callback  = {this.onEndOfList} /> : null}
                {fetching ? <CircularProgress size = {100} style = {progressStyle} /> : null}
            </div>
        );
    }
}

MovieSearch.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    findMovies: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired
};

export default MovieSearchContainer(MovieSearch);