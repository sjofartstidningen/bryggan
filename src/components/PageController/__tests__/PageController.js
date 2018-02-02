import React from 'react';
import { shallow } from 'enzyme';
import PageController from '../';
import { Button } from '../components';

const dispatchKeyboardEvent = keyCode => {
  const event = new KeyboardEvent('keydown', { keyCode });
  document.dispatchEvent(event);
};

describe('Component.PageController', () => {
  test('should react to keyboard events', () => {
    const keydownSpy = jest.fn();
    const props = {
      currentPage: '1',
      totalPages: 2,
      onNextPage: keydownSpy,
      onPrevPage: keydownSpy,
      onZoomDecrease: keydownSpy,
      onZoomIncrease: keydownSpy,
      onZoomReset: keydownSpy,
    };

    shallow(<PageController {...props} />);

    const keyCodes = [37, 39, 48, 187, 189];
    keyCodes.forEach(dispatchKeyboardEvent);

    expect(keydownSpy).toHaveBeenCalledTimes(keyCodes.length);
  });

  test('should react to click events', () => {
    const clickSpy = jest.fn();
    const props = {
      currentPage: '1',
      totalPages: 2,
      onNextPage: clickSpy,
      onPrevPage: clickSpy,
      onZoomDecrease: clickSpy,
      onZoomIncrease: clickSpy,
      onZoomReset: clickSpy,
    };

    const wrapper = shallow(<PageController {...props} />);
    const buttons = wrapper.find(Button);

    expect(buttons.length).toBe(4);

    buttons.forEach(btn => btn.simulate('click'));
    expect(clickSpy).toHaveBeenCalledTimes(buttons.length);
  });
});
