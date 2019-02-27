// handle all things related to authentication
import {
    OPEN_ELECTION,
    CLOSE_ELECTION,
    ADD_POSITION,
    DELETE_POSITION,
    EDIT_POSITION,
    ADD_CANDIDATES,
    DELETE_CANDIDATES,
    EDIT_CANDIDATES,
    CANDIDATE_FNAME_CHANGED,
    CANDIDATE_LNAME_CHANGED,
    CANDIDATE_PLAN_CHANGED,
    CANDIDATE_POSITION_CHANGED,
    POSITION_TITLE_CHANGED,
    POSITION_DESCRIPTION_CHANGED,
    GO_TO_CANDIDATE_FORM,
    GO_TO_POSITION_FORM
} from '../actions/types';

const INITIAL_STATE = {
    election: false,
    candidateFName: "",
    candidateLName: "",
    candidatePosition: "",
    candidatePlan: "",
    positionTitle: "",
    positionDescription: "",
    title: "ADD"
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
            return state
            
        case DELETE_POSITION:
            return {
                ...state,
                positionTitle : "",
                positionDescription : ""
            }
        case EDIT_POSITION:
            return state
        case ADD_CANDIDATES:
            return state
        case DELETE_CANDIDATES:
            return {
                ...state,
                candidateName : "",
                candidatePlan : "",
                candidatePosition : ""
            }
        case EDIT_CANDIDATES:
            return state
        case CANDIDATE_FNAME_CHANGED: 
            return {
                ...state,
                candidateName: payload
            }
        case CANDIDATE_LNAME_CHANGED: 
            return {
                ...state,
                candidateName: payload
            }
        case CANDIDATE_PLAN_CHANGED: 
            return {
                ...state,
                candidatePlan: payload
            }
        case CANDIDATE_POSITION_CHANGED: 
            return {
                ...state,
                candidatePosition: payload
            }
        case POSITION_TITLE_CHANGED: 
            return {
                ...state,
                positionTitle: payload
            }
        case POSITION_DESCRIPTION_CHANGED: 
            return {
                ...state,
                positionDescription: payload
            }
        case GO_TO_CANDIDATE_FORM:
            return {
                ...state,
                title: payload
            }
        case GO_TO_POSITION_FORM:
            return {
                ...state,
                title: payload
            }
        default:
            return state;
    }
}
