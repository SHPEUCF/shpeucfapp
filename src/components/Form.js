import React, { Component } from "react";
import {
	Button,
	DatePicker,
	NavBar,
	Input,
	PickerInput,
	TimePicker
} from "./";
import PropTypes from "prop-types";
import {
	View,
	ScrollView,
	SafeAreaView,
	Modal,
	Dimensions
} from "react-native";

/*
	Form Component Info
	________________________________________________________________
	PROPS:
		elements<array>: Required
			name<string>: Required,
			camelCaseName<string>: Required
			type<string>: Required,
			isRequired<boolean>: Not Required,
			options<any>: Not Required
		initial Values<array>: Not Required
			name<string>: required,
			value<any>: required
		title<string>: Required,
		visible<boolean>: Required,
		onSubmit<function>: Required,
		onCancel<function>: Not Required,
		submitButtonName<string>: Not Required

	Output:
		<object>:
			name1<string>: value<any>
			name2<string>: value<any>
			...
			nameN<string>: value<any>
	________________________________________________________________
	DESCRIPTION:
		Dynamic Form component allows you to quickly and easily make
		different forms.

		When making a new form, create a definition in FormData.json
		and pass it in through the elements prop.

		**WARNING** isRequired IS NOT YET IMPLEMENTED

	________________________________________________________________
	Using Component:

		To view the component you must pass in a visibility state from
		the parent component.The component will close automatically
		when you pass in a changeVisibility wrapper function
		(See changeVisibility Example)

		Pass in an elements props with a description of all the fields
		you want and the form handles all the data management
		for you. (See elements Example)

		When you press submit, the form will call onSubmit and pass in
		the state to the onSubmit function as a parameter.
		(See onSubmit Example)

		If you are using PickerInput you need to pass in data using
		the options property. **NOTE** You should only use data from the
		FormData.json file inside of the /data folder

	________________________________________________________________
	EXAMPLES:
		Input:
			elements = [
				{
					name: "First Name",
					camelCaseName: "firstName",
					type: "Input",
					isRequired: true,
				},
				{
					name: "Last Name",
					camelCaseName: "lastName",
					type: "Input",
					isRequired: true,
				},
				{
					name: "Birthday",
					camelCaseName: "birthday",
					type: "DatePicker"
				},
				{
					name: "Coolness Level",
					camelCaseName: "coolnessLevel",
					type: "PickerInput",
					isRequired: true,
					options: {
						data: ["Super Cool", "Cool", "Uncool", "Super Uncool"]
					}
				}
			]

			initialValue = [
				{
					name: "firstName",
					value: "Steven"
				},
				{
					name: "lastName",
					value: "Perdomo"
				},
				{
					name: "birthday",
					value: "2001-01-01"
				},
				{
					name: "coolnessLevel",
					value: "Super Uncool"
				}
			]

			title = ""

			onSubmit = (value) => {
				console.log(`this is the value: ${value}`)
			}

			onCancel = () => {
				console.log("I've been cancelled")
			}

			visibility = true
			changeVisibility = (visible) => {
				this.setState({ formVisibility: visible })
			}

			submitButtonName = "Confirm Coolness Level"

		Output:
			this.state = {
				firstName: "Haniel",
				lastName: "Diaz",
				birthday: null || "6969/04/20",
				eventType:  "Super Cool"
			}
			onSubmit(this.state)
*/
const dimension = Dimensions.get("screen");

class Form extends Component {
	constructor(props) {
		super(props);
		let values = {};
		if (this.props.initialValues)
			this.props.initialValues.forEach(item => values[item.name] = item.value);

		this.state = values;

		// console.error(JSON.stringify(this.state));
	}
	static propTypes = {
		elements: PropTypes.arrayOf(
			PropTypes.objectOf(
				{
					name: PropTypes.string.isRequired,
					camelCaseName: PropTypes.string.isRequired,
					type: PropTypes.string.isRequired,
					isRequired: PropTypes.bool,
					options: PropTypes.any
				}
			)
		).isRequired,
		initialValues: PropTypes.arrayOf(
			PropTypes.objectOf(
				{
					name: PropTypes.string.isRequired,
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

	changeState(name, val) {
		if (!val) val = "";
		this.setState({
			[name]: val
		});
	}

	buildElement(item) {
		const {
			name,
			camelCaseName,
			type,
			// isRequired,
			options
		} = item;

		switch (type) {
			case "DatePicker":
				return <DatePicker
					placeholder = { name }
					value = { this.state[camelCaseName] || "" }
					onSelect = { value => this.changeState(camelCaseName, value) }
				/>;
			case "Input":
				return <Input
					placeholder = { name }
					multiline = { false }
					value = { this.state[camelCaseName] || "" }
					onChangeText = { value => this.changeState(camelCaseName, value) }
				/>;
			case "PickerInput":
				if (!options || !options.data) console.error("You must pass in data through the options property ");
				return <PickerInput
					placeholder = { name }
					value = { this.state[camelCaseName] || "" }
					data = { options.data }
					onSelect = { value => this.changeState(camelCaseName, value) }
				/>;
			case "TimePicker":
				return 	<TimePicker
					placeholder = { name }
					value = { this.state[camelCaseName] || "" }
					onSelect = { value => this.changeState(camelCaseName, value) }
				/>;
			default:
				console.error("Please Pick a Correct type",
					"\nPossible types are [DatePicker, Input, PickerInput, TimePicker]");
				return null;
		}
	}

	renderButtons() {
		const {
			onSubmit,
			onCancel,
			changeVisibility,
			submitButtonName
		} = this.props;

		const {
			buttonsStyle,
			buttonStyle
		} = styles;

		return (
			<View style = { buttonsStyle }>
				<View style = { buttonStyle }>
					<Button
						title = "Cancel"
						onPress = { () => {
							changeVisibility(false);
							if (onCancel)
								onCancel();
						} }
					/>
				</View>
				<View style = { buttonStyle }>
					<Button
						title = { submitButtonName || "Confirm" }
						onPress = { () => {
							changeVisibility(false);
							onSubmit(this.state);
						} }
					/>
				</View>
			</View>
		);
	}

	render() {
		const {
			elements,
			title,
			changeVisibility,
			visible
		} = this.props;

		const {
			container,
			elementsStyle
		} = styles;

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
						{ elements.map(item => this.buildElement(item)) }
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
		width: dimension.width,
		height: dimension.height,
		backgroundColor: "black"
	},
	elementsStyle: {
		flex: 0.8
	},
	buttonsStyle: {
		flex: 0.2,
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%"
	},
	buttonStyle: {
		flex: 0.4
	}
};

export { Form };