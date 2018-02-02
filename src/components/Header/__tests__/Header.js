import React from 'react';
import { shallow, mount } from 'enzyme';
import { WithContexts } from '../../../test-utils';
import Header from '../';

describe('Component.Header', () => {
  test('should render without user', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render child component if user is defined', () => {
    const user = { email: 'adam@fransvilhelm.com' };
    const wrapper = shallow(<Header user={user} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('should call onSignOut-prop when clicking sign out button', () => {
    const user = { email: 'adam@fransvilhelm.com' };
    const handleSignOut = jest.fn();
    const wrapper = mount(
      <WithContexts>
        <Header user={user} onSignOut={handleSignOut} />
      </WithContexts>,
    );

    const button = wrapper.find('button');
    button.simulate('click', { clicked: true });

    expect(handleSignOut).toHaveBeenCalled();
  });
});
