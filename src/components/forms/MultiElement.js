import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form } from "./Form";
import { validateElements } from "../../utils/form";
import _ from "lodash";
import { copyStateAndSetValuesToNull } from "../../utils/general";

/**
 *Types
 * @typedef {Object} Element:
 *		@property {String}                   placeholder               PlaceHolder that will be shown inside of each element.
 *		@property {String}                   camelCaseName             Unique name in camelCase format.
 *		@property {String}                   type                      Type of element.
 *		@property {boolean=}                 isRequired                Optional field to determine if element should be required.
 *		@property {Options=}                 options                   Optional fields for element-specific functionality.
 *		@property {ConditionalValue=}        conditionalValues         An object containing ConditionalValue target objects.
 * @typedef {Object} ConditionalValue:
 *		@property {String}                   name                      camelCaseName of the element that is being affected.
 *		@property {Function}                 value                     Function that returns the value that the affected element will be set to.
 * @typedef {Object} Options:
 *	 	@property {Function}                 showIfParentValueEquals   Function that checks the parent value and returns whether the element should be shown.
 *	 	@property {String}                   parent                    camelCaseName of the parent element.
 *		@property {Function=}                childData                 Optional function that checks the parent value and returns the data of the child.
 */

/**
 * Form Component Info
 * ________________________________________________________________
 *	Props:
 *		@param {Element[]}         elements            An array of the names of Elements.
 *		@param {any=}              value               An object of initial state values.
 *		@param {Function}          onSelect            Updates parent form whenever a value is changed.
 *
 *	Output:
 *
 * 		<object>:
 *			name1<string>: value<any>
 *			name2<string>: value<any>
 *			...
 *			nameN<string>: value<any>
 * ________________________________________________________________
 * @description Form element that wraps several other form elements
 * together into a form of their own and mangaes their data in a
 * consecutive manner
 * ________________________________________________________________
 */

/**
 *
 *
 * ideas
 *
 * initial values should be an object. This multiElement might require a format and unformat in the options
 *
 * Maybe Make a state that handles the visibility This needs to be configurable as to when to make what visible
 *
 * Make a state that determines the value of the next componenent, this needs to be configurable
 *
 * return only when all inputs are valid
 *
 *
 * format is how you combine the values of the multiElement to return them.
 * revert is how you divide the values that were formatted to set the initial values if necessary.
 *
 */

class MultiElement extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		const { value, formatValue } = this.props;

		if (value) {
			if (formatValue) {
				const newState = formatValue.revert(value);

				this.childForm.setState(newState);
				this.setState(newState);
			}
			else {
				this.childForm.setState(value);
			}
		}
	}

	static propTypes = {
		elements: PropTypes.arrayOf(
			PropTypes.shape(
				{
					placeholder: PropTypes.string.isRequired,
					camelCaseName: PropTypes.string.isRequired,
					type: PropTypes.string.isRequired,
					isRequired: PropTypes.bool,
					options: PropTypes.any
				}
			)
		).isRequired,
		onSelect: PropTypes.func.isRequired,
		formatValue: PropTypes.shape({
			format: PropTypes.func,
			revert: PropTypes.func.isRequired
		}),
		initialValue: PropTypes.any,
		value: PropTypes.any
	}

	componentDidUpdate(prevProps) {
		const { formatValue } = this.props;

		if (formatValue && formatValue.revert) {
			let newValue = {};
			let oldValue = {};

			if (this.props.value) newValue = formatValue.revert(this.props.value);
			if (prevProps.value) oldValue = formatValue.revert(prevProps.value);

			if (!_.isEqual(newValue, oldValue)) this.updateState(newValue);
		}
		else if (!_.isEqual(this.props.value, prevProps.value)) {
			this.updateState(this.props.value);
		}
	}

	/**
	 * @description Creates a formatted array based off the elements passed in and the state.
	 *
	 * @returns {Object[]} Shape is: [{ element, value }, ..., { element, value }].
	 */

	formatElementsToSubmit = (elements, state, stateIsNull = false) => elements.map((element, index) => {
		let value = null;

		if (!stateIsNull && index === 0 && element.options && element.options.formatValue)
			value = element.options.formatValue.format(state);

		if (!value && state[element.camelCaseName])
			value = state[element.camelCaseName];

		return { element, value };
	});

	/**
	 * @description Verifies if all required fields have been selected.
	 *
	 * If all required fields have been filled in then it calls onSelect and passes the values in the format { element, value}.
	 *
	 * @param {Object} state the updated state.
	 */

	verifyAndSubmit(state) {
		const visibleElements = this.findVisibleElements(state);
		let formIsValid = validateElements(visibleElements, state, false);

		let formattedOutputElements = [];
		if (!formIsValid) {
			const nullState = copyStateAndSetValuesToNull(this.state);
			formattedOutputElements = this.formatElementsToSubmit(this.props.elements, nullState, true);
		}
		else { formattedOutputElements = this.formatElementsToSubmit(this.props.elements, state) }

		this.props.onSelect(formattedOutputElements);
	}

	/**
	 * @description Updates state of multiElement and the form.
	 *
	 * Initializes a state with all null values to ensure children value get reset.
	 *
	 * @param {Object} elementValuesFromForm Object with all the values from Form. Is of shape { camelCaseName: value }
	 */

	updateState(elementValuesFromForm) {
		const newStateValue = copyStateAndSetValuesToNull(this.state);

		let parentElementHasChanged = false;
		if (Object.keys(elementValuesFromForm).length === 0) return;

		for (let name in elementValuesFromForm) {
			if (!parentElementHasChanged)
				newStateValue[name] = elementValuesFromForm[name];
			else
				this.childForm.setState({ [name]: null });

			if (!_.isEqual(this.state[name], newStateValue[name])) parentElementHasChanged = true;
		}

		this.setState(newStateValue);
		this.verifyAndSubmit(newStateValue);
	}

	/**
	 * @description Adds data prop to any element that needs it.
	 *
	 * @param {Element[]} visibleElements An array of all visible elements.
	 *
	 * @return {Element[]} Array of formatted visible elements
	 */

	formatVisibleElements(visibleElements) {
		return visibleElements.map((element, index) => {
			if (index !== 0 && visibleElements[index - 1].childData) {
				let newElement = Object.assign({}, element);

				newElement.options = {
					...element.options,
					data: visibleElements[index - 1].childData(this.state[element.options.parent])
				};

				return newElement;
			}

			return element;
		});
	}

	/**
	 * @description Filters out elements from the props that shouldn't be visible based on the current state
	 *
	 * @param {Object} state the updated state.
	 *
	 * @returns {Element[]} Array of visible elements
	 */

	findVisibleElements(state) {
		const { elements } = this.props;
		let visibleElements = elements.filter(
			({ options }, index) => index === 0 || options && options.showIfParentValueEquals(state[options.parent])
		);

		return visibleElements;
	}

	render() {
		const visibleElements = this.findVisibleElements(this.state);
		const formattedVisibleElements = this.formatVisibleElements(visibleElements);

		return <Form
			ref = { form => this.childForm = form }
			visible = { true }
			elements = { formattedVisibleElements }
			initialValues = { this.state }
			onChange = { (state) => this.updateState(state) }
			justElements
		/>;
	}
}

export { MultiElement };