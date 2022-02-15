import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import 'firebase/auth';
// action - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import { initialLoginContextProps } from 'types';
import { FirebaseContextType } from 'types/auth';
import { getReqs, PROVIDERS, signinWith, signOut } from 'features/firebase-app';

// firebase initialize
// if (!firebase.apps.length) {
//     firebase.initializeApp(config.firebase);
// }

// const
const initialState: initialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(
        () => {
            let { auth } = getReqs();
            if (auth) {
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        dispatch({
                            type: LOGIN,
                            payload: {
                                isLoggedIn: true,
                                user: {
                                    id: user.uid,
                                    email: user.email!,
                                    name: user.displayName || 'Betty'
                                }
                            }
                        });
                    } else {
                        dispatch({
                            type: LOGOUT
                        });
                    }
                })
            }
        },
        [dispatch]
    );

    const firebaseGoogleSignIn = () => {
        return signinWith(PROVIDERS.GOOGLE);
    };

    const logout = () => {
        return signOut();
    }


    const updateProfile = () => { };
    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <FirebaseContext.Provider
            value={{
                ...state,
                login: () => { },
                firebaseGoogleSignIn,
                logout,
                updateProfile
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseContext;
