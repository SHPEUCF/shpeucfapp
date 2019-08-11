// handle all things related to events
import {
    PAGE_LOAD, 
    GET_COMMITTEES, 
    GO_TO_COMMITTEE_FORM,
    EDIT_COMMITTEE,
    DELETE_COMMITTEE,
    COMMITTEE_DESCRIPTION_CHANGED,
    COMMITTEE_TITLE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    committees: [],
    title: "ADD",
    committeeTitle: "",
    committeeDescription: "",
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
        case GET_COMMITTEES:
            return {
                ...state,
                committees: payload
            }
        case GO_TO_COMMITTEE_FORM:
            return {
                ...state,
                title: payload
            }
        case DELETE_COMMITTEE:
            return {
                ...state,
                committeeTitle : "",
                committeeDescription : ""
            }
        case COMMITTEE_TITLE_CHANGED:
            return {
                ...state,
                committeeTitle: payload
            }
        case COMMITTEE_DESCRIPTION_CHANGED:
            return {
                ...state,
                committeeDescription: payload
            }
        case EDIT_COMMITTEE:
            return state
        default:
            return state;

    }
};
