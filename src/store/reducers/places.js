import { ITEM_DELETE, PLACES_FETCHED } from '../actions/types-places'

const initialState = {
    places: []
}

const handleDelete = (prevState, key) => {
    return {
        places: prevState.places.filter( place => {
            return place.key !== key
        }),
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ITEM_DELETE: return handleDelete(state, action.key)
        case PLACES_FETCHED: return {...state, places: action.places  }
        default: return state;
    }
}

export default reducer;