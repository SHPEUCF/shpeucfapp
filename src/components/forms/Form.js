import React, { Component } from "react";
import PropTypes from "prop-types";
import { ScrollView, SafeAreaView, Modal, View } from "react-native";
import { Button, ButtonLayout, DatePicker, NavBar, Input, PickerInput, TimePicker, FilterList } from "..";
import { MultiElement } from "./MultiElement";

/**
 * Types
 * @typedef {Object} Elements:
 * 		@property {String}  			 name
 * 		@property {String}   			 camelCaseName
 * 		@property {String}   			 type
 * 		@property {boolean=} 			 isRequired
 * 		@property {any=}     			 options
 *		@property {{ConditionalValue}=}  conditionalValues	An object containing ConditionalValue target objects
 * @typedef {Object} InitialValue:
 * 		@property {String}   			 name
 * 		@property {any}      			 value
 * @typedef {Object} ConditionalValue:
 * 		@property {Function} 			 getValue			Function that is used to obtain the new value for the [camelCaseName] element
 * @typedef {Object} CustomVerification:
 * 		@property {String[]} 			 camelCaseNames		Desired data to be verified
 * 		@property {Function} 			 verification
 */

/**
 * Form Component Info
 * ________________________________________________________________
 * 	Props:
 *		@param {Elements[]}      		elements         	An array of the names of Elements.
 *		@param {InitialValue[]=} 		initialValues    	An array of initial Values.
 *		@param {String}          		title            	Displayed at the top of the form.
 *		@param {Boolean}         		visible          	Used to determine whether the form is visible.
 *		@param {Function}        		changeVisibility 	Used to change the visibility of the form.
 *		@param {Function}        		onSubmit         	Called to pass all the form values into.
 *		@param {Function=}       		onCancel         	Called when the cancel button is pressed.
 *		@param {String=}         		submitButtonName 	Displayed on the submit button
 *		@param {CustomVerification=}    customVerification 	Used for additional data verification
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
 * 		initialValues = [
 * 			{
 * 				camelCaseName: "firstName",
 * 				value: "Steven"
 * 			},
 * 			{
 * 				camelCaseName: "lastName",
 * 				value: "Perdomo"
 * 			},
 * 			{
 * 				camelCaseName: "birthday",
 * 				value: "2001-01-01"
 * 			},
 * 			{
 * 				camelCaseName: "coolnessLevel",
 * 				value: "Super Uncool"
 * 			},
 * 			{
 * 				camelCaseName: "major",
 * 				value: "Computer Science"
 * 			}
 * 		]
 *
 * 		<Form
 * 			elements= { elements }
 * 			initialValue = { initialValues }
 * 			title = "The Title"
 * 			visible = { this.state.formVisibility }
 * 			changeVisibility = { (visible) => this.setState({ formVisibility: visible }) }
 * 			onSubmit = { (value) => console.log(`this is the value: ${value}`) }
 * 			onCancel = { () => console.log("I've been cancelled") }
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

		let values = {};
		if (this.props.initialValues)
			this.props.initialValues.forEach(item => values[item.camelCaseName] = item.value);
		this.state = values;
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
		initialValues: PropTypes.arrayOf(
			PropTypes.shape(
				{
					camelCaseName: PropTypes.string.isRequired,
					value: PropTypes.any
				}
			)
		),
		title: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired,
		visible: PropTypes.bool.isRequired,
		changeVisibility: PropTypes.func.isRequired,
		onCancel: PropTypes.func,
		submitButtonName: PropTypes.string
	}

	changeState(item, val = "") {
		const { conditionalValues, camelCaseName } = item;
		let update = { [camelCaseName]: val };
		if (conditionalValues) this.applyConditionalValues(conditionalValues, val, update);
		if (this.props.onChange) this.props.onChange(Object.assign(this.state, update));
		this.setState(update);
	}

	applyConditionalValues(conditionalValues, keyValue, updateObj) {
		Object.entries(conditionalValues).map(([target, obj]) => {
			// finds target element in case the target element also has conditional values and verifies if it exists
			let index = this.props.elements.findIndex(element => target === element.camelCaseName);
			if (index === -1) return;

			let element = this.props.elements[index];
			let value = obj.getValue(keyValue);
			let valueObj = { [target]: value };

			Object.assign(updateObj, valueObj);
			if (element.conditionalValues) this.applyConditionalValues(element.conditionalValues, value, updateObj);
		});
	}

	buildElement(item) {
		const { placeholder, camelCaseName, type, options } = item;

		switch (type) {
			case "DatePicker":
				return <DatePicker
					placeholder = { placeholder }
					value = { this.state[camelCaseName] || "" }
					onSelect = { value => this.changeState(item, value) }
				/>;
			case "FilterList":
				if (!options || !options.data)
					console.error("You must pass in data through the options property to use FilterList");
				return <FilterList
					type = { options.type }
					placeholder = { placeholder }
					data = { options.data }
					value = { this.state[camelCaseName] || "" }
					regexFunc = { options.regexFunc }
					selectBy = { options.selectBy }
					itemJSX = { options.itemJSX }
					customForm = { options.customForm }
					search = { options.search }
					onSelect = { value => this.changeState(item, value) }
				/>;
			case "Input":
				return <Input
					placeholder = { placeholder }
					multiline = { false }
					// Next line is checking for 0 to make sure it displays 0 correctly
					value = { this.state[camelCaseName] === 0 ? 0 : this.state[camelCaseName] || "" }
					secureTextEntry = { options && options.secureTextEntry }
					keyboardType = { options && options.keyboardType }
					onChangeText = { value => {
						if (options && options.keyboardType === "numeric")
							this.changeState(item, parseInt(value));
						else if (value === "")
							this.changeState(item, null);
						else
							 this.changeState(item, value);
					} }
				/>;
			case "PickerInput":
				if (!options || !options.data)
					console.error("You must pass in data through the options property to use PickerInput");
				return <PickerInput
					placeholder = { placeholder }
					value = { this.state[camelCaseName] || "" }
					data = { options.data }
					onSelect = { value => this.changeState(item, value) }
				/>;
			case "TimePicker":
				return 	<TimePicker
					placeholder = { placeholder }
					value = { this.state[camelCaseName] || "" }
					onSelect = { value => this.changeState(item, value) }
				/>;
			case "MultiElement":
				return <MultiElement
					elements = { options.elements }
					initialState = { this.state }
					onSelect = { (item, value) => this.changeState(item, value) }
				/>;
			default:
				console.error("Please Pick a Correct type",
					"\nPossible types are [DatePicker, Input, PickerInput, TimePicker]");
				return null;
		}
	}

	renderButtons() {
		const { onCancel, changeVisibility, submitButtonName } = this.props;

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
						if (onCancel) onCancel();
					} }
				/>
			</ButtonLayout>
		);
	}

	submit = () => {
		let formIsValid = true;
		let targetState;
		let submitState = Object.assign({}, this.state);

		this.props.elements.forEach(element => {
			switch (element.type) {
				case "MultiElement": {
					element.options.elements.forEach(multiElement => {
						let formatObj = multiElement.options.formatValue;
						targetState = submitState[multiElement.camelCaseName];
						if (formIsValid && multiElement.isRequired && targetState !== 0 && !targetState) {
							alert(`Please input a value into the ${multiElement.placeholder} field.`);
							formIsValid = false;
						}
						if (formatObj) {
							const { camelCaseNames, format, revert } = formatObj;
							if (!(format && revert))
								console.error(`The formatValue object of the -${multiElement.camelCaseName}- element should have both a format and revert function. Check the FormData`);
							if (Array.isArray(camelCaseNames)) {
								let values = camelCaseNames.map(name => submitState[name]);
								submitState[multiElement.camelCaseName] = format(values);
							}
							else { submitState[multiElement.camelCaseName] = format(submitState[camelCaseNames]) }
						}
					});
					break;
				}
				default: {
					targetState = submitState[element.camelCaseName];
					if (formIsValid && element.isRequired && targetState !== 0
						&& !targetState) {
						alert(`Please input a value into the ${element.placeholder} field.`);
						formIsValid = false;
					}
				}
			}
		});

		if (formIsValid && this.props.customVerification) {
			const { camelCaseNames, verification } = this.props.customVerification;

			if (Array.isArray(camelCaseNames)) {
				let values = camelCaseNames.map(name => submitState[name]);
				formIsValid = verification(values);
			}
			else { formIsValid = verification(submitState[camelCaseNames]) }
		}

		if (formIsValid) {
			this.props.changeVisibility(false);
			this.props.onSubmit(submitState);
			this.resetState();
		}
	}

	resetState() {
		let resetState = {};
		Object.keys(this.state).forEach(key => {
			resetState[key] = null;
		});
		if (this.props.initialValues)
			this.props.initialValues.forEach(item => resetState[item.camelCaseName] = item.value);
		this.setState(resetState);
	}

	render() {
		const { elements, title, changeVisibility, visible, justElements } = this.props;
		const { container, elementsStyle } = styles;

		let renderForm = justElements ? <View style = { elementsStyle }>
			{ elements.map(item => this.buildElement(item)) }
		</View>
			: <Modal
				transparent = { false }
				visible = { visible || false }
				style = { container }
				onRequestClose = { () => changeVisibility(false) }
			>
				<SafeAreaView style = { container }>
					<NavBar title = { title || "Pass in a title please" } />
					<ScrollView style = { elementsStyle }>
						{ elements.map(item => this.buildElement(item)) }
					</ScrollView>
					{ this.renderButtons() }
				</SafeAreaView>
			</Modal>;

		return renderForm;
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