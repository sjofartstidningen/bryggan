import { DropboxUser } from 'types/dropbox';
import { Reducer } from 'react';

export enum DropboxAuthStage {
  unknown = 'unknown',
  authorized = 'authorized',
  unauthorized = 'unauthorized',
}

export enum DropboxAuthActionType {
  setAuthorized,
  setUnauthorized,
  setUnknown,
  setAuthError,
}

export enum DropboxErrorType {
  userInfo,
  authResult,
}

export type DropboxAuthAction =
  | {
      type: DropboxAuthActionType.setAuthorized;
      payload: { accessToken: string; user: DropboxUser };
    }
  | { type: DropboxAuthActionType.setUnauthorized }
  | { type: DropboxAuthActionType.setUnknown }
  | {
      type: DropboxAuthActionType.setAuthError;
      payload: { error: string; errorType: DropboxErrorType };
    };

export type DropboxAuthState =
  | { stage: DropboxAuthStage.unknown }
  | {
      stage: DropboxAuthStage.authorized;
      accessToken: string;
      user: DropboxUser;
    }
  | {
      stage: DropboxAuthStage.unauthorized;
      error?: string;
      errorType?: DropboxErrorType;
    };

export const dropboxAuthReducer: Reducer<
  DropboxAuthState,
  DropboxAuthAction
> = (state, action) => {
  switch (action.type) {
    case DropboxAuthActionType.setUnknown:
      return {
        ...state,
        stage: DropboxAuthStage.unknown,
      };

    case DropboxAuthActionType.setAuthorized:
      return {
        ...state,
        stage: DropboxAuthStage.authorized,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };

    case DropboxAuthActionType.setUnauthorized:
      return {
        ...state,
        stage: DropboxAuthStage.unauthorized,
        error: undefined,
      };

    case DropboxAuthActionType.setAuthError:
      return {
        ...state,
        stage: DropboxAuthStage.unauthorized,
        error: action.payload.error,
        errorType: action.payload.errorType,
      };

    default:
      return state;
  }
};

export const initialState: DropboxAuthState = {
  stage: DropboxAuthStage.unknown,
};
