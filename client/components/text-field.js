'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const TextFieldComponent = ({value, onChange, hint}) => (
    <TextField
        hintText = {hint}
        value = {value}
        onChange = {onChange}
    />
);

TextFieldComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TextFieldComponent;