import { createAsyncThunk, createNextState, createSlice } from '@reduxjs/toolkit';
const initialState = {
    signedIn: false,
    checkedSignIn: false,
    uid: null,
    token: null
}

function getProfileImage(data) {
    return data?.user?.photoURL || '';
}

function getAuthToken(data) {
    return data?.token;
}
function getClaims(data) {
    return data?.claims;
}
function getUid(data) {
    return data?.user?.uid;
}

function getDisplayName(data) {
    return data?.user?.displayName || '';
}

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setAuthenticationInfo: (state, action) => {
            state.signedIn = action.payload.signedIn;
            state.userProfileImage = getProfileImage(action.payload)
            state.uid = getUid(action.payload);
            state.token = getAuthToken(action.payload);
            state.claims = getClaims(action.payload);
            state.displayName = getDisplayName(action.payload);
        },
        setCheckedSignedIn: (state, action) => {
            state.checkedSignIn = true;
        }
    },
    extraReducers: (builder) => {
        console.log('extra reducers')
    }
})

export const {
    setAuthenticationInfo,
    setCheckedSignedIn
} = applicationSlice.actions;

export const getUserSignedIn = (state) => {
    return state?.application?.signedIn;
}
export const getToken = (state) => {
    return state?.application?.token;
}
export const getUserClaims = (state) => {
    return state?.application?.claims;
}
export const getUserSignedInId = (state) => {
    return state?.application?.uid;
}
export const hasCheckedSignIn = (state) => {
    return state?.application?.checkedSignIn;
}
export default applicationSlice.reducer;