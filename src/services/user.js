import firebase from 'firebase';
import _ from 'lodash';
import { Alert } from '@/components';

/**
 * Sends a GET request to firebase to load the current user's information.
 */

export const loadCurrentUser = () => new Promise(resolve => {
	const { currentUser } = firebase.auth();

	firebase.database().ref(`/users/${currentUser.uid}/`).on('value', userSnapshot => {
		firebase.database().ref(`/privileges/${currentUser.uid}/`).on('value', privilegeSnapshot => {
			resolve({ ...userSnapshot.val(), privilege: privilegeSnapshot.val() });
		});
	});
});

/**
 * @typedef {Object} User
 * @prop {string}  id              User's ID assigned by Firebase
 * @prop {string}  firstName       User's first name
 * @prop {string}  lastName        User's last name
 * @prop {string}  email           User's knights email
 * @prop {string}  flag            User's flag of preference
 * @prop {string}  color           User's color of preference
 * @prop {string}  picture         User's profile picture
 * @prop {number}  points          Total points for current semester
 * @prop {Object}  privilege       User privilege (user, board, e-board)
 * @prop {Object}  userCommittees  Committee(s) user belongs to
 * @prop {string}  major           User's major
 * @prop {string}  country         User's country of origin
 * @prop {string}  gender          User's gender
 * @prop {string}  birthday        User's birthday
 * @prop {boolean} paidMember      Paid member status for current year
 * @prop {boolean} applied         Applied status for current election
 * @prop {boolean} voted           Voted status for current election
 */

/**
 * Creates a user on Firebase using their knights email as the username with their
 * desired password. If it succeeds, it calls createUserSuccess.
 *
 * @param {Pick<User, 'firstName' | 'lastName' | 'email' | 'password' |
 *                    'gender' | 'major' | 'country' | 'birthday'}       user      User object
 * @param {Function?}                                                    setError  Callback to update error state on calling component.
 */

export const createUser = (user, setError) => {
	firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
		.then(({ user: { uid } }) => createUserSuccess({ ..._.omit(user, 'password'), id: uid }))
		.catch(error => showFirebaseError(error, setError));
};

/**
 * Creates a user on Firebase database with the desired fields. Then displays
 * an alert to the user letting them know to check their email.
 *
 * @param {Object} user User object
 */

const createUserSuccess = user => {
	const { firstName, lastName, email, id } = user;
	const USER_STATUS = {
		gender: 'Do not wish to disclose',
		major: 'Do not wish to disclose',
		country: 'Do not wish to disclose',
		birthday: '0000-00-00',
		points: 0,
		privilege: {},
		userCommittees: {}
	};

	firebase.database().ref(`/users/${id}/`).set({ ...USER_STATUS, ...user })
		.then(() => firebase.database().ref(`/points/${id}/`).set({ firstName, lastName, id, points: 0 }))
		.then(() => firebase.database().ref(`/privileges/${id}/`).set({ firstName, lastName, id, user: true }))
		.then(() => firebase.auth().currentUser.sendEmailVerification()
			.then(() => Alert.alert(`We sent a verification to: ${email}. Please open your email and verify your account`))
			.catch(() => Alert.alert('We were not able to send an email. Please contact the Tech Director for assistance'))
		)
		.then(() => firebase.auth().signOut())
		.catch(error => Alert.alert(error, { type: 'error' }));
};

/**
 * Sends an UPDATE request and updates the user on the database.
 *
 * @param {Omit<User, 'firstName' | 'lastName' | 'points' | 'voted' | 'privileges' | 'paidMember'>} user User object
 */

export const editUser = user => {
	const invalid = ['firstName', 'lastName', 'points', 'voted', 'privileges', 'paidMember'];

	firebase.database().ref(`/users/${user.id}/`).update(_.pickBy(user, value => value && !invalid.includes(value)))
		.then(() => Alert.alert('Profile edited!', { type: 'success' }))
		.catch(error => Alert.alert(error.message, { type: 'error' }));
};

/**
 * Sends a request to firebase to reset the password using the email. Then displays an alert
 * to the user that an email to reset their password was sent to them.
 *
 * @param {string}    email     User's knights email
 * @param {Function?} setError  Callback to update error state on calling component.
 */

export const resetPassword = async (email, setError) => (
	firebase.auth().sendPasswordResetEmail(email)
		.then(() => Alert.alert(`If an account with email ${email} exists, \
a reset password email will be sent. Please check your email.`)
		)
		.catch(error => showFirebaseError(error, setError))
);

/**
 * Sends a request to firebase to login to the account.
 * If the user is not verified then they will be alerted to check their email.
 *
 * @param {string}    email     User's knights email
 * @param {string}    password  User's password
 * @param {Function?} setError  Callback to update error state on calling component.
 */

export const loginUser = (email, password, setError) => {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => {
			if (!firebase.auth().currentUser.emailVerified)
				Alert.alert('Account must be verified!\nPlease check your email for the verification email');
		})
		.catch(error => showFirebaseError(error, setError));
};

/**
 * Sends an signOut request to firebase.
 */

export const logoutUser = () => {
	firebase.auth().signOut()
		.then(Alert.alert('Signed Out', { title: 'Have a great day!', type: 'success' }));
};

/**
 * Updates error state in calling component.
 *
 * @param {Object}    error
 * @param {string}    error.code     Firebase error code
 * @param {string}    error.message  Firebase error message
 * @param {Function?} setError       Function to update error state
 */

const showFirebaseError = ({ code, message }, setError) => {
	setError && setError((() => {
		switch (code) {
			case 'auth/user-not-found':
				return 'There is no user record corresponding to this identifier';
			case 'auth/invalid-email':
				return 'Enter a valid email';
			case 'auth/wrong-password':
				return 'Incorrect credentials';
			default:
				return message;
		}
	})());

	return code;
};