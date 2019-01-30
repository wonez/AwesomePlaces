import { goHome, goAuth } from '../../screens/navigation';

import { AsyncStorage } from 'react-native'

import { AUTH_DATA, REMOVE_AUTH } from './types-auth'
import { asyncStarted, asyncFinished } from './creator-ui'

export const logIn = (authData) => {
    return dispatchEvent => {
        const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAHr39CPp-Wq3eOxzeyjzIdWndHPVp4NhQ'
        dispatchEvent(tryAuth(authData, url))
    }
}

export const signUp = (authData) => {
    return dispatchEvent => {
        const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAHr39CPp-Wq3eOxzeyjzIdWndHPVp4NhQ'
        dispatchEvent(tryAuth(authData, url))
    }
}

const tryAuth = (authData, url) => {
    return dispatchEvent => {
        dispatchEvent(asyncStarted());
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
        })
            .catch(err => {
                console.log(err);
                dispatchEvent(asyncFinished())
                alert('Something went wrong ' + err.message);
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                dispatchEvent(asyncFinished())
                if(res.error){
                    throw res.error
                } else {
                    dispatchEvent(authDataHandler(res))
                    goHome();
                }
            })
            .catch(err => {
                console.log(err);
                dispatchEvent(asyncFinished())
                alert('Something went wrong ' + err.message);
            })

    }
}

const authDataHandler = (authData) => {
    return dispatchEvent => {
        authData.expirationDate = new Date(Date.now() + authData.expiresIn * 1000).toISOString();
        dispatchEvent(authHandler(authData))
        storeAsyncStorage(authData);
    }
}

export const logout = () => {
    return dispatchEvent => {
        removeAsyncStorage();
        dispatchEvent(removeAuth())
        goAuth();
    }
}

const storeAsyncStorage = (authData) => {
    AsyncStorage.setItem('idToken', authData.idToken);
    AsyncStorage.setItem('expirationDate', authData.expirationDate)
    AsyncStorage.setItem('refreshToken', authData.refreshToken)
}

const removeAsyncStorage = () => {
    AsyncStorage.removeItem('idToken')
    AsyncStorage.removeItem('expirationDate')
    AsyncStorage.removeItem('refreshToken')
}

const authHandler = (authData) => {
    return {
        type: AUTH_DATA,
        authData
    }   
}

const removeAuth = () => {
    return{
        type: REMOVE_AUTH
    }
}

export const autoAuth = () => {
    return dispatchEvent => {
        dispatchEvent(getToken())
            .then(token => {
                if(token)
                    goHome();
            })
            .catch(console.log)
    }
}

export const getToken = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const token = getState().authReducer.idToken;
            const expires = getState().authReducer.expirationDate; 
            if(token && (new Date(expires) > new Date())){
                resolve(token)
            }else{
                AsyncStorage.multiGet(['idToken', 'expirationDate', 'refreshToken'])
                .then( res => {
                    const idToken = res[0][1];
                    const expirationDate = res[1][1];
                    const refreshToken = res[2][1];
                    if(idToken && expirationDate && refreshToken){
                        if(new Date(expirationDate) > new Date()){
                            resolve(idToken);
                            dispatch(authHandler({idToken, expirationDate, refreshToken}))
                        }else{
                            fetch('https://securetoken.googleapis.com/v1/token?key=AIzaSyAHr39CPp-Wq3eOxzeyjzIdWndHPVp4NhQ', {
                                method: "POST",
                                'Content-Type': 'application/x-www-form-urlencoded',
                                body: JSON.stringify({
                                    grant_type: 'refresh_token',
                                    refresh_token: refreshToken
                                })
                            })
                            .catch(err => reject(err))
                            .then(res => res.json())
                            .then(parsed => {
                                dispatch(authDataHandler({
                                    idToken: parsed.id_token,
                                    expirationDate: parsed.expires_in,
                                    refreshToken: parsed.refresh_token 
                                }))
                                resolve(parsed.id_token);                 
                            })
                        }
                    } else{
                        throw 'No valid token'
                    }
                })
                .catch(err => reject(err))
            } 
        });
    }
}