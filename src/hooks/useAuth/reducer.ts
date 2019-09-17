import {
  AuthState,
  AuthAction,
  AuthActionType,
  AuthStatus,
  SignInMethod,
} from './types';
import { stateChart } from './state-chart';
/**
 * The reudecer handles every finitely possible state transition. If an action
 * happening on the current state doesn't exists on that states chart on the
 * state chart the state transition will be prevented.
 *
 * This will prevent action overriding other actions and securing the use of
 * async updates.
 *
 * @param {AuthState} state
 * @param {AuthAction} action
 * @returns {AuthState}
 */
export const reducer = (state: AuthState, action: AuthAction): AuthState => {
  const currentStatus = state.status;
  const nextStatus = stateChart.states[currentStatus].on[action.type];

  if (nextStatus == null || currentStatus === nextStatus) return state;

  switch (action.type) {
    case AuthActionType.checkAuth:
      return {
        status: nextStatus as AuthStatus.checking,
      };

    case AuthActionType.checkToken:
      return {
        status: nextStatus as AuthStatus.checkingToken,
        accessToken: action.payload.accessToken,
      };

    case AuthActionType.signIn:
      switch (action.payload.method) {
        case SignInMethod.oauth:
          return {
            status: nextStatus as AuthStatus.signingIn,
            method: SignInMethod.oauth,
            oauthState: action.payload.oauthState,
          };
        case SignInMethod.directInput:
          return {
            status: nextStatus as AuthStatus.signingIn,
            method: SignInMethod.directInput,
            accessToken: action.payload.accessToken,
          };
        default:
          return state;
      }

    case AuthActionType.signOut:
      return {
        status: nextStatus as AuthStatus.signingOut,
        accessToken: action.payload.accessToken,
      };

    case AuthActionType.authorize:
      return {
        status: nextStatus as AuthStatus.authorized,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };

    case AuthActionType.unauthorize:
      return {
        status: nextStatus as AuthStatus.unauthorized,
        error: action.payload && action.payload.reason,
      };
  }
};

export const initialState: AuthState = {
  status: AuthStatus.unknown,
};
