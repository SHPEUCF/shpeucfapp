import { createActiontypes } from '../utils/actions';

// handle all things related to Elections
const ACTIONS = createActiontypes([
    'PAGE_LOAD'
]);

const INITIAL_STATE = {
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    const {
        payload
    } = action;

    switch (action.type) {
        case ACTIONS.PAGE_LOAD:
            return {
                ...state,
                loading: payload
            };
        default:
            return state;
    }
};

export const pageLoad = () => {
    return {
        type: ACTIONS.PAGE_LOAD,
        payload: true
    };
};
