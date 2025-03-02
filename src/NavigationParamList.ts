/**
 * A record of the navigation params for each route in your app.
 */
export type MainStackParamList = {
  Login: {};
  Signup: {};
  VPN: {};
  One?: {};
  Two: {
    message: string;
  };
};