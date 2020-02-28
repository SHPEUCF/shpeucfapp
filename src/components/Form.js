import React, { Component } from "react";
import {
	Button,
	DatePicker,
	Input,
	PickerInput,
	TimePicker
} from "./";
import PropTypes from "prop-types";

/*
	Form Component Help
	________________________________________________________________
	Props:
		elements<array>: Required
			name<string>: Required,
			camelCaseName<string>: Required
			type<string>: Required,
			isRequired<boolean>: Not Required,
			options<any>: Not Required
		initial Values<array>: Not Required
			name<string>: required,
			value<any>: required
		onSubmit<function>: Required,
		submitButtonName<string>: Not Required

	Output:
		<object>:
			name1<string>: value<any>
			name2<string>: value<any>
			...
			nameN<string>: value<any>
	________________________________________________________________
	Description:
		Dynamic Form component allows you to quickly and easily make
		different forms.

		Pass in an elements props with a description of all the fields
		you want and the form handles all the data management for you.

		When you press submit, the form will call onSubmit and pass in
		the state to the onSubmit function as a parameter.

		**WARNING** isRequired IS NOT YET IMPLEMENTED
	________________________________________________________________
	Examples:
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
		Output:
			{
				firstName: "Haniel",
				lastName: "Diaz",
				birthday: null || "6969/04/20",
				eventType: "Super Cool"
			}
*/

class Form extends Component {
	constructor(props) {
		super(props);
		let values = {};
		this.props.initialValues.forEach(item => values[item.name] = item.value);

		this.setState(values);
	}
	static propTypes = {
		elements: PropTypes.array(
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
		initialValues: PropTypes.array(
			PropTypes.objectOf(
				{
					name: PropTypes.string.isRequired,
					value: PropTypes.any
				}
			)
		),
		onSubmit: PropTypes.func.isRequired,
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
					value = { this.state[camelCaseName] }
					onSelect = { event => this.changeState(name, event.target.value) }
				/>;
			case "Input":
				return <Input
					placeholder = { name }
					value = { this.state[camelCaseName] }
					onChangeText = { event => this.changeState(name, event.target.value) }
				/>;
			case "PickerInput":
				if (!options || !options.data) console.error("You must pass in data through the options property ");
				return <PickerInput
					placeholder = { name }
					value = { this.state[camelCaseName] }
					data = { options.data }
					onSelect = { event => this.changeState(name, event.target.value) }
				/>;
			case "TimePicker":
				return 	<TimePicker
					placeholder = { name }
					value = { this.state[camelCaseName] }
					onSelect = { event => this.changeState(name, event.target.value) }
				/>;
			default:
				console.error("Please Pick a Correct type",
					"\nPossible types are [DatePicker, Input, PickerInput, TimePicker]");
		}
	}

	render() {
		const {
			elements,
			onSubmit,
			submitButtonName
		} = this.props;

		return (
			<Form>
				{ elements.map(item => this.buildElement(item)) }
				<Button
					title = { submitButtonName }
					onPress = { onSubmit(this.state) }
				/>
			</Form>
		);
	}
}

export { Form };