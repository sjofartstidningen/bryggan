import React from 'react';
import { mount } from 'enzyme';
import Icon from '../';

describe('Component.Icon', () => {
  test('should render an icon', () => {
    const wrapper = mount(<Icon>hello</Icon>);
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ baseline: true });
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });
});
