import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { ScrollView, SafeAreaView, Modal, View } from "react-native";
import { Alert, Button, ButtonLayout, DatePicker, NavBar, Input, PickerInput, TimePicker, FilterList } from "../";
import { MultiElement } from "./MultiElement";
import { copyStateAndSetValuesToNull } from "../../utils/general";

/**
 * Types
 * @typedef {Object} Element:
 *		@property {String}                         placeHolder        Placeholder that will be shown inside of each element.
 *		@property {String}                         camelCaseName      Unique name in camelCase format.
 *		@property {("DatePicker"|"FilterList"
 *		           |"Input"|"PickerInput"
 *		           |"TimePicker"|"MultiElement")}  type               Type of element.
 *		@property {boolean=}                       isRequired         Optional field to determine if element should be required.
 *		@property {Options=}                       options            Optional fields for element-specific functionality.
 *		@property {ConditionalValue=}              conditionalValues  Optional object that contains element:value pairs that depend on the current element.
 *		@property {Function=}                      isValid            Optional function that checks if the current element Value is valid.
 *		@property {String=}                        validShape         Optional string that tells the user how the input should look.
 * @typedef {Object} ConditionalValue:
 *		@property {Function}                       name               (camelCaseName) of the element whose value is going to be modified.
 *		@property {Function}                       value              Function is used to obtain the new value for the (camelCaseName) element.
 * @typedef {Object} CustomVerification:
 *		@property {String[]}                       camelCaseNames     Desired data to be verified.
 *		@property {Function}                       verification       Function gets all the desired data and performs some check on it.
 */

/**
 * Form Component Info
 * ---
 * 	Props:
 *		@param {Element[]}            elements            An array of the names of Elements.
 *		@param {Object=}              values              Object to control the values of the form where each
 *		                                                  value is under the corresponding camelCaseName
 *		@param {Boolean}              visible             Used to determine whether the form is visible.
 *		@param {Function=}            changeVisibility    Used to change the visibility of the form.
 *		@param {Function=}            onSubmit            Called to pass all the form values into when submitting.
 *		@param {Function=}            onChange            Called to pass all the form values into after any value change.
 *		@param {String=}              submitButtonName    Displayed on the submit button
 *		@param {CustomVerification=}  customVerification  Used for additional data verification
 *		@param {Boolean=}             onlyRenderElements  Controls whether elements get rendered in a seperate modal
 *
 * @example
 *	Output:
 *		<object>:
 *			name1<string>: value<any>
 *			name2<string>: value<any>
 *			...
 *			nameN<string>: value<any>
 *
 * @description Dynamic Form component allows you to quickly and easily make different forms.
 * ___
 * **Using the component**:
 *
 * 1. When making a new form, create a definition in FormData.json and pass it in through the elements prop.
 *
 * 2. To view the component you must pass in a visibility state from the parent component.
 *    The component will close automatically when you pass in a changeVisibility wrapper function.
 *    (See changeVisibility example)
 *
 * 3. Pass in an elements props with a description of all the fields you want and the form handles all the
 *    data management for you.
 *    (See elements example)
 *
 * 4. When you press submit, the form will call onSubmit and pass in the state to the onSubmit function as a parameter.
 *    (See onSubmit example)
 *
 * 5. If you are using PickerInput you need to pass in data using the options property. **NOTE** You should only use
 *    data from the FormData.json file inside of the /data folder.
 *
 * **Adding your own Component**:
 *
 * 1. Make sure your component is modular and doesn't only work in some specific scenarios.
 * 2. Add the component to the switch case.
 * 3. Update the examples to show how to use your component.
 * 4. *Optional* - If your component needs extra data besides a name/camelCaseName, pass in the data through the.
 *    options property as individual properties.
 * 5. Any state management such as value of the component will be handled by the form.js's state.
 * 6. Test Component.
 * ___
 * @example
 * 	Input:
 * 		elements = [
 * 			{
 * 				placeholder: "First Name",
 * 				camelCaseName: "firstName",
 * 				type: "Input",
 * 				isRequired: true,
 * 			},
 * 			{
 * 				placeholder: "Last Name",
 * 				camelCaseName: "lastName",
 * 				type: "Input",
 * 				isRequired: true,
 * 			},
 * 			{
 * 				placeholder: "Birthday",
 * 				camelCaseName: "birthday",
 * 				type: "DatePicker"
 * 			},
 * 			{
 * 				placeholder: "Coolness Level",
 * 				camelCaseName: "coolnessLevel",
 * 				type: "PickerInput",
 * 				isRequired: true,
 * 				options: {
 * 						data: ["Super Cool", "Cool", "Uncool", "Super Uncool"]
 * 				}
 * 			},
 * 			{
 * 				placeholder: "Major",
 * 				camelCaseName: "major",
 * 				type: "FilterPicker",
 * 				isRequired: true,
 * 				options: {
 * 					data: ["Mechanical Engineering", "Electrical Engineering", "Computer Science"],
 * 					type: "single"
 * 				}
 * 			}
 * 		]
 *
 * 		initialValues = {
 * 				"firstName": "Steven",
 * 				"lastName": "Perdomo",
 * 				"birthday": "2001-01-01",
 * 				"coolnessLevel": "Super Uncool",
 * 				"major": "Computer Science"
 * 		}
 *
 * 		<Form
 * 			elements = { elements }
 * 			values = { values }
 * 			title = "The Title"
 * 			visible = { this.state.formVisibility }
 * 			changeVisibility = { visible => this.setState({ formVisibility: visible }) }
 * 			onSubmit = { value => console.log(`this is the value: ${value}`) }
 * 			submitButtonName = "Confirm Coolness Level"
 * 		/>
 *
 * 	Output:
 * 		this.state = {
 * 			firstName: "Haniel",
 * 			lastName: "Diaz",
 * 			birthday: null || "6969/04/20",
 * 			coolnessLevel:  "Super Cool",
 * 			major: "Computer Science"
 * 		}
 * 		onSubmit(this.state)
 *
 */

class Form extends Component {
	constructor(props) {
		super(props);

		this.state = this.props.values || {};
	}

	static propTypes = {
		elements: PropTypes.arrayOf(
			PropTypes.shape(
				{
					placeholder: PropTypes.string.isRequired,
					camelCaseName: PropTypes.string.isRequired,
					type: PropTypes.string.isRequired,
					isRequired: PropTypes.bool,
					isValid: PropTypes.func,
					validShape: PropTypes.string,
					options: PropTypes.any
				}
			)
		).isRequired,
		values: PropTypes.object,
		title: PropTypes.string,
		onSubmit: PropTypes.func,
		onChange: PropTypes.func,
		visible: PropTypes.bool.isRequired,
		changeVisibility: PropTypes.func,
		submitButtonName: PropTypes.string
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(prevProps.values, this.props.values)) this.setState(this.props.values);
	}

	/**
	 * @description Processes an element's new value and updates the state of the form.
	 *
	 * If the element's value affects another element, the conditional values are applied to the form state.
	 * The onChange prop is called here and sent the updated state.
	 *
	 * @param {Element} element   The element whose value is being modified.
	 * @param {Any}     newValue  The new value that will update the state.
	 */

	changeState(element, newValue) {
		const { conditionalValues, camelCaseName } = element;
		const updatedElement = { [camelCaseName]: newValue };

		if (conditionalValues) this.applyConditionalValues(conditionalValues, newValue);
		if (this.props.onChange) this.props.onChange(Object.assign(this.state, updatedElement));

		this.setState(updatedElement);
	}

	/**
	 * @description Uses a parent element's value to change the values of other elements in the form.
	 *
	 * If an element has nest elements inside of options.elements they will be included.
	 *
	 * @param {ConditionalValue[]} conditionalValues  The conditionalValues of the parent element whose value determines the values of other form elements.
	 * @param {Any}                parentValue        The new value of the parent element.
	 */

	applyConditionalValues(conditionalValues, parentValue) {
		const iterableElements = this.props.elements.flatMap(element => {
			return element.options && element.options.elements || element;
		});

		conditionalValues.map(newElement => {
			const affectedElement = iterableElements.find(({ camelCaseName }) => camelCaseName === newElement.name);

			if (affectedElement) this.changeState(affectedElement, newElement.value(parentValue));
		});
	}

	/**
	 * @description Renders different types of elements and links their values to the form state.
	 *
	 * @param {Element} element Element that will be rendered.
	 *
	 * @return {Component} Appropriate component to be rendered.
	 */

	buildElement(element) {
		const { placeholder, camelCaseName, type, options } = element;

		switch (type) {
			case "DatePicker":
				return <DatePicker
					key = { camelCaseName }
					placeholder = { placeholder }
					value = { this.state[camelCaseName] || "" }
					onSelect = { value => this.changeState(element, value) }
				/>;
			case "FilterList":
				if (!options || !options.data)
					console.error("You must pass in data through the options property to use FilterList");

				return <FilterList
					key = { camelCaseName }
					type = { options.type }
					placeholder = { placeholder }
					data = { options.data }
					value = { this.state[camelCaseName] || "" }
					regexFunc = { options.regexFunc }
					selectBy = { options.selectBy }
					itemJSX = { options.itemJSX }
					customForm = { options.customForm }
					search = { options.search }
					onSelect = { value => this.changeState(element, value) }
				/>;
			case "Input":
				return <Input
					key = { camelCaseName }
					placeholder = { placeholder }
					multiline = { false }
					autoCapitalize = { options && options.autoCapitalize }
					value = { this.state[camelCaseName] === 0 ? 0 : this.state[camelCaseName] || "" } // Display 0 correctly
					secureTextEntry = { options && options.secureTextEntry }
					keyboardType = { options && options.keyboardType }
					onChangeText = { value => {
						if (options && options.keyboardType === "numeric")
							this.changeState(element, parseInt(value));
						else if (value === "")
							this.changeState(element, null);
						else
							this.changeState(element, value);
					} }
				/>;
			case "PickerInput":
				if (!options || !options.data)
					console.error("You must pass in data through the options property to use PickerInput");

				return <PickerInput
					key = { camelCaseName }
					placeholder = { placeholder }
					value = { this.state[camelCaseName] || "" }
					data = { options.data }
					onSelect = { value => this.changeState(element, value) }
				/>;
			case "TimePicker":
				return 	<TimePicker
					key = { camelCaseName }
					placeholder = { placeholder }
					value = { this.state[camelCaseName] || "" }
					onSelect = { value => this.changeState(element, value) }
				/>;
			case "MultiElement":
				return <MultiElement
					key = { camelCaseName }
					elements = { options.elements }
					value = { (multiElementValues => { // Find values corresponding to MultiElement
						options.elements.forEach(({ camelCaseName }) => {
							Object.assign(multiElementValues, { [camelCaseName]: this.state[camelCaseName] });
						});

						return multiElementValues;
					})({}) }
					formatValue = { options.formatValue }
					onSelect = { elementsAndValues => {
						elementsAndValues.forEach(({ element, value }) => this.changeState(element, value));
					} }
				/>;
			default:
				console.error("Please Pick a Correct type",
					"\nPossible types are [DatePicker, Input, PickerInput, TimePicker]");

				return null;
		}
	}

	renderButtons() {
		const { changeVisibility, submitButtonName } = this.props;

		return (
			<ButtonLayout>
				<Button
					title = { submitButtonName || "Confirm" }
					onPress = { () => this.submit() }
				/>
				<Button
					title = "Cancel"
					onPress = { () => {
						this.resetState();
						changeVisibility(false);
					} }
				/>
			</ButtonLayout>
		);
	}

	/**
	 * @description Validates elements and if elements are valid, the form state is passed to the onSubmit prop.
	 */

	submit() {
		let formIsValid = true;
		let submitState = Object.assign({}, this.state);

		formIsValid = this.validateElements();

		if (formIsValid && this.props.customVerification) {
			const { camelCaseNames, verification } = this.props.customVerification;

			if (Array.isArray(camelCaseNames)) {
				const values = camelCaseNames.map(name => submitState[name]);

				formIsValid = verification(values);
			}
			else {
				formIsValid = verification(submitState[camelCaseNames]);
			}
		}

		if (!formIsValid) return;

		this.resetState();
		this.props.onSubmit(submitState);
		this.props.changeVisibility(false);
	}

	/**
	 * @return {Boolean} True if every element has passed validation. False otherwise.
	 */

	validateElements() {
		let formIsValid = this.props.elements.length > 0;

		const iterableElements = this.props.elements.flatMap(element => {
			return (element.options && element.options.elements) || element;
		});

		iterableElements.forEach(element => {
			const elementFromState = this.state[element.camelCaseName];

			if (formIsValid && element.isRequired && elementFromState !== 0 && !elementFromState) {
				Alert.alert(`Please input a value into the ${element.placeholder} field`);
				formIsValid = false;
			}

			if (formIsValid && element.isValid && element.isValid(elementFromState)) {
				Alert.alert(`${element.placeholder} should be in the shape ${element.validShape}`);
				formIsValid = false;
			}
		});

		return formIsValid;
	}

	/**
	 * @description Sets every value in the form state to null.
	 */

	resetState() {
		let initialState = copyStateAndSetValuesToNull(this.state);

		Object.assign(initialState, this.props.values);
		this.setState(initialState);
	}

	render() {
		const { elements, title, changeVisibility, visible, onlyRenderElements } = this.props;
		const { container, elementsStyle } = styles;

		const elementsHTML = elements.map(item => this.buildElement(item));

		if (onlyRenderElements) return <View style = { elementsStyle }>{ elementsHTML }</View>;

		return (
			<Modal
				transparent = { false }
				visible = { visible || false }
				style = { container }
				onRequestClose = { () => changeVisibility(false) }
			>
				<SafeAreaView style = { container }>
					<NavBar title = { title || "Pass in a title please" } />
					<ScrollView style = { elementsStyle }>{ elementsHTML }</ScrollView>
					{ this.renderButtons() }
				</SafeAreaView>
			</Modal>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		paddingHorizontal: "3%",
		backgroundColor: "black"
	},
	elementsStyle: {
		flex: 0.8
	}
};

export { Form };