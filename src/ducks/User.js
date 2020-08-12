import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import { createActionTypes } from "../utils/actions";
import { Alert } from "../components";
import Lodash from "lodash";

const ACTIONS = createActionTypes([
	"SHOW_FIREBASE_ERROR",
	"VERIFIED_USER",
	"LOGIN_USER",
	"LOGOUT_USER",
	"LOAD_USER_AND_PRIVILEGE"
]);

const INITIAL_STATE = {
	activeUser: {
		firstName: "",
		color: "#21252b",
		flag: "",
		lastName: "",
		email: "",
		major: "Do not wish to disclose",
		picture: "",
		points: 0,
		privilege: {},
		country: "Do not wish to disclose",
		gender: "Do not wish to disclose",
		birthday: "0000-00-00",
		paidMember: false,
		id: "",
		voted: false,
		applied: false,
		userCommittees: {}
	},
	error: "",
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	const { payload } = action;

	switch (action.type) {
		case ACTIONS.SHOW_FIREBASE_ERROR:
			return {
				...state,
				error: payload
			};
		case ACTIONS.LOGIN_USER:
			return {
				...state,
				loading: true
			};
		case ACTIONS.LOGOUT_USER:
			return {
				...state,
				...INITIAL_STATE
			};
		case ACTIONS.LOAD_USER_AND_PRIVILEGE:
			return {
				...state,
				activeUser: payload
			};
		default:
			return state;
	}
};

/* Redux Action Creators */

/**
 * Changes the error on the reducer. This information should later be read
 * and displayed in some way to the user.
 *
 * @access     private
 * @param {String}   error An Error Message
 */

const showFirebaseError = (dispatch, error) => {
	let errorMessage;

	switch (error.code) {
		case "auth/user-not-found":
			errorMessage = "There is no user record corresponding to this identifier";
			break;
		case "auth/invalid-email":
			errorMessage = "Enter a valid email";
			break;
		case "auth/wrong-password":
			errorMessage = "Incorrect credentials";
			break;
		default:
			errorMessage = error.message;
	}

	dispatch({
		type: ACTIONS.SHOW_FIREBASE_ERROR,
		payload: errorMessage
	});
};

/**
 * Creates a user on Firebase using their knights email as the username with their
 * desired password. Then if succeeded it calls createUserSuccess().
 *
 * Needs to be passed through mapDispatchToProps to ensure error functionality works
 *
 * @access     public
 * @param {Object}   user a user object with all desired user properties
 * @param {String}   email a student knights email
 * @param {String}   password a password that meets the requirements
 */

export const createUser = user => {
	return (dispatch) => {
		firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
			.then(({ user: { uid } }) => createUserSuccess({ ...Lodash.omit(user, "password"), uid }))
			.catch((error) => showFirebaseError(dispatch, error));
	};
};

/**
 * Creates a user on Firebase Database with the desired fields. Then displays
 * an alert to the user letting them know to check their email.
 *
 *
 * @access     private
 * @param {Object}   user a user object with all desired user properties
 */

const createUserSuccess = (user) => {
	const {
		currentUser
	} = firebase.auth();

	firebase.database().ref(`/users/${currentUser.uid}/`)
		.set({ ...INITIAL_STATE.activeUser, ...user, id: currentUser.uid })
		.then(() => {
			firebase.database().ref(`/points/${currentUser.uid}/`).set({
				firstName: user.firstName,
				lastName: user.lastName,
				points: 0,
				id: currentUser.uid
			});
		})
		.then(() => {
			firebase.database().ref(`/privileges/${currentUser.uid}/`).set({
				firstName: user.firstName,
				lastName: user.lastName,
				user: true,
				board: false,
				eboard: false,
				president: false,
				id: currentUser.uid,
				paidMember: false
			});
		})
		.then(() => {
			currentUser.sendEmailVerification()
				.catch(() => Alert.alert("We were not able to send an email."
					+ " Please contact the Tech Director for assistance"))
				.then(() => Alert.alert(`We sent a verification to: ${user.email}.
					Please open your email and verify your account`));
		})
		.then(() => firebase.auth().signOut())
		.catch((error) => Alert.alert(error, { type: "error" }));
};

/**
 * Sends a request to firebase to reset the password using the email. Then displays an alert
 * to the user that an email to reset their password was sent to them.
 *
 * Needs to be passed through mapDispatchToProps to ensure error functionality works
 *
 * @access     public
 * @param {String}   email a student knights email
 */

export const resetPassword = (email) => {
	return (dispatch) => {
		firebase.auth().sendPasswordResetEmail(email)
			.then(() => Alert.alert(`Reset Started.\n\
				If an account with email ${email} exists, a reset password email will be sent. \
				Please check your email.`))
			.then(() => Actions.login())
			.catch(error => showFirebaseError(dispatch, error));
	};
};

/**
 * Sends a request to firebase to login to the account.
 *
 * If the user is not verified then they will be alerted to check their email.
 *
 * @access     public
 * @param {String}   email a student knights email
 * @param {String}   password the user's password
 */

export const loginUser = (email, password) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(email, password)
				.then(() => {
					if (!firebase.auth().currentUser.emailVerified) {
						Alert.alert("Account must be verified!\nPlease check your email for verification email");
						reject();
					}
					else {
						resolve();
					}
				})
				.catch(error => {
					showFirebaseError(dispatch, error);
					reject();
				});
		});
	};
};

/**
 * Sends a GET request to firebase to load some user's information.
 *
 * This can load the logged in user or if a userID is passed in then it will load
 * that user instead.
 *
 * Needs to be passed through mapDispatchToProps
 *
 * @access     public
 * @param {String}   userID OPTIONAL- the desired user's userID
 */

export const loadUser = (userID) => {
	const {
		currentUser
	} = firebase.auth();

	const id = typeof userID === "undefined" ? currentUser.uid : userID;

	return (dispatch) => {
		if (currentUser) {
			firebase.database().ref(`/users/${id}/`).on("value", userSnapshot => {
				const user = userSnapshot.val();

				firebase.database().ref(`/privileges/${id}/`).on("value", privilegeSnapshot => {
					const userWithPrivilege = {
						...user,
						privilege: privilegeSnapshot.val()
					};

					dispatch({
						type: ACTIONS.LOAD_USER_AND_PRIVILEGE,
						payload: userWithPrivilege
					});
				});
			});
		}
	};
};

/* FireBase Functions that don't use Redux */

/**
 * Sends an UPDATE request and updates the user on the database.
 *
 * To use you can send all fields of a user that you would like to change.
 * omitting fields does not break the code.
 *
 * ***DO NOT PASS IN THROUGH mapDispatchToProps***
 *
 * @access     public
 * @param {Object}   user        User is an object that can store any subset of props that you would want to edit.
 *
 * **Things you can not edit using this function:**
 * ["firstName", "lastName", "points", "voted", "privileges", "paidMember"]
 * @example
 * user = {
 * 	nationality: "Cuban",
 * 	gender: "Male"
 * }
 *
 * user = {
 * 	picture: "someUrl.jpg"
 * }
 *
 */

export const editUser = (user) => {
	const {
		currentUser
	} = firebase.auth();

	const invalidProperties = ["firstName", "lastName", "points", "voted", "privileges", "paidMember"];

	invalidProperties.forEach(prop => {
		if (prop in user) console.error(`Please do not try to edit ${prop}!`);
	});

	firebase.database().ref(`/users/${currentUser.uid}/`).update(user)
		.catch(error => Alert.alert(error, { type: "error" }));
};

/**
 * Sends an signOut request to firebase
 *
 * ***DO NOT PASS IN THROUGH mapDispatchToProps***
 */

export const logoutUser = () => {
	firebase.auth().signOut()
		.then(Actions.login())
		.then(Alert.alert("Signed Out", { title: "Have a great day!", type: "success" }));
};