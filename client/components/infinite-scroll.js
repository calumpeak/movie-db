'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { bind } from 'utils/event'; 

const SCROLL_TIMEOUT = 100;

/**
 * Infinite scroll component
 * Renders a div and on scroll checks if that div is in the viewport or not
 * 
 * @class InfiniteScroll
 */
class InfiniteScroll extends Component {
    constructor (props) {
        super(props);

        this.infiniteScroll = this.infiniteScroll.bind(this);

        // We don't want to call on every scroll, so debounce it
        this.debounceInfScroll = debounce(this.infiniteScroll, SCROLL_TIMEOUT);
    }

    /**
     * Bind window scroll event on mount
     */
    componentDidMount () {
        this.scrollUnbind = bind(window, 'scroll', this.debounceInfScroll);
    }

    /**
     * Unbind window scroll event on unmount
     */
    componentWillUnmount () {
        this.scrollUnbind();
    }

    /**
     * Detects when the infinite scroll element is in the viewport
     * 
     * @for InfiniteScroll
     * @method isVisible
     * @return {Boolean}
     */
    isVisible () {
        const { infScroll } = this.refs;
        const infScrollPos = infScroll.getBoundingClientRect();

        return infScrollPos.bottom <= window.innerHeight;
    }

    /**
     * Called on debounce scroll
     * If the element is visible calls the prop callback
     * 
     * @for InfiniteScroll
     * @method infiniteScroll
     */
    infiniteScroll () {
        const { callback } = this.props;

        if (this.isVisible()) {
            callback();
        }
    }

    render () {
        return (
            <div ref = 'infScroll'></div>
        );
    }
}

InfiniteScroll.propTypes = {
    callback: PropTypes.func.isRequired
};


export default InfiniteScroll;