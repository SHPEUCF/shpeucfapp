import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "./Form";

/**
 * Types
 * @typedef {Object} Elements:
 * 		@property {String}  			 name
 * 		@property {String}   			 camelCaseName
 * 		@property {String}   			 type
 * 		@property {boolean=} 			 isRequired
 * 		@property {{Options}}     		 options
 *		@property {{ConditionalValue}=}  conditionalValues	An object containing ConditionalValue target objects
 * @typedef {Object} ConditionalValue:
 * 		@property {Function} 			 getValue			Function that is used to obtain the new value for the [camelCaseName] element
 * @typedef {Object} Options:
 * 		@property {(String | Number)[]=} 			     data				Only the first element should have this property
 * 		@property {(String | Number)[][]=} 			     selectionArray	    All other elements use this property to query for their data
 */

/**
 * Form Component Info
 * ________________________________________________________________
 * 	Props:
 *		@param {Elements[]}         elements         	An array of the names of Elements.
 *		@param {Object=} 		    initialState   	    An object of initial state values.
  *		@param {Function} 		    onSelect   	        Updates parent form whenever a value is changed
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

// initial values for the nested form
let formValues = [];

class MultiElement extends Component {
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
		initialState: PropTypes.shape({})
	}

	constructor(props) {
		super(props);
		const { elements, initialState } = this.props;
		let limit = 1;
		let values = [];

		if (initialState) {
			values = elements.map((element, index) => {
				let value = initialState[element.camelCaseName];

				if (value) {
					value = this.formatValue(element, value);
					this.selectUpcomingElementData(element, index, value);
				}

				// nested form needs initial values in a different format
				formValues.push({ camelCaseName: element.camelCaseName, value: value });
				// this value format is used in the MultiElement state
				return { [element.camelCaseName]: value };
			});
			values = values.filter(value => Object.values(value)[0] ? true : false);
			// extends inital visibleElements length if an element is unlocked after processing all initial values
			limit = (values.length !== elements.length && elements[values.length].options.data)
				? values.length + 1
				: values.length;
		}

		this.state = { visibleElements: elements.slice(0, limit), values: values };
	}

	formatValue(element, value) {
		let formatObj = element.options.formatValue;
		if (formatObj) {
			const { format, revert } = formatObj;
			if (!(format && revert))
				console.error(`The formatValue object of the -${element.camelCaseName}- element should have both a format and revert function. Check the FormData`);
			value = revert(value);
			this.props.onSelect(element, value);
			return value;
		}
		else { return value }
	}

	// unlocks next element in the initial chain by querying for its data in the current element
	selectUpcomingElementData(element, index, value) {
		const { elements } = this.props;
		let valIndex = element.options.data.findIndex(val => val === value);
		if (index < elements.length - 1) {
			let query = elements[index + 1].options.selectionArray[valIndex];
			if (query) elements[index + 1].options.data = query;
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.values !== prevState.values) {
			const { elements } = this.props;

			// resets element values whenever earlier element values have been modified
			for (let i = this.state.values.length; i < prevState.values.length; i++) {
				this.form.changeState(elements[i], null);
				this.props.onSelect(elements[i], null);
			}
		}
	}

	processNewState(state) {
		const { values } = this.state;
		const { elements } = this.props;

		let newValue;
		let index = -1;

		// finds the element value that has been changed and saves the element index
		elements.some((element, ind) => {
			let valueObj = values[ind];
			if (!(valueObj && state[element.camelCaseName] === Object.values(valueObj)[0])) {
				index = ind;
				newValue = state[element.camelCaseName];
				return true;
			}
			else {
				return false;
			}
		});

		if (newValue) {
			let element = elements[index];
			let updatedValues = Object.assign([], this.state.values);
			let valIndex = element.options.data.findIndex(val => val === newValue);
			let limit;

			updatedValues.splice(index, 1, { [element.camelCaseName]: newValue });

			// update parent form
			this.props.onSelect(element, newValue);

			// unlocks next element
			if (elements.length !== index + 1) {
				let query = elements[index + 1].options.selectionArray[valIndex];
				if (query) {
					elements[index + 1].options.data = query;
					limit = index + 2;
				}
				else { limit = index + 1 }
			}
			this.setState({ visibleElements: elements.slice(0, limit), values: updatedValues.slice(0, index + 1) });
		}
	}

	render() {
		return <Form
			ref = { form => this.form = form }
			elements = { this.state.visibleElements }
			initialValues = { formValues }
			onChange = { (state) => this.processNewState(state) }
			justElements
		/>;
	}
}

export { MultiElement };