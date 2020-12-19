// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from '../interface/interface'

export const environment : Environment = {
  production: false,
  apiKey: 'AIzaSyC3-uWhYA9wqFw-oCFwlEj7X4SLv_jxz-w',
  fbUrlDatabase: 'https://angular-forum-4489d.firebaseio.com/',
  fbUrlSignUp: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  fbUrlSendEmailVerify: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=',
  fbUrlLogIn : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  fbUrlGetUserData: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=',
  fbUrlResetPassword: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=',
  fbUrlDeleteUser: 'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=',
  adminUid : 'Y5SmRZzbEQZvijyn31YINj0ZpK22'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
