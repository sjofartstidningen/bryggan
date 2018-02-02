/* eslint-disable no-underscore-dangle */
import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import LazyImage from '../';
import { setupIntersectionObserver, sleep } from '../../../test-utils';

jest.mock('axios');

describe('Component.LazyImage', () => {
  let reset;
  beforeAll(() => {
    reset = setupIntersectionObserver();

    window.URL.createObjectURL = () => 'src-string';

    axios.__setReturn({
      data: new Blob([JSON.stringify({ hello: 'world' }, null, 2)], {
        type: 'application/json',
      }),
    });
  });

  afterAll(() => {
    reset();
  });

  test('should download image once el is in view', async () => {
    const renderSpy = jest.fn(
      ({ src, loaded }) =>
        loaded ? <img className="inner" src={src} alt="" /> : null,
    );

    const wrapper = mount(
      <LazyImage src="path/to/image.jpg" render={renderSpy} />,
    );

    expect(renderSpy.mock.calls).toMatchSnapshot();

    const { observer } = wrapper.instance();
    observer.simulateIntersectionEvent({ isIntersecting: true });

    await sleep(0);
    expect(wrapper.state('src')).toBe('src-string');
    expect(renderSpy.mock.calls).toMatchSnapshot();
  });

  test('should reload image when calling reload from render-prop', async () => {
    const renderSpy = jest.fn(
      ({ loaded, reload }) =>
        loaded ? <button className="button" onClick={reload} /> : null,
    );

    const wrapper = mount(
      <LazyImage src="path/to/image.jpg" render={renderSpy} />,
    );

    const { observer } = wrapper.instance();
    observer.simulateIntersectionEvent({ isIntersecting: true });
    await sleep(0);
    wrapper.update();

    window.URL.createObjectURL = () => 'src-string-2';
    const button = wrapper.find('.button');
    button.simulate('click');

    await sleep(0);
    expect(wrapper.state('src')).toBe('src-string-2');
  });
});
