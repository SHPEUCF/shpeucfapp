import React, { Component } from "react";
import { View } from "react-native";
import { Input, PickerInput } from "./";

const monthArray = Array.from(Array(12), (_, month) => month + 1);
const yearArray = Array.from(Array(20), (_, year) => new Date().getFullYear() + year);

export class DatePicker extends Component {
	constructor(props) {
		super(props);
		let [year = "", month = "", day = ""] = this.props.value && this.props.value.split("-") || [];

		this.state = { month, day, year, focused: !!this.props.value };
	}

	getDayArray() {
		const { month, day, year } = this.state;

		const isLeapYear = year => (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);
		const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		const setMaxDay = maxDay => (day > maxDay) && this.setState({ day: maxDay });

		setMaxDay(daysInMonth[month - 1]);

		return Array.from(Array(daysInMonth[month - 1]), (_, day) => day + 1);
	}

	/**
	 * @description Calls the setDate function and sets the month/day/year based on a given value and type.
	 *
	 * @param {String}                   dateValue  Contains the value of month/day/year.
	 * @param {'month' | 'day' | 'year'} type       Describes which value is being changed.
	 */

	changeStateOfType(dateValue, type) {
		const { month, day, year } = this.state;

		console.log(typeof dateValue, dateValue);
		const setDate = () => (month && day && year) && this.props.onSelect(`${year}-${month}-${day}`);

		switch (type) {
			case "month":
				this.setState({ month: dateValue.padStart(2, "0") }, setDate);
				break;
			case "day":
				this.setState({ day: dateValue.padStart(2, "0") }, setDate);
				break;
			case "year":
				this.setState({ year: dateValue }, setDate);
		}
	}

	render() {
		const { style, datePickerStyle, fieldContainer, inputBoxStyle, dropDownArrowStyle } = styles;
		const { month, day, year, focused } = this.state;
		const { placeholder } = this.props;

		const defaultPickerStyle = { style, inputBoxStyle, iconSize: 32, iconColor: "black", dropDownArrowStyle };
		const pickers = [
			{ data: monthArray, date: "month", value: month, placeholder: "MM" },
			{ data: this.getDayArray(), date: "day", value: day, placeholder: "DD" },
			{ data: yearArray, date: "year", value: year, placeholder: "YYYY" }
		];

		return (
			!focused && <Input placeholder = { placeholder } value = "" onFocus = { () => this.setState({ focused: true }) } />
			|| <View style = { datePickerStyle }>
				{ pickers.map(({ date, ...dateProps }) =>
					<View style = { fieldContainer }>
						<PickerInput
							title = { `Enter a ${date}` }
							onSelect = { dateNum => this.changeStateOfType(dateNum.toString(), date) }
							{ ...dateProps }
							{ ...defaultPickerStyle }
						/>
					</View>
				) }
			</View>
		);
	}
}

DatePicker.defaultProps = { placeholder: "Choose a date" };

const styles = {
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
		marginVertical: 8
	}
};