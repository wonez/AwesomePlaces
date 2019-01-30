import { ASYNC_STARTED, ASYNC_FINISHED, PLACE_ADD_STARTED, PLACE_ADD_FINISHED } from './types-ui'

export const asyncStarted = () => {
    return {
        type: ASYNC_STARTED
    }
}

export const asyncFinished = () => {
    return {
        type: ASYNC_FINISHED
    }
}

export const placeAddStarted = () => {
    return {
        type: PLACE_ADD_STARTED
    }
}

export const placeAddFinished = () => {
    return {
        type: PLACE_ADD_FINISHED
    }
}