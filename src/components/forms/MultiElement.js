import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "./Form";
import { validateElements } from "../../utils/form";
import _ from "lodash";

/**
 *Types
 *@typedef {Object} Element:
 *		@property {String}                   name
 *		@property {String}                   camelCaseName
 *		@property {String}                   type
 *		@property {boolean=}                 isRequired
 *		@property {Options}                  options
 *		@property {ConditionalValue=}        conditionalValues         An object containing ConditionalValue target objects.
 *@typedef {Object} ConditionalValue:
 *		@property {Function}                 getValue                  Function that is used to obtain the new value for the [camelCaseName] element.
 *@typedef {Object} Options:
 *		@property {(String | Number)[]=}     data                      Only the first element should have this property.
 *		@property {(String | Number)[][]=}   selectionArray            All other elements use this property to query for their data.
 *	 	@property {Function}                 showIfParentValueEquals   Function that checks the parent value and returns whether the element should be shown.
 *		@property {Function=}                childData                 Optional function that checks the parent value and returns the data of the child.
 */

/**
 * Form Component Info
 * ________________________________________________________________
 *	Props:
 *		@param {Elements[]}         elements            An array of the names of Elements.
 *		@param {Object=}            initialState        An object of initial state values.
 *		@param {Function}           onSelect            Updates parent form whenever a value is changed.
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

class MultiElement extends Component {
	constructor(props) {
		super(props);
		const { initialValue, formatValue } = props;

		this.state = {};
		if (initialValue) this.state = (formatValue) ? formatValue.revert(this.initialValue) : initialValue;
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
			format: PropTypes.func.isRequired,
			revert: PropTypes.func.isRequired
		}),
		initialValue: PropTypes.any,
		value: PropTypes.any
	}

	componentDidUpdate(prevProps) {
		const {
			formatValue
		} = this.props;
		if (formatValue && formatValue.revert) {
			let newValue = {};
			let oldValue = {};

			if (this.props.value)
				newValue = formatValue.revert(this.props.value);
			if (prevProps.value)
				oldValue = formatValue.revert(prevProps.value);
			if (!_.isEqual(newValue, oldValue))
				this.onChange(newValue);
		}
		else if (!_.isEqual(this.props.value, prevProps.value)) {
			this.onChange(this.props.value);
		}
	}

	/**
	 * @description Creates a formatted array based off the elements passed in and the state.
	 *
	 * @returns {Object} Shape is: { element, value }.
	 */

	formatElementsToSubmit = (elements, state) => elements.map((element, index) => {
		if (index === 0 && element.options && element.options.formatValue)
			return { element, value: element.options.formatValue.format(state) };

		return { element, value: state[element.camelCaseName] };
	});

	copyStateAndSetValuesToNull() {
		let newStateValue = {};
		for (let name in this.state) newStateValue[name] = null;
		return newStateValue;
	}

	/**
	 * @description Verifies if all required fields have been selected.
	 *
	 * If all required fields have been filled in then it calls onSelect and passes the values in the format { element, value}.
	 */

	verifyAndSubmit(state) {
		const visibleElements = this.findVisibleElements(state);
		let formIsValid = validateElements(visibleElements, state, false);

		let formattedOutputElements = [];
		if (!formIsValid) {
			const nullState = this.copyStateAndSetValuesToNull();
			formattedOutputElements = this.formatElementsToSubmit(this.props.elements, nullState);
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

	onChange(elementValuesFromForm) {
		const newStateValue = this.copyStateAndSetValuesToNull();

		let parentElementHasChanged = false;

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
			elements = { formattedVisibleElements }
			initialValues = { this.state }
			onChange = { (state) => this.onChange(state) }
			justElements
		/>;
	}
}

export { MultiElement };