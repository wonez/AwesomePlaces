import { AUTH_DATA, REMOVE_AUTH } from "../actions/types-auth";

const initialState = {
    idToken: null,
    expirationDate: null,
    refreshToken: null
}

const authDataHandler = (prevState, authData) => {
    return {
        ...prevState,
        idToken: authData.idToken,
        expirationDate: authData.expirationDate,
        refreshToken: authData.refreshToken
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case AUTH_DATA: return authDataHandler(state, action.authData)
        case REMOVE_AUTH: return {...initialState}
        default: return state;
    }
} 
export default reducer;