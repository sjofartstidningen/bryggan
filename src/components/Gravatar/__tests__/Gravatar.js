import React from 'react';
import { shallow } from 'enzyme';
import md5 from 'md5';
import Gravatar from '../';

describe('Component.Gravatar', () => {
  test('Should hash email and request image from Gravatar', () => {
    const email = 'adam@fransvilhelm.com';
    const wrapper = shallow(<Gravatar email={email} alt="" />);
    expect(wrapper).toMatchSnapshot();

    let img = wrapper.find('img');
    let expectedSrc = `https://www.gravatar.com/avatar/${md5(email)}`;

    expect(img.props().src).toEqual(expectedSrc);

    const newEmail = 'random@email.com';
    wrapper.setProps({ email: newEmail });
    wrapper.update();

    img = wrapper.find('img');
    expectedSrc = `https://www.gravatar.com/avatar/${md5(newEmail)}`;

    expect(img.props().src).toEqual(expectedSrc);
  });

  test('should accept alt and className', () => {
    const wrapper = shallow(
      <Gravatar email="random@email.com" alt="Profile picture" className="profile-image" />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should call onLoad-prop when image is loaded', () => {
    const email = 'adam@fransvilhelm.com';
    const handleLoad = jest.fn();
    const wrapper = shallow(
      <Gravatar
        email={email}
        alt=""
        className="profile-image"
        onLoad={handleLoad}
      />,
    );

    const img = wrapper.find('.profile-image');
    img.simulate('load', { loaded: true });

    expect(handleLoad).toHaveBeenCalled();
  });

  test('should call onError-prop when loading image fails', () => {
    const email = 'adam@fransvilhelm.com';
    const handleError = jest.fn();
    const wrapper = shallow(
      <Gravatar
        email={email}
        alt=""
        className="profile-image"
        onError={handleError}
      />,
    );

    const img = wrapper.find('.profile-image');
    img.simulate('error', { error: true });

    expect(handleError).toHaveBeenCalled();
  });
});
