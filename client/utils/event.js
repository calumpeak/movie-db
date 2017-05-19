'use strict';

/**
 * Binds an element to an event to trigger a callback
 * Returns an unbind function to call
 * 
 * @function bind
 * @param {Element} element
 * @param {String} event
 * @param {Function} callback
 * @return {Function} unbind
 */
export const bind = (element, event, callback) => {
    element.addEventListener(event, callback, false);

    return () => element.removeEventListener(event, callback, false);
};