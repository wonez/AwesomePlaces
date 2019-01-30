import { ITEM_DELETE, TRY_LOGIN, PLACES_FETCHED } from './types-places'

import { getToken } from './creator-auth'
import { asyncStarted, asyncFinished, placeAddStarted } from './creator-ui'

export const addPlace = (place, coordinates, image) => {
    return dispatch => {
        let authToken;
        dispatch(asyncStarted());
        dispatch(getToken())
        .catch(err => {
            dispatch(asyncFinished());
            alert(err.message)
        })
        .then(token => {
            authToken = token;
            return fetch('https://us-central1-awesome-places-3359b.cloudfunctions.net/saveImage', {
                method: 'POST',
                body: JSON.stringify({
                    image: image.base64
                }),
                headers: {
                    'Authorization': "Bearer " + token
                }
            })
        })
        .catch((err) => {
            dispatch(asyncFinished());
            alert('Something went wrong ' + err.message);
        })
        .then(res => res.json())
        .then(parsed => {
            const data = {
                name: place,
                coordinates,
                imageUrl: parsed.imageUrl
            }
            return fetch('https://awesome-places-3359b.firebaseio.com/places.json?auth='+authToken, {
                method: 'POST',
                body: JSON.stringify(data)
            })
        })
        .then((_) => {
            dispatch(asyncFinished());
            dispatch(placeAddStarted());
        })  
        .catch((err) => {
            console.log(err);
            dispatch(asyncFinished());
            alert('Something went wrong ' + err.message);
        })
    }
}

export const requestPlaces = () => {
    return dispatch => {
        dispatch(getToken())
        .catch(err => {
            alert(err)
        })
        .then( (token) => {
            return fetch('https://awesome-places-3359b.firebaseio.com/places.json?auth='+token, {
                method: 'GET'
            })
        }).catch((err) => {
            alert('Something went wrong ' + err.message);
        }).then(res => {
            return res.json();
        }).then(places => {
            if(!places){
                dispatch(placesFetched([]))
            }else if(places.error){
                throw places.error;
            }else{
                const placesDerived = [];
                for(let key in places){
                    placesDerived.push({
                        ...places[key],
                        key
                    })
                }
                dispatch(placesFetched(placesDerived))
            }
        }).catch((err) => { 
            alert('Something went wrong ' + err);
        })
    }
}

const placesFetched = (places) => {
    return {
        type: PLACES_FETCHED,
        places
    }
}

export const itemDelete = (key) => {
    return dispatchEvent => {
        dispatchEvent(getToken())
        .catch( err => alert(err))
        .then((token) => {
            dispatchEvent(deleteLocaly(key))
            return fetch(`https://awesome-places-3359b.firebaseio.com/places/${key}.json?auth=${token}`, {
                method: 'DELETE'
            })
        })
        .catch(err => {
            dispatchEvent(requestPlaces())
            console.log(err)
        })
        .then(console.log)
        .catch(err => {
            dispatchEvent(requestPlaces())
            console.log(err)
        })
    }
}

export const deleteLocaly = key => {
    return{
        type: ITEM_DELETE,
        key
    }
}

export const tryLogin = (loginData) => {
    return {
        type: TRY_LOGIN,
        loginData
    }
}