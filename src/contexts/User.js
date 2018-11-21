import React, { createContext, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  awaitInitialAuthCheckEvent,
  getAppData,
  signIn,
  signOut,
  updateUserData,
  sendValidationEmail,
} from '../utils/firebase';

const { Provider, Consumer } = createContext();

class UserProvider extends PureComponent<Props, State> {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  unsubscribeListener;

  state = {
    context: {
      state: 'loading',
      user: null,
      data: {},
      signIn: values => this.handleSignIn(values),
      signOut: () => this.handleSignOut(),
      updateUser: newUser => this.updateUser(newUser),
    },
  };

  setContext(contextUpdater) {
    this.setState(({ context }) => ({
      context: { ...context, ...contextUpdater(context) },
    }));
  }

  componentDidMount() {
    this.awaitInitialCheck();
  }

  componentWillUnmount() {
    if (this.unsubscribeListener) this.unsubscribeListener();
  }

  awaitInitialCheck() {
    this.unsubscribeListener = awaitInitialAuthCheckEvent(user => {
      this.authenticate(user);
    });
  }

  async authenticate(user) {
    if (user) {
      const data = await getAppData();
      this.setContext(() => ({ state: 'authenticated', data, user }));
      if (!user.emailVerified) await sendValidationEmail();
    } else {
      this.setContext(() => ({
        state: 'unauthenticated',
        user: null,
        data: {},
      }));
    }

    if (this.unsubscribeListener) this.unsubscribeListener();
  }

  async handleSignIn(values) {
    const data = await signIn(values);
    await this.authenticate(data.user);
  }

  async handleSignOut() {
    await signOut();
    this.setContext(() => ({ state: 'unauthenticated', user: null, data: {} }));
  }

  async updateUser({ displayName }) {
    const { user } = this.state.context;
    if (user) {
      const newUser = await updateUserData({ displayName });
      if (newUser) this.setContext(() => ({ user: newUser }));
    }
  }

  render() {
    return (
      <Provider value={this.state.context}>{this.props.children}</Provider>
    );
  }
}

const UserConsumer = Consumer;

export { UserProvider, UserConsumer };
