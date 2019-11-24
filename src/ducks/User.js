import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { createActiontypes } from '../utils/actions';


// handle all things related to Users
const ACTIONS = createActiontypes([
    'FIRST_NAME_CHANGED', 
    'LAST_NAME_CHANGED',
    'EMAIL_CHANGED',
    'MAJOR_CHANGED',
    'COLLEGE_CHANGED',
    'POINTS_CHANGED',
    'PRIVILEGE_CHANGED',
    'GET_PRIVILEGE',
    'PICTURE_CHANGED',
    'PASSWORD_CHANGED',
    'CONFIRM_PASSWORD_CHANGED',
    'REGISTRATION_ERROR',
    'SHOW_FIREBASE_ERROR',
    'VERIFIED_USER',
    'LOGIN_USER',
    'ENTER_APP',
    'LOAD_USER',
    'LOGIN_USER_FAIL',
    'LOGOUT_USER',
    'CREATE_USER',
    'CREATE_USER_SUCCESS',
    'CREATE_USER_FAIL',
    'EDIT_USER',
    'CONTINENT_CHANGED',
    'NATIONALITY_CHANGED',
    'GENDER_CHANGED',
    'BIRTH_DATE_CHANGED',
    'GO_TO_RESET_PASSWORD',
    'GO_TO_LOGIN',
    'GO_TO_PROFILE',
    'GO_TO_REGISTRATION',
    'GO_TO_EDIT_PROFILE_FORM',
    'QUOTE_CHANGED',
    'PAGE_LOAD'
])

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    college: '',
    major: '',
    quote: '',
    paidMember: false,
    // Using URL below to avoid RN warning of empty source.uri as there's a delay fetching.
    // Will improve fetching later, just need to get rid of the warning for now.
    picture: 'https://cdn0.iconfinder.com/data/icons/superuser-web-kit/512/686909-user_people_man_human_head_person-512.png',
    points: 0,
    privilege: {},
    password: '',
    confirmPassword: '',
    continent: 'Do not wish to disclose',
    nationality: 'Do not wish to disclose',
    gender: 'Do not wish to disclose',
    birthday: '0000-00-00',
    user: null,
    loggedIn: null,
    loading: false,
    error: '',
    id: '',
    voted: false,
    applied: false,
};

export default (state = INITIAL_STATE, action) => {
    const {
        payload
    } = action;

    switch (action.type) {
        case ACTIONS.FIRST_NAME_CHANGED:
            return {
                ...state,
                firstName: payload
            };
        case ACTIONS.LAST_NAME_CHANGED:
            return {
                ...state,
                lastName: payload
            };
        case ACTIONS.EMAIL_CHANGED:
            return {
                ...state,
                email: payload
            };
        case ACTIONS.COLLEGE_CHANGED:
            return {
                ...state,
                college: payload
            };
        case ACTIONS.MAJOR_CHANGED:
            return {
                ...state,
                major: payload
            };
        case ACTIONS.PASSWORD_CHANGED:
            return {
                ...state,
                password: payload
            };
        case ACTIONS.POINTS_CHANGED:
            return {
                ...state,
                points: payload
            };
        case ACTIONS.PRIVILEGE_CHANGED:
            return {
                ...state,
                privilege: payload
            };
        case ACTIONS.PICTURE_CHANGED:
            return {
                ...state,
                picture: payload
            };
        case ACTIONS.CONFIRM_PASSWORD_CHANGED:
            return {
                ...state,
                confirmPassword: payload
            };
        case ACTIONS.QUOTE_CHANGED:
            return {
                ...state,
                quote: payload
            };
        case ACTIONS.CONTINENT_CHANGED:
            return {
                ...state,
                continent: payload
            };
        case ACTIONS.NATIONALITY_CHANGED:
            return {
                ...state,
                nationality: payload
            };
        case ACTIONS.GENDER_CHANGED:
            return {
                ...state,
                gender: payload
            };
        case ACTIONS.BIRTH_DATE_CHANGED:
            return {
                ...state,
                birthday: payload
            };
        case ACTIONS.REGISTRATION_ERROR:
            return {
                ...state,
                error: payload,
            };
        case ACTIONS.SHOW_FIREBASE_ERROR:
            return {
                ...state,
                error: payload,
            };
        case ACTIONS.CREATE_USER:
            return {
                ...state,
                loading: true,
                    error: ''
            };
        case ACTIONS.CREATE_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE,
            };
        case ACTIONS.CREATE_USER_FAIL:
            return {
                ...state,
                error: payload,
                    loading: false,
            };

        case ACTIONS.EDIT_USER:
            return {
                ...state,
                firstName: payload
            };

        case ACTIONS.GET_PRIVILEGE:
            return {
                ...state,
                privilege: payload
            };
        case ACTIONS.LOGIN_USER:
            return {
                ...state,
                loading: true,
                    error: ''
            };
        case ACTIONS.ENTER_APP:
            return {
                ...state,
                ...INITIAL_STATE,
                user: payload,
                    loggedIn: true,
            };
        case ACTIONS.LOAD_USER:
            return {
                ...state,
                firstName: payload.firstName,
                    lastName: payload.lastName,
                    college: payload.college,
                    email: payload.email,
                    major: payload.major,
                    quote: payload.quote,
                    paidMember: payload.paidMember,
                    continent: payload.continent,
                    nationality: payload.nationality,
                    gender: payload.gender,
                    birthday: payload.birthday,
                    points: payload.points,
                    picture: payload.picture,
                    voted: payload.voted,
                    applied: payload.applied,
                    id: payload.id,
                    loading: false
            };
        case ACTIONS.LOGIN_USER_FAIL:
            return {
                ...state,
                error: payload,
                    loading: false,
                    password: ''
            };
        case ACTIONS.LOGOUT_USER:
            return {
                ...state,
                ...INITIAL_STATE,
            };
        case ACTIONS.GO_TO_RESET_PASSWORD:
            return INITIAL_STATE;
        case ACTIONS.GO_TO_LOGIN:
            return INITIAL_STATE;
        case ACTIONS.GO_TO_PROFILE:
            return state;
        case ACTIONS.GO_TO_REGISTRATION:
            return INITIAL_STATE;
        case ACTIONS.GO_TO_EDIT_PROFILE_FORM:
            return state;
        default:
            return state;
    }
}

export const firstNameChanged = (text) => {
    return {
        type: ACTIONS.FIRST_NAME_CHANGED,
        payload: text
    };
};
export const lastNameChanged = (text) => {
    return {
        type: ACTIONS.LAST_NAME_CHANGED,
        payload: text
    };
};
export const emailChanged = (text) => {
    return {
        type: ACTIONS.EMAIL_CHANGED,
        payload: text
    };
};
export const collegeChanged = (text) => {
    return {
        type: ACTIONS.COLLEGE_CHANGED,
        payload: text
    };
};
export const majorChanged = (text) => {
    return {
        type: ACTIONS.MAJOR_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: ACTIONS.PASSWORD_CHANGED,
        payload: text
    };
};
export const pointsChanged = (text) => {
    return {
        type: ACTIONS.POINTS_CHANGED,
        payload: text
    };
};
export const birthDateChanged = (text) => {
    return {
        type: ACTIONS.BIRTH_DATE_CHANGED,
        payload: text
    };
}
export const continentChanged = (text) => {
    return {
        type: ACTIONS.CONTINENT_CHANGED,
        payload: text
    };
}
export const nationalityChanged = (text) => {
    return {
        type: ACTIONS.NATIONALITY_CHANGED,
        payload: text
    };
}
export const genderChanged = (text) => {
    return {
        type: ACTIONS.GENDER_CHANGED,
        payload: text
    };
}
export const privilegeChanged = (text) => {
    return {
        type: ACTIONS.PRIVILEGE_CHANGED,
        payload: text
    };
};
export const pictureChanged = (text) => {
    const {
        currentUser
    } = firebase.auth();

    let id = currentUser.uid

    firebase.database().ref(`/users/${id}/`).update({
        picture: text
    })
    return {
        type: ACTIONS.PICTURE_CHANGED,
        payload: text
    };
};

export const confirmPasswordChanged = (text) => {
    return {
        type: ACTIONS.CONFIRM_PASSWORD_CHANGED,
        payload: text
    };
};

export const quoteChanged = (text) => {
    return {
        type: ACTIONS.QUOTE_CHANGED,
        payload: text
    };
};

export const registrationError = (error) => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.REGISTRATION_ERROR,
            payload: error
        });
    }
};

const showFirebaseError = (dispatch, error) => {
    let errorMessage;

    switch (error.code) {
        case 'auth/user-not-found':
            errorMessage = 'There is no user record corresponding to this identifier';
            break;
        case 'auth/invalid-email':
            errorMessage = 'Enter a valid email';
            break;
        case 'auth/wrong-password':
            errorMessage = 'Incorrect credentials';
            break;
        default:
            errorMessage = error.message;
    }

    dispatch({
        type: ACTIONS.SHOW_FIREBASE_ERROR,
        payload: errorMessage
    });
};

// Registration Actions
export const createUser = (firstName, lastName, email, college, major, points, picture, password, quote, continent, nationality, gender, birthday) => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.CREATE_USER
        });

        firebase.auth().createUserWithEmailAndPassword(email, password)
           // .then(() => firebase.auth().signInWithEmailAndPassword(email, password))
            .then((user) => createUserSuccess(dispatch, firstName, lastName, email, college, major, points, picture, quote, continent, nationality, gender, birthday))
            .catch((error) => createUserFail(dispatch, error))
    };
};

const createUserFail = (dispatch, error) => {
    firebase.auth().signOut();
    let errorMessage;
    switch (error.code) {
        case 'auth/user-not-found':
            errorMessage = 'There is no user record corresponding to this identifier';
            break;
        case 'auth/invalid-email':
            errorMessage = 'Enter a valid email';
            break;
        case 'auth/wrong-password':
            errorMessage = 'Incorrect credentials';
            break;
        default:
            errorMessage = error.message;
    }

    dispatch({
        type: ACTIONS.CREATE_USER_FAIL,
        payload: errorMessage
    });
};

const createUserSuccess = (dispatch, firstName, lastName, email, college, major, points, picture, quote, continent, nationality, gender, birthday) => {
    const {
        currentUser
    } = firebase.auth();

    let id = currentUser.uid

    firebase.database().ref(`/users/${id}/`).set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            college: college,
            major: major,
            points: points,
            picture: picture,
            quote: quote,
            continent: continent,
            nationality: nationality,
            gender: gender,
            birthday: birthday,
            id: id,
            paidMember: false,
            voted: false,
            applied: false
        })
        .then(() => {firebase.database().ref(`/points/${id}/`).set({
            firstName: firstName,
            lastName: lastName,
            points: points,
            id: id
        })})
        .then(() => {firebase.database().ref(`/privileges/${id}/`).set({
            firstName: firstName,
            lastName: lastName,
            user: true,
            board: false,
            eboard: false,
            president: false,
            id: id,
            paidMember: false
        })})
        .then(() => {
            currentUser.sendEmailVerification()
            alert(`We sent a verification to: ${email}. Please open your email and verify your account`)
        })
        .then(() => firebase.auth().signOut())
        .catch((error) => alert(error))
        

    dispatch({
        type: ACTIONS.CREATE_USER_SUCCESS,
    });
};

const makePrivileges = (firstName, lastName, id) => {

            firebase.database().ref(`/privileges/${id}/`).set({
            firstName: firstName,
            lastName: lastName,
            user: true,
            board: false,
            eboard: false,
            president: false,
            id: id,
            paidMember: false
        })
};

export const editUser = (firstName, lastName, email, college, major, quote, continent, nationality, gender, birthday) => {

    const {
        currentUser
    } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/`).update({
            firstName: firstName,
            lastName: lastName,
            email: email,
            college: college,
            major: major,
            quote: quote,
            continent: continent,
            nationality: nationality,
            gender: gender,
            birthday: birthday,
        })
        .then(() => firebase.database().ref(`/points/${currentUser.uid}/`).update({
            firstName: firstName,
            lastName: lastName,
        }))
        .then(() => firebase.database().ref(`/privileges/${currentUser.uid}/`).update({
            firstName: firstName,
            lastName: lastName,
        }))
        .then(() => Alert.alert('Account Updated'))

};

export const getPrivilege = () => {
    const {
        currentUser
    } = firebase.auth();

    return (dispatch) => {
        if (currentUser != null) {
            firebase.database().ref(`/privileges/${currentUser.uid}/`)
                .on('value', snapshot => {
                    dispatch({
                        type: ACTIONS.GET_PRIVILEGE,
                        payload: snapshot.val(),
                    })
                })
        };
    };
}





// Login Actions
const isVerifiedUser = ({
    email,
    password
}) => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.VERIFIED_USER
        });
    }
}

export const resetPassword = ({
    email
}) => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.RESET_PASSWORD
        });

        firebase.auth().sendPasswordResetEmail(email)
            .then(() => Alert.alert('Reset Started',
                `If an account with email ${email} exists, a reset password email will be sent. Please check your email.`))
            .then(() => Actions.login())
            .catch(error => showFirebaseError(dispatch, error));
    };
}

export const loginUser = ({email,password}) => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.LOGIN_USER
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                if (!firebase.auth().currentUser.emailVerified) {
                    alert('Account must be verified!\nPlease check your email for verification email')
                    return Promise.reject({
                        error: 'Email not Verified'
                    })
                }
            })
            .then(user => loginUserSuccess(dispatch, user))
            .catch(error => loginUserFail(dispatch, error));
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: ACTIONS.ENTER_APP,
        payload: user
    });
};

export const loadUser = (userID) => {
    const {
        currentUser
    } = firebase.auth();
    var id = (typeof userID === "undefined") ? currentUser.uid : userID;
    return (dispatch) => {
        if (currentUser != null) {
            firebase.database().ref(`/users/${id}/`).on('value', snapshot => {
                dispatch({
                    type: ACTIONS.LOAD_USER,
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

export const loginUserFail = (dispatch, error) => {
    let errorMessage;

    switch (error.code) {
        case 'auth/user-not-found':
            errorMessage = 'There is no user record corresponding to this identifier';
            break;
        case 'auth/invalid-email':
            errorMessage = 'Enter a valid email';
            break;
        case 'auth/wrong-password':
            errorMessage = 'Incorrect credentials';
            break;
        case 'auth/network-request-failed':
            errorMessage = 'Network error. Check your Internet connectivity.';
            break;
        default:
            errorMessage = error.message;
    }

    dispatch({
        type: ACTIONS.LOGIN_USER_FAIL,
        payload: errorMessage
    });
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.LOGOUT_USER
        });

        firebase.auth().signOut()
            .then(Actions.login())
            .then(Alert.alert('Signed Out', 'Have a great day!'));
    };
};

export const goToResetPassword = () => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.GO_TO_RESET_PASSWORD
        });
        Actions.resetPassword();
    }
};
export const goToLogIn = () => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.GO_TO_LOGIN
        });
        Actions.login();
    }
};

export const goToProfile = () => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.GO_TO_PROFILE
        });
        Actions.profile();
    }
};

export const goToRegistration = () => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.GO_TO_REGISTRATION
        });
        Actions.registration();

    }
};

export const goToEditProfileForm = () => {
    Actions.EditProfileForm();
    return (dispatch) => {
        dispatch({
            type: ACTIONS.GO_TO_EDIT_PROFILE_FORM
        });
    }
};
