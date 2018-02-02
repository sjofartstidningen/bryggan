import React from 'react';
import { mount } from 'enzyme';
import IsHovering from '../';

function setup() {
  const renderSpy = jest.fn(({ isHovering }) => (
    <div className="inner" style={{ color: isHovering ? 'red' : 'black' }} />
  ));

  const Component = props => (
    <IsHovering className="outer" {...props} render={renderSpy} />
  );

  return { Component, renderSpy };
}

describe('Component.IsHovering', () => {
  test('should react to onMouseEnter/Leave events', () => {
    const { Component, renderSpy } = setup();
    const wrapper = mount(<Component />);

    expect(renderSpy).toHaveBeenCalledTimes(1);

    const outer = wrapper.find('.outer').first();
    outer.simulate('mouseenter', { mouseenter: true });
    expect(renderSpy).toHaveBeenCalledTimes(2);

    outer.simulate('mouseleave', { mouseleave: true });
    expect(renderSpy).toHaveBeenCalledTimes(3);
  });

  test('should update render prop when mouse hovers', () => {
    const { Component } = setup();
    const wrapper = mount(<Component />);
    const outer = wrapper.find('.outer').first();

    expect(wrapper).toMatchSnapshot();
    outer.simulate('mouseenter', { mouseenter: true });
    expect(wrapper).toMatchSnapshot();
  });
});
