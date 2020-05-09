/**
 * @description Goes through each elements and validates whether required elements have a value and if they are the correct form.
 *
 * @param {Object[]} elements       Array of all the elements that should be validated.
 * @param {Object} values           Object with the values of each element.
 * @param {Boolean=} shouldAlert    Optional boolean that determines if alerts should be displayed.
 */

export function validateElements(elements, values, shouldAlert = true) {
	let formIsValid = true;

	elements.forEach(element => {
		const elementFromState = values[element.camelCaseName];

		if (formIsValid && element.isRequired && elementFromState !== 0 && !elementFromState) {
			if (shouldAlert) alert(`Please input a value into the ${element.placeholder} field.`);
			formIsValid = false;
		}

		if (formIsValid && element.isValid && element.isValid(elementFromState)) {
			if (shouldAlert) alert(`${element.placeholder} should be in the shape ${element.validForm}`);
			formIsValid = false;
		}
	});

	return formIsValid;
}