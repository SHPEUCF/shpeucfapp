import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { PickerInput } from "./";
import { prepend0 } from "../../utils/events";

class DatePicker extends Component {
	constructor(props) {
		super(props);

		let date = [];
		if (this.props.value) date = this.props.value.split("-");

		this.state = {
			month: date.length === 3 ? date[1] : "",
			day: date.length === 3 ? date[2] : "",
			year: date.length === 3 ? date[0] : "",
			monthArray: Array.from({ length: 12 }, (v, k) => k + 1),
			yearArray: Array.from({ length: 20 }, (v, k) => new Date().getFullYear() + k)
		};
	}

	static propTypes = {
		value: PropTypes.object,
		onSelect: PropTypes.func.isRequired
	}

	/** Returns an array of days in the current state's month when called */
	getDayArray() {
		const { month, day, year } = this.state;

		const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		const monthInt = parseInt(month);

		const setMaxDay = (maxDay) => { if (day > maxDay) this.setState({ day: maxDay }); };

		if (monthInt == 2 && this.isLeapYear(year)) {
			setMaxDay(29);

			return Array.from({ length: 29 }, (v, k) => k + 1);
		}
		setMaxDay(daysInMonth[monthInt - 1]);

		return Array.from({ length: daysInMonth[monthInt - 1] }, (v, k) => k + 1);
	}

	/** Returns true if the input year is a leap year. Must be an int. */
	isLeapYear = (year) => (year % 4 === 0) && (year % 100 != 0) || (year % 400 == 0)

	/** Sets the date by calling the onSelect function in the Form component. */
	setDate = ({ month, day, year }) => this.props.onSelect(`${year}-${month}-${day}`)

	/**
	 * Calls the setDate function and sets the month/day/year based on a given value and type.
	 * Month and day will be prepended with a single 0.
	 * @param {Number} item Any number.
	 * @param {String} type String that describes which value is being changed. Must be "month", "day", or "year".
	*/
	changeStateOfType(item, type) {
		const { month, day, year } = this.state;

		switch (type) {
			case "month":
				this.setState({ month: prepend0(item) });
				break;
			case "day":
				this.setState({ day: prepend0(item) });
				break;
			case "year":
				this.setState({ year: item });
				break;
		}

		if (month && day && year) this.setDate({ month, day, year });
	}

	render = () => {
		const { style, datePickerStyle, fieldContainer, inputBoxStyle, dropDownArrowStyle } = styles;
		const { month, day, year, monthArray, yearArray } = this.state;

		let iconSize = 32;

		return (
			<View style = { datePickerStyle }>
				<View style = { fieldContainer }>
					<PickerInput
						data = { monthArray }
						style = { style }
						title = { "Enter a Month" }
						inputBoxStyle = { inputBoxStyle }
						dropDownArrowStyle = { dropDownArrowStyle }
						iconSize = { iconSize }
						iconColor = 'black'
						value = { month }
						onSelect = { (text) => this.changeStateOfType(text, "month") }
						placeholder = { "MM" }
					/>
				</View>
				<View style = { fieldContainer }>
					<PickerInput
						data = { this.getDayArray() }
						style = { style }
						title = { "Enter a Day" }
						inputBoxStyle = { inputBoxStyle }
						dropDownArrowStyle = { dropDownArrowStyle }
						iconSize = { iconSize }
						iconColor = 'black'
						value = { day }
						onSelect = { (text) => this.changeStateOfType(text, "day") }
						placeholder = { "DD" }
					/>
				</View>
				<View style = { fieldContainer }>
					<PickerInput
						data = { yearArray }
						style = { style }
						title = { "Enter a Year" }
						inputBoxStyle = { inputBoxStyle }
						iconSize = { iconSize }
						iconColor = 'black'
						dropDownArrowStyle = { dropDownArrowStyle }
						value = { year }
						onSelect = { (text) => this.changeStateOfType(text, "year") }
						placeholder = { "YYYY" }
					/>
				</View>
			</View>
		);
	};
}

const styles = {
	titleStyle: {
		flex: 0.13,
		alignSelf: "center",
		fontSize: 20
	},
	buttonStyle: {
		flex: 1,
		alignSelf: "center"
	},
	fieldContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	style: {
		flex: 1,
		width: 130
	},
	inputBoxStyle: {
		flex: 0.42,
		borderRadius: 15,
		margin: 5,
		padding: 7
	},
	dropDownArrowStyle: {
		flex: 0.3,
		paddingLeft: 0
	},
	datePickerStyle: {
		flex: 1,
		color: "#000",
		fontSize: 16,
		backgroundColor: "white",
		borderRadius: 25,
		flexDirection: "row",
		marginTop: 8,
		marginBottom: 8
	}
};

export { DatePicker };