/**
 * Updates error state in calling component.
 *
 * @param {Object} error
 * @param {string} error.code     Firebase error code.
 * @param {string} error.message  Firebase error message.
 */

export const showFirebaseError = ({ code, message }) => {
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
};