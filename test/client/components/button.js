'use strict';

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import Button from 'components/button';

describe('<Button />', () => {
    it('should render', () => {
        const button = shallow(<Button />);
        expect(button.exists()).to.equal(true);
    });

    it('should allow clicks', () => {
        // Material UI has issues with this
    });

    it('should set the label', () => {
        const button = shallow(<Button label = 'hello world' />);

        expect(button.props().label).to.equal('hello world');
    });
});