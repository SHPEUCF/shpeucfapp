import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { ScrollView, SafeAreaView, Modal, View } from "react-native";
import { Button, ButtonLayout, DatePicker, NavBar, Input, PickerInput, TimePicker, FilterList } from "..";
import { MultiElement } from "./MultiElement";
import { validateElements } from "../../utils/form";
import { copyStateAndSetValuesToNull } from "../../utils/general";

/**
 * Types
 * @typedef {Object} Element:
 *		@property {String}                   placeholder           PlaceHolder that will be shown inside of each element.
 *		@property {String}                   camelCaseName         Unique name in camelCase format.
 *		@property {String}                   type                  Type of element.
 *		@property {boolean=}                 isRequired            Optional field to determine if element should be required.
 *		@property {Options=}                 options               Optional fields for element-specific functionality.
 *		@property {ConditionalValue=}        conditionalValues     An object containing ConditionalValue target objects.
 * @typedef {Object} ConditionalValue:
 * 		@property {Function}                 getValue              Function that is used to obtain the new value for the [camelCaseName] element
 * @typedef {Object} CustomVerification:
 * 		@property {String[]}                 camelCaseNames        Desired data to be verified.
 * 		@property {Function}                 verification          Function that gets all the desired data and performs some check on it.
 */

/**
 * Form Component Info
 * ________________________________________________________________
 * 	Props:
 *		@param {Element[]}             elements             An array of the names of Elements.
 *		@param {Object=}               initialValues        An array of initial Values.
 *		@param {String}                title                Displayed at the top of the form.
 *		@param {Boolean}               visible              Used to determine whether the form is visible.
 *		@param {Function}              changeVisibility     Used to change the visibility of the form.
 *		@param {Function}              onSubmit             Called to pass all the form values into.
 *		@param {String=}               submitButtonName     Displayed on the submit button
 *		@param {CustomVerification=}   customVerification   Used for additional data verification
 *
 *	Output:
 *
 * 		<object>:
 *			name1<string>: value<any>
 *			name2<string>: value<any>
 *			...
 *			nameN<string>: value<any>
 * ________________________________________________________________
 * @description Dynamic Form component allows you to quickly and easily make
 * 		different forms.
 * ________________________________________________________________
 * Using Component:
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
 * ________________________________________________________________
 * Adding your own Component:
 *
 * 1. Make sure your component is modular and doesn't only work in some specific scenarios
 * 2. Add the component to the switch case
 * 3. Update the examples to show how to use your component
 * 4. (Optional) - If your component needs extra data besides a name/camelCaseName, pass in the data through the
 *    options property as individual properties.
 * 5. Any state management such as value of the component will be handled by the form.js's state
 * 6. Test Component
 * ________________________________________________________________
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
 * 			elements= { elements }
 * 			initialValue = { initialValues }
 * 			title = "The Title"
 * 			visible = { this.state.formVisibility }
 * 			changeVisibility = { (visible) => this.setState({ formVisibility: visible }) }
 * 			onSubmit = { (value) => console.log(`this is the value: ${value}`) }
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
**/

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = this.props.initialValues || {};
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
		initialValues: PropTypes.object,
		title: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired,
		visible: PropTypes.bool.isRequired,
		changeVisibility: PropTypes.func.isRequired,
		submitButtonName: PropTypes.string
	}

	changeState(element, newValue) {
		const { conditionalValues, camelCaseName } = element;
		const updatedElement = { [camelCaseName]: newValue };

		if (conditionalValues) this.applyConditionalValues(conditionalValues, newValue);
		if (this.props.onChange) this.props.onChange(Object.assign(this.state, updatedElement));

		this.setState(updatedElement);
	}

	applyConditionalValues(conditionalValues, parentValue) {
		conditionalValues.map(newElement => {
			const affectedElement = this.props.elements.find(element => element.camelCaseName === newElement.name);

			if (!affectedElement) return;

			this.changeState(affectedElement, newElement.value(parentValue));
		});
	}

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
					// Next line is checking for 0 to make sure it displays 0 correctly
					value = { this.state[camelCaseName] === 0 ? 0 : this.state[camelCaseName] || "" }
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
					value = { this.state[camelCaseName] || "" }
					formatValue = { options.formatValue }
					onSelect = { (elementsAndValues) => {
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
						changeVisibility(false);
					} }
				/>
			</ButtonLayout>
		);
	}

	submit = () => {
		let formIsValid = true;
		let submitState = Object.assign({}, this.state);

		formIsValid = validateElements(this.props.elements, this.state);

		if (!formIsValid) return;

		if (this.props.customVerification) {
			const { camelCaseNames, verification } = this.props.customVerification;

			if (Array.isArray(camelCaseNames)) {
				const values = camelCaseNames.map(name => submitState[name]);
				formIsValid = verification(values);
			}
			else { formIsValid = verification(submitState[camelCaseNames]) }
		}
		this.resetState();
		this.props.onSubmit(submitState);
		this.props.changeVisibility(false);
	}

	resetState() {
		let initialState = copyStateAndSetValuesToNull(this.state);
		Object.assign(initialState, this.props.initialValues);
		console.log(initialState);
		this.setState(this.initialState);
	}

	render() {
		const { elements, title, changeVisibility, visible, justElements } = this.props;
		const { container, elementsStyle } = styles;

		const elementsHTML = elements.map(item => this.buildElement(item));

		if (justElements) {
			return (
				<View style = { elementsStyle }>
					{ elementsHTML }
				</View>
			);
		}

		return (
			<Modal
				transparent = { false }
				visible = { visible || false }
				style = { container }
				onRequestClose = { () => changeVisibility(false) }
			>
				<SafeAreaView style = { container }>
					<NavBar title = { title || "Pass in a title please" } />
					<ScrollView style = { elementsStyle }>
						{ elementsHTML }
					</ScrollView>
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