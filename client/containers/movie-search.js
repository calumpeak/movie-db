'use strict';

import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { extend, isEmpty, pick, keys, forOwn } from 'lodash';
import 'whatwg-fetch';

// TODO These should not be hardcoded and sit in a config
const endpoint = 'https://api.themoviedb.org/3';
const apiKey = 'b3a6cd74cc7dbda8893f381cddb579f1';

/**
 * Movie configuration object
 * See: https://developers.themoviedb.org/3/configuration
 */
let movieConfig = {};
const movieFieldMap = {
    title: 'title',
    id: 'id',
    overview: 'overview',
    'release_date': 'release',
    'poster_path': 'posterImg'
};

/**
 * HOC container responsible for fetching and handling queries to the movie db api
 * Injects additional props to the component passed to it
 * 
 * @function MovieSearchContainer
 * @param {Component} WrappedComponent
 * @injects {Array} Movies Array of movie objects returned by api
 * @injects {Boolean} fetching bool true if api currently fetching
 * @injects {function} findMovies takes a query and triggers api request
 * @injects {Integer} page current page of search we are on
 * @injects {Integer} pages max pages there are in search
 * @returns {Component} Container
 */
const MovieSearchContainer = (WrappedComponent) => {

    /**
     * @class Container
     */
    return class Container extends Component {
        constructor (props) {
            super(props);

            this.state = {
                page: 0,
                pages: 0,
                movies: [],
                fetching: false
            };

            this.findMovies = this.findMovies.bind(this);
        }

        /**
         * Fetch configuration object at mount
         */
        componentDidMount () {
            // If we've already fetched the configuration object
            // this session then early return
            if (!isEmpty(movieConfig)) {
                return;
            }

            fetch(`${endpoint}/configuration?api_key=${apiKey}`)
                .then(response => response.json())
                .then(body => movieConfig = body)
                .catch(err => console.log('something went wrong')); // TODO
        }

        /**
         * Sets the current fetch state
         * 
         * @for Container
         * @method setFetchState
         * @param {Boolean} fetching
         */
        setFetchState (fetching) {
            this.setState({ fetching });
        }

        /**
         * Sets the current move state
         * 
         * @for Container
         * @method setMovieState
         * @param {Object} body
         */
        setMovieState ({results = [], page = 0, total_pages: pages = 0}) {
            const { movies } = this.state;
            const processedMovies = this.processMovies(results);

            this.setState({ 
                movies: page > 1 ? [...movies, ...processedMovies] : processedMovies,
                page,
                pages
            });
        }

        /**
         *  Processes the movie object to have more sane object property names
         *  And appends any configuration items necessary
         * 
         * @for Container
         * @method processMovies
         * @param {Array} movies
         */
        processMovies (movies) {
            // Grab only necessary fields and rename them to something easier to use
            // Also append config to images though this should be handled better in future
            movies = movies.map(movie => {
                const { images } = movieConfig;
                const obj = {};

                forOwn(movieFieldMap, (val, key) => obj[val] = movie[key]);

                obj.posterImg = `${images.base_url}w500${obj.posterImg}`;
                
                return obj;
            });


            return movies;
        }

        /**
         * Searches API with passed query and page number
         * 
         * @for Container
         * @method findMovies
         * 
         * @param {String} query
         * @param {Integer | String} page
         */
        findMovies (query, page = 1) {
            query = encodeURIComponent(query);
            this.setFetchState(true);
            
            if (!query) {
                return;
            }

            fetch(`${endpoint}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`)
                .then(response => response.json())
                .then((body) => {
                    this.setFetchState(false);
                    this.setMovieState(body);
                })
                .catch((err) => {
                    this.setFetchState(false);
                    // No movies found/something went wrong
                    // Set empty array on this search
                    this.setMovieState({});
                });
        }

        render () {
            return (<WrappedComponent {...extend(this.state, this.props, { findMovies: this.findMovies })} />);
        }
    }
}

export default MovieSearchContainer;