import * as firebase from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import * as firedatabase from "firebase/database";
import { signInAnonymously } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/storage";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import "firebase/database";
import "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export function debounce(func: any, wait: any, immediate?: any) {
  var timeout: any;
  return (a?: any, b?: any, c?: any) => {
    let args: any[] = [a, b, c];
    var later: any = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    var callNow: any = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
};

// Initialize Firebase

let app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const database = firedatabase.getDatabase(app);
const storage = getStorage(app);

export function getApp() {
  return app;
}
export function getReqs() {
  return { db, app }; //
}
export const PROVIDERS = {
  GOOGLE: "GOOGLE",
  FACEBOOK: "FACEBOOK",
  EMAIL_PASSWORD: "EMAIL_PASSWORD",
  ANONYMOUS: "ANONYMOUS"
};
export function listenTo(path: any, callback: any) {
  try {
    firedatabase.onValue(firedatabase.ref(database, path), (snapshot) => {
      callback(snapshot.val());
    });
  } catch (e) {
    console.error(e);
  }
}
export function postTo(path: any, data: any) {
  try {
    setUndefinedPropertyToNull(data);
    return firedatabase.update(firedatabase.ref(database), { [path]: data });
  } catch (e) {
    console.error(e);
  }
  return null;
}
function setUndefinedPropertyToNull(data: any) {
  Object.keys(data).forEach((i) => {
    if (data[i] === undefined) {
      data[i] = null;
    }
  });
}
export async function signOut() {
  return auth
    .signOut()
    .then((e) => {
      console.log(e);
    })
    .catch((error) => {
      return error;
    });
}
let _lastState: any;
let _authStateChangedHandler: any;
export function setAuthStateChangedHandler(func: any) {
  _authStateChangedHandler = func;
  let temp = _lastState;
  _lastState = null;
  return temp;
}

export function setupCreateUpdateClocks(temp: any) {
  temp.created = convertServerTime(temp.created);
  if (temp.updated) temp.updated = convertServerTime(temp.updated);
}
function convertServerTime(obj: any) {
  return {
    seconds: obj.seconds,
    nanoseconds: obj.nanoseconds
  };
}
function authStateListener() {
  // [START auth_state_listener]
  auth.onAuthStateChanged(async (user) => {
    console.log(user);
    _lastState = user;
    if (user) {
      let token = await user.getIdToken();
      let claims = await user
        .getIdTokenResult()
        .then((idTokenResult) => {
          // Confirm the user is an Admin.
          return idTokenResult.claims;
        })
        .catch((error) => {
          console.log(error);
        });
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      if (_authStateChangedHandler) {
        _authStateChangedHandler({
          signedIn: true,
          user,
          claims,
          token
        });
      }
      // ...
    } else {
      // User is signed out
      // ...
      if (_authStateChangedHandler) {
        _authStateChangedHandler({
          signedIn: false,
          user
        });
      }
    }
  });
  // [END auth_state_listener]
}
authStateListener();
let url_cache: any = {};
export function GetCachedUrls(uri: any) {
  if (url_cache[uri]) {
    return url_cache[uri];
  }
  return false;
}
let url_resolved_handler: any = {};
export function SetupUrlResolutionHandler(handler: any, id: any) {
  url_resolved_handler[id] = debounce(handler, 1000);
}
export function RemoveUrlResolutionHandler(id: any) {
  delete url_resolved_handler[id];
}
export async function ResolveStorageUrl(uri: any) {
  if (!uri) {
    return false;
  }
  let url = `gs://playwatch-f1376.appspot.com/${uri}`;
  if (url_cache[uri]) {
    return url_cache[uri];
  }
  return await getDownloadURL(ref(storage, uri))
    .then((url) => {
      url_cache[uri] = url;
      if (url_resolved_handler) {
        Object.values(url_resolved_handler).map((v: any) => v());
      }
      return url;
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
      return false;
    });
}

export async function signinWith(providerId: any) {
  let provider;
  switch (providerId) {
    case PROVIDERS.GOOGLE:
      provider = new GoogleAuthProvider();
      break;
    case PROVIDERS.FACEBOOK:
      provider = new FacebookAuthProvider();
      break;
    case PROVIDERS.ANONYMOUS:
      return signInAnonymously(auth)
        .then((result) => {
          // Signed in..
          return result;
        })
        .catch((error) => {
          console.log(error);
        });
    default:
      throw "not supported provider : " + providerId;
  }
  return signInWithPopup(auth, provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      console.log(result);
      return result;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(error);
    });
}
