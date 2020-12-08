import {Environment} from '../interface/interface';

export const environment : Environment = {
  production: true,
  apiKey: 'AIzaSyC3-uWhYA9wqFw-oCFwlEj7X4SLv_jxz-w',
  fbUrlSignUp : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  fbUrlSendEmailVerify : 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=',
  fbUrlLogIn: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  fbUrlGetUserData: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=',
  fbUrlDatabase : 'https://angular-forum-4489d.firebaseio.com/',
  fbUrlResetPassword : 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='
};
