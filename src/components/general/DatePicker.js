import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Input, PickerInput } from "./";

/**
 * @desc Component to select day, month, and year.
 *
 * @typedef {Object} Props
 * @prop {String}           value        Initial value of date.
 * @prop {Function}         onSelect     Callback to use new date values picked.
 * @prop {String=}          placeholder  Placeholder for date picker input.
 *
 * @param {...Props}
 */

export const DatePicker = ({ value, onSelect, placeholder = "Choose a date" }) => {
	const [initYear = "", initMonth = "", initDay = ""] = value && value.split("-") || [];
	const [year, setYear] = useState(initYear);
	const [month, setMonth] = useState(initMonth);
	const [day, setDay] = useState(initDay);
	const [focused, setFocus] = useState(!!value);

	const monthArray = Array.from(Array(12), (_, month) => month + 1);
	const yearArray = Array.from(Array(20), (_, year) => new Date().getFullYear() + year);

	useEffect(() => {
		(month && day && year) && onSelect(`${year}-${month}-${day}`);
	}, [year, month, day]);

	const getDayArray = () => {
		const isLeapYear = year => (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);
		const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		(maxDay => (day > maxDay) && setDay(maxDay))(daysInMonth[month - 1]); // Set max day for selected month

		return Array.from(Array(daysInMonth[month - 1]), (_, day) => day + 1);
	};

	/**
	 * @description Sets the month/day/year based on a given date and date type.
	 *
	 * @param {String}                   dateValue  Contains the value of month/day/year.
	 * @param {'month' | 'day' | 'year'} type       Describes which value is being changed.
	 */

	const changeStateOfType = (dateValue, type) => {
		if (type === "month")
			return setMonth(dateValue.padStart(2, "0"));
		else if (type === "day")
			return setDay(dateValue.padStart(2, "0"));
		else if (type === "year")
			return setYear(dateValue);
	};

	const { style, datePickerStyle, fieldContainer, inputBoxStyle, dropDownArrowStyle } = styles;
	const defaultPickerStyle = { style, inputBoxStyle, iconSize: 32, iconColor: "black", dropDownArrowStyle };
	const pickers = [
		{ data: monthArray, date: "month", value: month, placeholder: "MM" },
		{ data: getDayArray(), date: "day", value: day, placeholder: "DD" },
		{ data: yearArray, date: "year", value: year, placeholder: "YYYY" }
	];

	return (
		!focused && <Input placeholder = { placeholder } value = "" onFocus = { () => setFocus(true) } />
		|| <View style = { datePickerStyle }>
			{ pickers.map(({ date, ...dateProps }) =>
				<View style = { fieldContainer } key = { date }>
					<PickerInput
						title = { `Enter a ${date}` }
						onSelect = { dateNum => changeStateOfType(dateNum.toString(), date) }
						{ ...dateProps }
						{ ...defaultPickerStyle }
					/>
				</View>
			) }
		</View>
	);
};

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