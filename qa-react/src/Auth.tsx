import auth0 from 'auth0-js';
import {Promise} from 'es6-promise';

const auth = new auth0.WebAuth({
    domain: 'jnabors.auth0.com',
    audience: 'https://jnabors.auth0.com/userinfo',
    clientID: '29iRhelBpxRTPCwKllhC06gEhhiBUDDY',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
});

export function handleAuthentication(): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
        auth.parseHash((err, authResult) => {
          if (err) return reject(err);
          if (!authResult || !authResult.idToken) {
            return reject(err);
          }
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));
          // @ts-ignore
          let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
          localStorage.setItem('expires_at', expiresAt);
          resolve();
        });
      })
}

export function getProfile(): {name: string} {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('profile'));
}

export function getIdToken() {
    return localStorage.getItem('id_token');
}

export function isAuthenticated() {
    const expirationTime = localStorage.getItem('expires_at');
    if(expirationTime){
        return new Date().getTime() < +expirationTime;
    }
    return false;
}

export function signIn() {
    auth.authorize();
}

export function signOut() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("profile");
    localStorage.removeItem("expires_at");
  }
