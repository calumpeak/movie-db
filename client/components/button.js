'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Button component
 * 
 * @function Button
 */
const Button = ({ label, onClick, disabled }) => (
    <RaisedButton
        label = {label}
        onTouchTap = {onClick}
        primary = {true}
        disabled = {disabled}
    />
);


Button.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

export default Button;