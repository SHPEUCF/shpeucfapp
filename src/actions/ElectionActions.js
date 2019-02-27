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
    EDIT_CANDIDATES
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
    firebase.database().ref(`/election/`).update({
        election: false
    })
    .then(() => alert('Election Closed!', 'Successful'))
    .catch((error) => alert('Election could not be Closed!', 'Failure'))

    return {
        type: CLOSE_ELECTION,
        payload: false
    };
};
export const addPosition = (text) => {
    return {
        type: ADD_POSITION,
        payload: text
    };
};
export const deletePosition = (text) => {
    return {
        type: DELETE_POSITION,
        payload: text
    };
};
export const editPosition = (text) => {
    return {
        type: EDIT_POSITION,
        payload: text
    };
};
export const addCandidates = (text) => {
    return {
        type: ADD_CANDIDATES,
        payload: text
    };
};
export const deleteCandidates = (text) => {
    return {
        type: DELETE_CANDIDATES,
        payload: text
    };
};
export const editCandidates = (text) => {
    return {
        type: EDIT_CANDIDATES,
        payload: text
    };
};
