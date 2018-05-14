// @flow
import React, { createContext, PureComponent } from 'react';
import type { ComponentType, Node } from 'react';
import {
  awaitInitialAuthCheckEvent,
  getAppData,
  signIn,
  signOut,
  updateUserData,
  sendValidationEmail,
} from '../utils/firebase';
import type {
  User,
  UserProfile,
  AppData,
  SignInCredentials,
} from '../types/firebase';

const { Provider, Consumer } = createContext();

type Props = {
  children: Node,
};

type Context = {
  state: 'loading' | 'unauthenticated' | 'authenticated',
  user: ?User,
  data: $Shape<AppData>,
  signIn: SignInCredentials => Promise<void>,
  signOut: () => Promise<void>,
  updateUser: UserProfile => Promise<void>,
};

type State = {
  context: Context,
};

class UserProvider extends PureComponent<Props, State> {
  unsubscribeListener: ?() => void;

  state = {
    context: {
      state: 'loading',
      user: null,
      data: {},
      signIn: (values: SignInCredentials) => this.handleSignIn(values),
      signOut: () => this.handleSignOut(),
      updateUser: (newUser: UserProfile) => this.updateUser(newUser),
    },
  };

  setContext(contextUpdater: Context => $Shape<Context>) {
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

  async authenticate(user: ?User) {
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

  async handleSignIn(values: SignInCredentials) {
    const data = await signIn(values);
    await this.authenticate(data.user);
  }

  async handleSignOut() {
    await signOut();
    this.setContext(() => ({ state: 'unauthenticated', user: null, data: {} }));
  }

  async updateUser({ displayName }: UserProfile) {
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

type UserConsumerProps = { children: (value: Context) => Node };
// $FlowFixMe
const UserConsumer: ComponentType<UserConsumerProps> = Consumer;

export { UserProvider, UserConsumer };
export type { Context as UserContext };
