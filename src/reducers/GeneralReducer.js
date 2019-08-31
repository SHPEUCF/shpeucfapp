// handle all things related to events
import {
    PAGE_LOAD
} from '../actions/types';

const INITIAL_STATE = {
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    const {
        payload
    } = action;

    switch (action.type) {
        case PAGE_LOAD:
            return {
                ...state,
                loading: payload
            };
        default:
            return state;
    }
};
