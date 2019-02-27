// handle all things related to authentication
import {
    OPEN_ELECTION,
    CLOSE_ELECTION,
    ADD_POSITION,
    DELETE_POSITION,
    EDIT_POSITION,
    ADD_CANDIDATES,
    DELETE_CANDIDATES,
    EDIT_CANDIDATES
} from '../actions/types';

const INITIAL_STATE = {
    election: false,
    candidateName: "",
    candidatePosition: "",
    candidatePlan: "",
    positionTitle: "",
    positionDescription: "",

};

export default (state = INITIAL_STATE, action) => {
    const {
        payload
    } = action;

    switch (action.type) {
        case OPEN_ELECTION:
            return {
                ...state,
                election : payload
            }
        case CLOSE_ELECTION:
            return {
                ...state,
                election : payload
            }
        case ADD_POSITION:
            return {
                ...state,
                positionTitle : payload.title,
                positionDescription : payload.description
            }
        case DELETE_POSITION:
            return {
                ...state,
                positionTitle : "",
                positionDescription : ""
            }
        case EDIT_POSITION:
            return {
                ...state,
                positionTitle : payload.title,
                positionDescription : payload.description
            }
        case ADD_CANDIDATES:
            return {
                ...state,
                candidateName : payload.name,
                candidatePlan : payload.plan,
                candidatePosition : payload.position
            }
        case DELETE_CANDIDATES:
            return {
                ...state,
                candidateName : "",
                candidatePlan : "",
                candidatePosition : ""
            }
        case EDIT_CANDIDATES:
            return {
                ...state,
                candidateName : payload.name,
                candidatePlan : payload.plan,
                candidatePosition : payload.position
            }

        default:
            return state;
    }
}
