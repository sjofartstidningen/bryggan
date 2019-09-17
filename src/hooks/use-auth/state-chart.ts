import { StateChart, AuthStatus, AuthActionType } from './types';

/**
 * The state chart describes which states can transition to each other, and by
 * which event. This is used to prevent state updates from colliding an taking
 * precedence over each other.
 */
export const stateChart: StateChart = {
  initial: AuthStatus.unknown,
  states: {
    [AuthStatus.unknown]: {
      on: {
        [AuthActionType.checkAuth]: AuthStatus.checking,
        [AuthActionType.checkToken]: AuthStatus.checkingToken,
      },
    },
    [AuthStatus.checking]: {
      on: {
        [AuthActionType.authorize]: AuthStatus.authorized,
        [AuthActionType.unauthorize]: AuthStatus.unauthorized,
        [AuthActionType.checkToken]: AuthStatus.checkingToken,
      },
    },
    [AuthStatus.checkingToken]: {
      on: {
        [AuthActionType.authorize]: AuthStatus.authorized,
        [AuthActionType.unauthorize]: AuthStatus.unauthorized,
      },
    },
    [AuthStatus.signingIn]: {
      on: {
        [AuthActionType.authorize]: AuthStatus.authorized,
        [AuthActionType.unauthorize]: AuthStatus.unauthorized,
      },
    },
    [AuthStatus.signingOut]: {
      on: {
        [AuthActionType.unauthorize]: AuthStatus.unauthorized,
      },
    },
    [AuthStatus.unauthorized]: {
      on: {
        [AuthActionType.signIn]: AuthStatus.signingIn,
        [AuthActionType.checkToken]: AuthStatus.checkingToken,
      },
    },
    [AuthStatus.authorized]: {
      on: {
        [AuthActionType.signOut]: AuthStatus.signingOut,
      },
    },
  },
};
