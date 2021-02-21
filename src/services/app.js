import firebase from 'firebase';
import { Alert } from '@/components';
import { showFirebaseError } from './utils';

/**
 * Sends a request to firebase to login to the account.
 * If the user is not verified then they will be alerted to check their email.
 *
 * @param {string} email     User's knights email.
 * @param {string} password  User's password.
 *
 * @returns {Promise<string>} Authentication error.
 */

export const loginUser = (email, password) => new Promise((_, reject) =>
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => {
			if (!firebase.auth().currentUser.emailVerified)
				Alert.alert('Account must be verified!\nPlease check your email for the verification email');
		})
		.catch(error => reject(showFirebaseError(error)))
);

/**
 * Sends an signOut request to firebase.
 */

export const logoutUser = () => {
	firebase.auth().signOut()
		.then(Alert.alert('Signed Out', { title: 'Have a great day!', type: 'success' }));
};