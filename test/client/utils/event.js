
import { expect } from 'chai';
import { spy } from 'sinon';
import { bind } from 'utils/event';

describe('Event', () => {
    describe('bind', () => {
        it('should bind an element to an event', () => {
            const callback = spy();
            const clickEvent = document.createEvent('MouseEvents');
            const element = document.createElement('div');

            clickEvent.initEvent('click', true, true);

            bind(element, 'click', callback);
            element.dispatchEvent(clickEvent);
            expect(callback.calledOnce).to.equal(true);
        });

        it('should unbind an event to not be called', () => {
            const callback = spy();
            const clickEvent = document.createEvent('MouseEvents');
            const element = document.createElement('div');

            clickEvent.initEvent('click', true, true);

            const binder = bind(element, 'click', callback);
            element.dispatchEvent(clickEvent);
            expect(callback.calledOnce).to.equal(true);

            binder ();
            element.dispatchEvent(clickEvent);
            expect(callback.calledOnce).to.equal(true);
        });
    });
});