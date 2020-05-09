/**
 * @description Makes a copy of all the keys of a state, but changes all the values to null.
 *
 * @param {Object} state The state that you want to copy.
 */
export function copyStateAndSetValuesToNull(state) {
	let newStateValue = {};
	for (let name in state) newStateValue[name] = null;
	return newStateValue;
}