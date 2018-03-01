import {API_KEY, CLIENT_ID} from './secrets.js'

let gapi = null;

let isSignedIn = false;
const onGetAuthTokenCallbacks = [];

function loadGapiFromWindow() {
  gapi = window.gapi;
  return Promise.resolve();
}

function loadClient() {
  return new Promise(function (resolve) {
    gapi.load('client', resolve);
  })
}

function updateSignedInStatus() {
  isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
  if (isSignedIn) {
    const token = gapi.client.getToken().access_token;
    for (let i = 0; i < onGetAuthTokenCallbacks.length; i++) {
      onGetAuthTokenCallbacks[i](token)
    }
  }
}

function initClient() {
  return gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/userinfo.email'
  });
}

function setUpSignInListener() {
  // Listen for sign-in state changes.
  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignedInStatus);

  // Handle the initial sign-in state.
  updateSignedInStatus();
}

export function signIn() {
  gapi.auth2.getAuthInstance().signIn().then(
    updateSignedInStatus
  );
}

export function onGetAuthToken(func) {
  onGetAuthTokenCallbacks.push(func);
}

export function init() {
  loadGapiFromWindow()
    .then(loadClient)
    .then(initClient)
    .then(setUpSignInListener)
}
