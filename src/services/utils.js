import _ from 'lodash';

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

/**
 * Clones object recursively, omitting `invalid` keys.
 * Sets objects with a single null child to false.
 *
 * @param {Object}   obj      Object to be cloned
 * @param {string[]} invalid  Array of possible invalid keys inside `obj`
 */

export const cloneDeepWithout = (obj, invalid) => {
	const innerClone = deepObj => _.transform(deepObj, (accumulator, value, key) => {
		if (invalid.includes(key)) return;

		accumulator[key] = _.isObject(value)
			?	_.every(value, value => value === null) ? false : innerClone(value)
			: value;
	});

	return innerClone(obj);
};