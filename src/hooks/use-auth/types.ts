import { DropboxUser } from '../../types/dropbox';

export enum AuthStatus {
  unknown = 'unknown',
  checking = 'checking',
  checkingToken = 'checking-token',
  authorized = 'authorized',
  unauthorized = 'unauthorized',
  signingIn = 'signing-in',
  signingOut = 'signing-out',
}

export enum AuthActionType {
  checkAuth = 'check-auth',
  checkToken = 'check-token',
  signIn = 'sign-in',
  signOut = 'sign-out',
  authorize = 'authorize',
  unauthorize = 'unauthorize',
}

/**
 * A user can choose to authorize using either direct input, e.g. pasting in an
 * access token recieved, or by using standard oauth redirect method.
 */
export enum SignInMethod {
  oauth = 'oauth',
  directInput = 'direct-input',
}

export type AuthAction =
  | {
      type: AuthActionType.checkAuth;
    }
  | {
      type: AuthActionType.checkToken;
      payload: { accessToken: string };
    }
  | {
      type: AuthActionType.authorize;
      payload: { accessToken: string; user: DropboxUser };
    }
  | {
      type: AuthActionType.unauthorize;
      payload?: { reason: string };
    }
  | {
      type: AuthActionType.signIn;
      payload: SigningInState;
    }
  | {
      type: AuthActionType.signOut;
      payload: { accessToken: string };
    };

export type SigningInState =
  | { method: SignInMethod.oauth; oauthState?: string }
  | { method: SignInMethod.directInput; accessToken: string };

/**
 * The Auth state can be in only n placec at a given point in time, and
 * different props are attached to it at that time.
 */
export type AuthState =
  | {
      status: AuthStatus.unknown;
    }
  | {
      status: AuthStatus.checking;
    }
  | {
      status: AuthStatus.checkingToken;
      accessToken: string;
    }
  | {
      status: AuthStatus.authorized;
      accessToken: string;
      user: DropboxUser;
    }
  | {
      status: AuthStatus.unauthorized;
      error?: string;
    }
  | {
      status: AuthStatus.signingIn;
    } & SigningInState
  | {
      status: AuthStatus.signingOut;
      accessToken: string;
    };

export interface StateChart {
  initial: AuthStatus;
  states: {
    [key in AuthStatus]: {
      on: {
        [key in AuthActionType]?: AuthStatus;
      };
    };
  };
}
