import { createActiontypes } from "../utils/actions";
import { Actions } from "react-native-router-flux";
import firebase from "firebase";

// handle all things related to Elections
const ACTIONS = createActiontypes([
  "GET_COMMITTEES",
  "GO_TO_COMMITTEE_FORM",
  "EDIT_COMMITTEE",
  "DELETE_COMMITTEE",
  "COMMITTEE_DESCRIPTION_CHANGED",
  "COMMITTEE_TITLE_CHANGED",
  "CHAIR_CHANGED"
]);

const INITIAL_STATE = {
  committeesList: [],
  title: "ADD",
  committeeTitle: "",
  committeeDescription: "",
  chair: {}
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case ACTIONS.GET_COMMITTEES:
      return { ...state, committeesList: payload };
    case ACTIONS.GO_TO_COMMITTEE_FORM:
      return { ...state, title: payload };
    case ACTIONS.DELETE_COMMITTEE:
      return {
        ...state,
        chair: "",
        committeeTitle: "",
        committeeDescription: ""
      };
    case ACTIONS.COMMITTEE_TITLE_CHANGED:
      return { ...state, committeeTitle: payload };
    case ACTIONS.COMMITTEE_DESCRIPTION_CHANGED:
      return { ...state, committeeDescription: payload };
    case ACTIONS.CHAIR_CHANGED:
      return { ...state, chair: payload };
    default:
      return state; // Also covers ACTIONS.EDIT_COMMITEE
  }
};

export const getCommittees = () => {
  return dispatch => {
    firebase
      .database()
      .ref(`/committees/`)
      .on("value", snapshot => {
        const committtees = snapshot.val();

        dispatch({
          type: ACTIONS.GET_COMMITTEES,
          payload: committtees
        });
      });
  };
};

export const goToCommitteeForm = text => {
  Actions.CommitteeForm();
  return { type: ACTIONS.GO_TO_COMMITTEE_FORM, payload: text };
};

export const addCommittee = (title, description, chair, length) => {
  return () => {
    firebase
      .database()
      .ref(`/committees/${title}`)
      .set({
        title: title,
        description: description,
        chair: chair,
        level: length
      })
      .then(() => alert("Committee Added!", "Successful"))
      .catch(error => alert("Committee could not be Added!", "Failure"));
  };
};

export const editCommittee = (title, description, chair, oldTitle) => {
  if (oldTitle !== null) {
    return dispatch => {
      let level;
      firebase
        .database()
        .ref(`/committees/${oldTitle}/level`)
        .once("value", snapshot => {
          level = snapshot.val();

          firebase
            .database()
            .ref(`/committees/${oldTitle}`)
            .remove()
            .then(() => {
              dispatch({ type: ACTIONS.DELETE_COMMITTEE });
            })
            .then(() =>
              firebase
                .database()
                .ref(`/committees/${title}`)
                .set({
                  title: title,
                  description: description,
                  chair: chair,
                  level: level
                })
            )
            .then(() => alert("Committee Edited!", "Successful"))
            .catch(error => {
              alert("Committee could not be Edited!", "Failure");
            });
        });
    };
  } else {
    return dispatch => {
      firebase
        .database()
        .ref(`/committees/${title}`)
        .update({
          title: title,
          description: description,
          chair: chair
        })
        .then(() => {
          dispatch({
            type: ACTIONS.EDIT_COMMITTEE
          });
        })
        .then(() => alert("Committee Edited!", "Successful"))
        .catch(error => alert("Committee could not be Edited!", "Failure"));
    };
  }
};

export const deleteCommittee = (text, chair) => {
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${chair.id}/board`)
      .remove()
      .then(() =>
        firebase
          .database()
          .ref(`/privileges/${chair.id}/`)
          .update({
            board: false
          })
      );

    firebase
      .database()
      .ref(`/committees/${text}`)
      .remove()
      .then(() => {
        dispatch({
          type: ACTIONS.DELETE_COMMITTEE
        });
      })
      .then(() => alert("Committee Deleted!", "Successful"))
      .catch(error => alert("Committee could not be deleted!", "Failure"));
  };
};

export const committeeTitleChanged = text => {
  return { type: ACTIONS.COMMITTEE_TITLE_CHANGED, payload: text };
};

export const committeeDescriptionChanged = text => {
  return { type: ACTIONS.COMMITTEE_DESCRIPTION_CHANGED, payload: text };
};

export const chairChanged = person => {
  return { type: ACTIONS.CHAIR_CHANGED, payload: person };
};

export const changeLevelsCom = committees => {
  return () => {
    firebase
      .database()
      .ref(`/committees/`)
      .once("value", snapshot => {
        obj = snapshot.val();
        committees.forEach(function(item, index) {
          obj[item.committee.title].level = index;
        });
        firebase
          .database()
          .ref(`/committees/`)
          .update(obj);
      })
      .then(() => alert("Order Set!", "Successful"))
      .catch(error => alert("Order could not be set!", "Failure"));
  };
};
