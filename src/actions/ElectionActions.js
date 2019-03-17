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
    OPEN_APPLICATIONS,
    CLOSE_APPLICATIONS,
    CANDIDATE_ID_CHANGED,
    ADD_APPLICATION,
    APPROVE_APPLICATION,
    DELETE_POSITION,
    EDIT_POSITION,
    CHANGE_POSITION,
    DELETE_APPLICATION,
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
    GET_VOTES,
    UPDATE_ELECTION

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
                type: CLOSE_ELECTION,
                payload: false
            });
        })
        .then(() => alert('Election Closed!', 'Successful'))
        .catch((error) => alert('Election could not be Closed!', 'Failure'))
    }
};
export const openApplications = () => {
    return (dispatch) => {
        firebase.database().ref(`/election/`).update({
            apply: true
        })
        .then(() => {
            dispatch({
                type: OPEN_APPLICATIONS,
                payload: true
            });
        })
        .then(() => alert('Applications Started!', 'Successful'))
        .catch((error) => alert('Applications could not be Started!', 'Failure'))
    }
};
export const closeApplications = () => {
    return (dispatch) => {
        firebase.database().ref(`/election/`).update({
            apply: false
        })
        .then(() => {
            dispatch({
                type: CLOSE_APPLICATIONS,
                payload: false
            });
        })
        .then(() => alert('Applications Closed!', 'Successful'))
        .catch((error) => alert('Applications could not be Closed!', 'Failure'))
    }
};
export const addPosition = (title, description) => {
    return () => {
        firebase.database().ref(`/election/positions/${title}`).set({
                title: title,
                description: description,
                level: 100
            })
            .then(() => alert('Position Added!', 'Successful'))
            .catch((error) => alert('Position could not be Added!', 'Failure'))
    }
};

export const updateElection = () => {
    return (dispatch) => {
      firebase.database().ref(`/election/`)
        .on('value', snapshot => {
          const info = (snapshot.val());

          dispatch({
            type: UPDATE_ELECTION,
            payload: info,
          });
        });
      };
}

export const deletePosition = (text) => {
    return (dispatch) => {
        firebase.database().ref(`/election/positions/${title}`).update({
                title: "",
                description: "",
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

export const addApplication = (fName, lName, plans, position, id) => {

  return (dispatch) => {
      firebase.database().ref(`/election/positions/${position}/candidates/${id}`).set({
              firstName: fName,
              lastName: lName,
              plan: plans,
              id: id,
              position: position,
              approved: false,
          })
          .then(() => firebase.database().ref(`/users/${id}/applied/`).set(true))
          .then(() => {
              dispatch({
                  type: ADD_APPLICATION,
              });
          })
      .then(() => alert('Application Added!', 'Successful'))
      .catch((error) => alert('Application could not be Added!', 'Failure'))
  }
};

export const editApplication = (position, plans, id) => {

  return () => {
      firebase.database().ref(`/election/positions/${position}/candidates/${id}`).update({
              plan: plans,
          })
      .then(() => alert('Application Edited!', 'Successful'))
      .catch((error) => alert('Application could not be Edited!', 'Failure'))
  }
};


export const approveApplication = (position, candidateId) => {
    return (dispatch) => {
        //this needs to find the person but it needs to check for duplicates somehow

        //Alert.alert(candidateId);
        firebase.database().ref(`/election/positions/${position}/candidates/${candidateId}`).update({
                approved: true
            })
            .then(()=> {
              firebase.database().ref(`/voting/${position}/${candidateId}`).set({
                      votes: 0,
                    })
            })
            .then(() => {
                dispatch({
                    type: APPROVE_APPLICATION,
                });
            })
            .then(() => alert('Candidate Approved!', 'Successful'))
            .catch((error) => alert('Candidate could not be Approved!', 'Failure'))

    }
};

export const deleteApplication = (position, candidateId) => {
  return (dispatch) => {
      //this needs to find the person but it needs to check for duplicates somehow

      //Alert.alert(candidateId);
      firebase.database().ref(`/election/positions/${position}/candidates/${candidateId}`).remove()
          .then(() => {
              dispatch({
                  type: DELETE_APPLICATION,
              });
          })
          .then(() => alert('Candidate Removed!', 'Successful'))
          .catch((error) => alert('Candidate could not be removed!', 'Failure'))

  }
};
export const editCandidates = (text) => {
    return {
        type: EDIT_CANDIDATES,
    };
};
export const candidateIdChanged = (text) => {
    return {
        type: CANDIDATE_ID_CHANGED,
        payload: text
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

export const goToCandidateForm = (text, pos) => {
    Actions.CandidateForm()
    return (dispatch) => {
        dispatch({
          type: GO_TO_CANDIDATE_FORM,
          payload: text
        });
        dispatch({
          type: CHANGE_POSITION,
          payload: pos
        });
    }
};

export const goToPositionForm = (text) => {
    Actions.PositionForm()
    return {
        type: GO_TO_POSITION_FORM,
        payload: text
    }
};

export const vote = (userId, dict) => {
    var votes;
    return () => {
        dict.forEach(function(item){
            firebase.database().ref(`/voting/${item.key}/${item.value}/votes`).once('value', snapshot => {
            votes = parseInt(snapshot.val()) + 1;
            firebase.database().ref(`/voting/${item.key}/${item.value}/votes`).set(votes)
            .then(() => firebase.database().ref(`/voting/${item.key}/${item.value}/${userId}`).set(true))

            })
          })

          firebase.database().ref(`/users/${userId}/voted/`).set(true)
          /*.then(() => alert('Vote Cast!', 'Successful'))
          .catch((error) => alert('Vote could not be cast!', 'Failure'))*/
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

export const changeLevels = (position, level) => {

  return () => {
  firebase.database().ref(`/election/positions/${position}/level`).set(level)
  };
};

export const getVotes = () => {

  return (dispatch) => {
  firebase.database().ref(`votes`)
    .on('value', snapshot => {
      const votes = (snapshot.val());

      dispatch({
        type: GET_VOTES,
        payload: votes,
      });
    });
  };
};
