// @flow
// $FlowFixMe
import React, { createContext, PureComponent } from 'react';
import type { Node } from 'react';
import {
  awaitInitialAuthCheckEvent,
  getAppData,
  signIn,
  signOut,
} from '../utils/firebase';
import type { User, AppData, SignInCredentials } from '../types/firebase';

const { Provider, Consumer } = createContext();

type Props = {
  children: Node,
};

type Context = {
  state: 'loading' | 'unauthenticated' | 'authenticated',
  user: any,
  data: $Shape<AppData>,
  signIn: SignInCredentials => Promise<void>,
  signOut: () => Promise<void>,
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
    const user = await signIn(values);
    await this.authenticate(user);
  }

  async handleSignOut() {
    await signOut();
    this.setContext(() => ({ state: 'unauthenticated', user: null, data: {} }));
  }

  render() {
    return (
      <Provider value={this.state.context}>{this.props.children}</Provider>
    );
  }
}

const UserConsumer: Context => Node = Consumer;

export { UserProvider, UserConsumer };
export type { Context as UserContext };
