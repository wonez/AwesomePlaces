import { ASYNC_STARTED, ASYNC_FINISHED, PLACE_ADD_STARTED, PLACE_ADD_FINISHED } from "../actions/types-ui";

const initialState = {
    loading: false,
    placeAdded: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ASYNC_STARTED: return { ...state, loading: true };
        case ASYNC_FINISHED: return { ...state, loading: false };
        case PLACE_ADD_STARTED: return { ...state, placeAdded: true };
        case PLACE_ADD_FINISHED: return { ...state, placeAdded: false };
        default: return state;
    }
}

export default reducer;