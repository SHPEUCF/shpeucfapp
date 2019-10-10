import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { createActiontypes } from '../utils/actions';


// handle all things related to Events
const ACTIONS = createActiontypes([
  'FIRST_NAME_CHANGED_MEMBER',
  'LAST_NAME_CHANGED_MEMBER',
  'EMAIL_CHANGED_MEMBER',
  'COLLEGE_CHANGED_MEMBER',
  'MAJOR_CHANGED_MEMBER',
  'POINTS_CHANGED_MEMBER',
  'PRIVILEGE_CHANGED_MEMBER',
  'PICTURE_CHANGED_MEMBER',
  'PASSWORD_CHANGED_MEMBER',
  'CONFIRM_PASSWORD_CHANGED_MEMBER',
  'FETCH_MEMBERS_POINTS',
  'FETCH_MEMBER_PROFILE',
  'QUOTE_CHANGED_MEMBER',
  'EDIT_MEMBER',
  'GO_TO_OTHER_PROFILE',
  'GO_TO_EDIT_OTHER_PROFILE_FORM',
  'FETCH_FILTERS',
  'ASSIGN_POSITION',
  'FETCH_ALL_USERS',
  'NATIONALITY_CHANGED_MEMBER',
  'DATE_BIRTH_CHANGED_MEMBER',
  'ASSIGN_POSITION',
  'PAGE_LOAD'
]);


const INITIAL_STATE = {
  membersPoints: [],
  firstName: '',
  lastName: '',
  email: '',
  college: '',
  major: '',
  quote: '',
  // Using URL below to avoid RN warning of empty source.uri as there's a delay fetching.
  // Will improve fetching later, just need to get rid of the warning for now.
  picture: 'https://cdn0.iconfinder.com/data/icons/superuser-web-kit/512/686909-user_people_man_human_head_person-512.png',
  points: 0,
  privilege: {},
  password: '',
  confirmPassword: '',
  nationality: '',
  date_of_birth: '',
  user: null,
  loggedIn: null,
  loading: false,
  error: '',
  id: '',
  filters: {},
  userList: {}
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case ACTIONS.FIRST_NAME_CHANGED_MEMBER:
      return { ...state,
        firstName: payload
      };
    case ACTIONS.LAST_NAME_CHANGED_MEMBER:
      return { ...state,
        lastName: payload
      };
    case ACTIONS.EMAIL_CHANGED_MEMBER:
      return { ...state,
        email: payload
      };
    case ACTIONS.COLLEGE_CHANGED_MEMBER:
      return { ...state,
        college: payload
      };
    case ACTIONS.MAJOR_CHANGED_MEMBER:
      return { ...state,
        major: payload
      };
    case ACTIONS.PASSWORD_CHANGED_MEMBER:
      return { ...state,
        password: payload
      };
    case ACTIONS.POINTS_CHANGED_MEMBER:
      return { ...state,
        points: payload
      };
    case ACTIONS.PRIVILEGE_CHANGED_MEMBER:
      return { ...state,
        privilege: payload
      };
    case ACTIONS.PICTURE_CHANGED_MEMBER:
      return { ...state,
        picture: payload
      };
      case ACTIONS.NATIONALITY_CHANGED_MEMBER:
      return { ...state,
        nationality: payload
      };
      case ACTIONS.DATE_BIRTH_CHANGED_MEMBER:
      return { ...state,
        date_of_birth: payload
      };
    case ACTIONS.CONFIRM_PASSWORD_CHANGED_MEMBER:
      return { ...state,
        confirmPassword: payload
      };
    case ACTIONS.QUOTE_CHANGED_MEMBER:
      return { ...state,
        quote: payload
     };
    case ACTIONS.FETCH_MEMBERS_POINTS:
      return { ...state,
        membersPoints: payload,
      }
    case ACTIONS.FETCH_FILTERS:
      return { ...state,
        filters: payload,
      }
    default:
      return state;
    case ACTIONS.FETCH_MEMBER_PROFILE:
      return { ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        college: payload.college,
        email: payload.email,
        major: payload.major,
        quote: payload.quote,
        points: payload.points,
        picture: payload.picture,
        nationality: payload.nationality,
        date_of_birth: payload.date_of_birth,
        privilege: payload.privilege,
      };
    case ACTIONS.FETCH_ALL_USERS:
      return { ...state,
        userList: payload
      }
    case ACTIONS.EDIT_MEMBER:
      return state;
    case ACTIONS.ASSIGN_POSITION:
      return state;
    case ACTIONS.GO_TO_OTHER_PROFILE:
      return state;
    case ACTIONS.GO_TO_EDIT_OTHER_PROFILE_FORM:
      return state;
  }
};

export const firstNameChangedMember = (text) => {
    return {
        type: ACTIONS.FIRST_NAME_CHANGED_MEMBER,
        payload: text
    };
};
export const lastNameChangedMember = (text) => {
    return {
        type: ACTIONS.LAST_NAME_CHANGED_MEMBER,
        payload: text
    };
};
export const emailChangedMember = (text) => {
    return {
        type: ACTIONS.EMAIL_CHANGED_MEMBER,
        payload: text
    };
};
export const collegeChangedMember = (text) => {
    return {
        type: ACTIONS.COLLEGE_CHANGED_MEMBER,
        payload: text
    };
};
export const majorChangedMember = (text) => {
    return {
        type: ACTIONS.MAJOR_CHANGED_MEMBER,
        payload: text
    };
};

export const passwordChangedMember = (text) => {
    return {
        type: ACTIONS.PASSWORD_CHANGED_MEMBER,
        payload: text
    };
};
export const pointsChangedMember = (text) => {
    return {
        type: ACTIONS.POINTS_CHANGED_MEMBER,
        payload: text
    };
};
export const privilegeChangedMember = (text) => {
    return {
        type: ACTIONS.PRIVILEGE_CHANGED_MEMBER,
        payload: text
    };
};
export const pictureChangedMember = (text) => {
    return {
        type: ACTIONS.PICTURE_CHANGED_MEMBER,
        payload: text
    };
};
export const nationalitychangedMember = (text) => {
    return {
        type: ACTIONS.NATIONALITY_CHANGED_MEMBER,
        payload: text
    };
};
export const datebirthchangedMember = (text) => {
    return {
        type: ACTIONS.DATE_BIRTH_CHANGED_MEMBER,
        payload: text
    };
};
export const fetchFilters = (text) => {
    return {
        type: ACTIONS.FETCH_FILTERS,
        payload: text
    };
};

export const confirmPasswordChangedMember = (text) => {
    return {
        type: ACTIONS.CONFIRM_PASSWORD_CHANGED_MEMBER,
        payload: text
    };
};

export const quoteChangedMember = (text) => {
    return {
        type: ACTIONS.QUOTE_CHANGED_MEMBER,
        payload: text
    };
};


export const fetchMembersPoints = () => {

    return (dispatch) => {
        firebase.database().ref(`/points`)
            .on('value', snapshot => {
                const membersPoints = (snapshot.val());

                dispatch({
                    type: ACTIONS.FETCH_MEMBERS_POINTS,
                    payload: membersPoints,
                });
            });
    };
};

export const fetchMemberProfile = (userID) => {
    const {
        currentUser
    } = firebase.auth();
    var id = (typeof userID === "undefined") ? currentUser.uid : userID;
    return (dispatch) => {
        if (currentUser != null) {
            firebase.database().ref(`/users/${id}/`).on('value', snapshot => {
                dispatch({
                    type: ACTIONS.FETCH_MEMBER_PROFILE,
                    payload: snapshot.val()
                });
                dispatch({
                    type: ACTIONS.PAGE_LOAD,
                    payload: false
                });

            })
        }
    };
};

export const editMember = (firstNameU, lastNameU, emailU, collegeU, majorU, pointsU, quoteU, idU, nationalityU, date_birthU) => {
    return (dispatch) => {

        firebase.database().ref(`/users/${idU}/`).update({
                firstName: firstNameU,
                lastName: lastNameU,
                email: emailU,
                college: collegeU,
                major: majorU,
                points: pointsU,
                quote: quoteU,
                nationality: nationalityU,
                date_of_birth: date_birthU
            })
            .then(() => firebase.database().ref(`/points/${idU}/`).update({
                firstName: firstNameU,
                lastName: lastNameU,
                points: pointsU,
            }))
            .then(() => firebase.database().ref(`/privileges/${idU}/`).update({
                firstName: firstNameU,
                lastName: lastNameU,
                user: true,
                board: false,
                eboard: false,
                president: false
            }))
            .then(() => Alert.alert('Account Updated'));

        dispatch({
            type: ACTIONS.EDIT_MEMBER,
        });
    }
};

export const assignPosition = (title, types, id, oldChair) => {

  return (dispatch) => {

    if (oldChair){
    firebase.database().ref(`/users/${oldChair.id}/${types}`).remove()
    .then(() => firebase.database().ref(`/privileges/${oldChair.id}/`).update({
      [types]: false,
    }))
    }

    firebase.database().ref(`/users/${id}/`).update({
    [types]: title,
    })
    .then(() => firebase.database().ref(`/privileges/${id}/`).update({
      [types]: true,
    }))

    dispatch({
      type: ACTIONS.ASSIGN_POSITION,
    });
};
}

export const fetchAllUsers = () => {
    return (dispatch) => {
        firebase.database().ref(`/users/`).on('value', snapshot => {
                dispatch({
                    type: ACTIONS.FETCH_ALL_USERS,
                    payload: snapshot.val()
                })
            })
    }
}

export const goToOtherProfile = () => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.GO_TO_OTHER_PROFILE
        });
        Actions.OtherProfile();
    }
};

export const goToEditOtherProfileForm = () => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.GO_TO_EDIT_OTHER_PROFILE_FORM
        });
        Actions.EditOtherProfileForm();
    }
};
