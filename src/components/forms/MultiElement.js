import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form } from "./Form";
import _ from "lodash";
import { copyStateAndSetValuesToNull } from "../../utils/general";

/**
 * Types
 * @typedef {Object} Element:
 *      @property {String}                          placeHolder               Placeholder that will be shown inside of each element.
 *      @property {String}                          camelCaseName             Unique name in camelCase format.
 *      @property {("DatePicker"|"FilterList"
 *                  |"Input"|"PickerInput"
 *                  |"TimePicker"|"MultiElement")}  type                      Type of element.
 *      @property {boolean=}                        isRequired                Optional field to determine if element should be required.
 *      @property {Options=}                        options                   Optional fields for element-specific functionality.
 *      @property {ConditionalValue=}               conditionalValues         Object that contains the names of other elements along with a function
 *                                                                            that determines each element's new value based off the parent value
 * @typedef {Object} ConditionalValue:
 *      @property {Function}                        name                      (camelCaseName) of the element whose value is going to be modified
 *      @property {Function}                        value                     Function is used to obtain the new value for the (camelCaseName) element
 * @typedef {Object} Options:
 *      @property {Function}                        showIfParentValueEquals   Function checks the parent value and returns whether the element should be shown.
 *      @property {String}                          parent                    (camelCaseName) of the parent element.
 *	    @property {Function=}                       childData                 Optional function checks the parent value and returns the data of the child.
 * @typedef {Object} FormatValue:
 *	    @property {Function}                        format                    Function formats the main multielement before being passed up to parent
 *	    @property {Function}                        revert                    Function reverts the main multielement when passed down from parent
 */

/**
 * Form Component Info
 * ________________________________________________________________
 *	Props:
 *	    @param {Element[]}         elements            An array of the names of Elements.
 *	    @param {any=}              value               An object of initial state values.
 *	    @param {FormatValue=}      formatValue         Optional object containing functions to process the main value of the multielement
 *	    @param {Function}          onSelect            Updates parent form whenever a value is changed.
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
 * together into a form of their own and manages their data in a
 * consecutive manner
 * ________________________________________________________________
 */

class MultiElement extends PureComponent {
	constructor(props) {
		super(props);
		this.mainCamelCaseName = this.props.elements[0].camelCaseName;

		// keeps track of any elements that are required when visible to the user
		this.requiredIfVisible = {};

		const { formatValue, value, elements } = this.props;
		let formattedValue;

		if (value[this.mainCamelCaseName] && formatValue) {
			formattedValue = Object.assign({}, value);
			formattedValue[this.mainCamelCaseName] = formatValue.revert(value);
		}

		this.state = { value: formattedValue || value, visibleElements: [elements[0]] };
	}

	componentDidMount() {
		this.setState({ visibleElements: this.findVisibleElements() });
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
		const { formatValue, value } = this.props;

		if (!_.isEqual(value, prevProps.value)) {
			if (formatValue) {
				let newValue = null;
				let oldValue = null;

				if (prevProps.value[this.mainCamelCaseName]) oldValue = formatValue.revert(prevProps.value);
				if (value[this.mainCamelCaseName]) newValue = formatValue.revert(this.props.value);

				if (!_.isEqual(newValue, oldValue)) {
					const formattedValue = Object.assign({}, value);
					formattedValue[this.mainCamelCaseName] = newValue;
					this.setState({ value: formattedValue }, () => this.updateState(formattedValue));
				}
			}
			else {
				// Ensures that state values are properly updated before continuing
				this.setState({ value }, () => this.updateState(value));
			}
		}
	}

	/**
	 * @description Creates a formatted array based off the elements passed in and the state.
	 *
	 * @param {Object} state The updated state.
	 *
	 * @returns {Object[]} Shape is: [{ element, value }, ..., { element, value }].
	 */

	formatElementsToSubmit = state => {
		if (state[this.mainCamelCaseName] && this.props.formatValue)
			state[this.mainCamelCaseName] = this.props.formatValue.format(state);

		return this.props.elements.map(element => {
			return { element, value: state[element.camelCaseName] };
		 });
	}

	/**
	 * @description Updates state of multiElement and the form
	 *
     * Initializes state with null values (so children values are reset) and finds next visible elements
	 *
	 * @param {Object} elementValuesFromForm Object with all the values from Form. Is of shape { camelCaseName: value }
	 */

	updateState(elementValuesFromForm) {
		const newStateValue = copyStateAndSetValuesToNull(this.state.value);
		const newVisibleElements = this.findVisibleElements(elementValuesFromForm);
		let parentElementHasChanged = false;

		if (Object.keys(elementValuesFromForm).length === 0) return;

		newVisibleElements.forEach(({ camelCaseName }) => {
			if (!parentElementHasChanged) newStateValue[camelCaseName] = elementValuesFromForm[camelCaseName];

			if (this.state.value[camelCaseName] !== newStateValue[camelCaseName]) parentElementHasChanged = true;
		});

		this.setState({ value: newStateValue, visibleElements: newVisibleElements });
		this.props.onSelect(this.formatElementsToSubmit(Object.assign({}, newStateValue)));
	}

	/**
	 * @description Adds data prop to elements whose selectable data is derived from the parent value using the childData prop
	 *
	 * @param {Element[]} visibleChildElements An array of all visible elements excluding the primary element
	 *
	 * @return {Element[]} Array of formatted visible elements
	 */

	appendDataToChildren(visibleChildElements) {
		return visibleChildElements.map(element => {
			const parentElement = this.props.elements.find(({ camelCaseName }) =>
				camelCaseName === element.options.parent);

			if (parentElement.options.childData) {
				const newElement = Object.assign({}, element);

				newElement.options = {
					...element.options,
					data: parentElement.options.childData(this.state.value[element.options.parent])
				};

				return newElement;
			}

			return element;
		});
	}

	/**
	 * @description Filters out elements from the props that shouldn't be visible based on the current state
	 *
	 * Modifies each isRequired property based on visibility and finds data for any elements that needs it
	 *
	 * @returns {Element[]} Array of visible elements
	 */

	findVisibleElements() {
		let visibleChildElements = this.props.elements.slice(1).filter(element => {
			const { options, isRequired, camelCaseName } = element;

			let visible = options && options.showIfParentValueEquals(this.state.value[options.parent]);

			if (visible && (isRequired || this.requiredIfVisible[camelCaseName])) {
				element.isRequired = true;
			}
			else {
				if (isRequired) this.requiredIfVisible[camelCaseName] = true;
				element.isRequired = false;
			}

			return visible;
		});

		visibleChildElements = this.appendDataToChildren(visibleChildElements);

		return [this.props.elements[0]].concat(visibleChildElements);
	}

	render() {
		return <Form
			visible = { true }
			elements = { this.state.visibleElements }
			values = { Object.assign({}, this.state.value) }
			onChange = { state => this.updateState(state) }
			onlyRenderElements
		/>;
	}
}

export { MultiElement };