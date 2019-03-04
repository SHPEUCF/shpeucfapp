import firebase from 'firebase';
import {
    Actions
} from 'react-native-router-flux';
import {
    Alert
} from 'react-native';

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
    GO_TO_POSITION_FORM,
    GET_POSITIONS,
} from './types';

export const openElection = () => {
    return (dispatch) => {
        firebase.database().ref(`/election/`).update({
            election: true
        })
        .then(() => {
            dispatch({
                type: OPEN_ELECTION,
                payload: true
            });
        })
        .then(() => alert('Election Started!', 'Successful'))
        .catch((error) => alert('Election could not be Started!', 'Failure'))
    }
};
export const closeElection = () => {
    return (dispatch) => {
        firebase.database().ref(`/election/`).update({
            election: false
        })
        .then(() => {
            dispatch({
                type: OPEN_ELECTION,
                payload: false
            });
        })
        .then(() => alert('Election Closed!', 'Successful'))
        .catch((error) => alert('Election could not be Closed!', 'Failure'))
    }
};
export const addPosition = (title, description) => {
    return (dispatch) => {
        firebase.database().ref(`/election/positions/${title}`).set({
                title: title,
                description: description
            })
            .then(() => {
                dispatch({
                    type: ADD_POSITION,
                });
            })
            .then(() => alert('Position Added!', 'Successful'))
            .catch((error) => alert('Position could not be Added!', 'Failure'))
    }
};
export const deletePosition = (text) => {
    return (dispatch) => {
        firebase.database().ref(`/election/positions/${title}`).update({
                title: "",
                description: ""
            })
            .then(() => {
                dispatch({
                    type: DELETE_POSITION,
                });
            })
            .then(() => alert('Position Added!', 'Successful'))
            .catch((error) => alert('Position could not be Added!', 'Failure'))
    }
};
export const editPosition = (title, description) => {
    return (dispatch) => {
        firebase.database().ref(`/election/positions/${title}`).update({
                title: title,
                description: description
            })
            .then(() => {
                dispatch({
                    type: EDIT_POSITION,
                });
            })
            .then(() => alert('Position Edited!', 'Successful'))
            .catch((error) => alert('Position could not be Edited!', 'Failure'))
    }
};
export const addCandidates = (fName, lName, plan, position) => {
    return (dispatch) => {
        //this needs to find the person but it needs to check for duplicates somehow
        // firebase().database().ref('/users/').orderByChild("firstName").equalTo(fName).on('value', (snapshot) => {
        //
        // })


    }
};
export const deleteCandidates = (text) => {
    return {
        type: DELETE_CANDIDATES,
    };
};
export const editCandidates = (text) => {
    return {
        type: EDIT_CANDIDATES,
    };
};
export const candidateFNameChanged = (text) => {
    return {
        type: CANDIDATE_FNAME_CHANGED,
        payload: text
    };
};
export const candidateLNameChanged = (text) => {
    return {
        type: CANDIDATE_LNAME_CHANGED,
        payload: text
    };
};
export const candidatePlanChanged = (text) => {
    return {
        type: CANDIDATE_PLAN_CHANGED,
        payload: text
    };
};
export const candidatePositionChanged = (text) => {
    return {
        type: CANDIDATE_POSITION_CHANGED,
        payload: text
    };
};

export const positionTitleChanged = (text) => {
    return {
        type: POSITION_TITLE_CHANGED,
        payload: text
    };
};
export const positionDescriptionChanged = (text) => {
    return {
        type: POSITION_DESCRIPTION_CHANGED,
        payload: text
    };
};

export const goToCandidateForm = (text) => {
    Actions.CandidateForm()
    return {
        type: GO_TO_CANDIDATE_FORM,
        payload: text
    }
};

export const goToPositionForm = (text) => {
    Actions.PositionForm()
    return {
        type: GO_TO_POSITION_FORM,
        payload: text
    }
};

export const getPositions = () => {

  return (dispatch) => {
  firebase.database().ref(`/election/positions`)
    .on('value', snapshot => {
      const positions = (snapshot.val());

      dispatch({
        type: GET_POSITIONS,
        payload: positions,
      });
    });
  };
};
