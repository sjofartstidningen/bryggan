// @flow

declare type UserProfile = {
  displayName?: string,
  photoURL?: string,
};

declare interface User {
  displayName: ?string;
  email: ?string;
  updateProfile(profile: UserProfile): Promise<void>;
}
