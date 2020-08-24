import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Input, PickerInput } from './';
import { prepend0 } from '../../utils/events';

class DatePicker extends Component {
	constructor(props) {
		super(props);

		let date = [];
		if (this.props.value) date = this.props.value.split('-');

		this.state = {
			month: date.length === 3 ? date[1] : '',
			day: date.length === 3 ? date[2] : '',
			year: date.length === 3 ? date[0] : '',
			monthArray: Array.from({ length: 12 }, (v, k) => k + 1),
			yearArray: Array.from({ length: 20 }, (v, k) => new Date().getFullYear() + k),
			focused: date.length === 3
		};
	}

	static propTypes = {
		value: PropTypes.string,
		placeholder: PropTypes.string.isRequired,
		onSelect: PropTypes.func.isRequired
	}

	/** Returns an array of days in the current state's month when called. */
	getDayArray() {
		const { month, day, year } = this.state;

		const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		const monthIndex = parseInt(month);

		const setMaxDay = (maxDay) => {
			if (day > maxDay) this.setState({ day: maxDay });
		};

		if (monthIndex === 2 && this.isLeapYear(year)) {
			setMaxDay(29);

			return Array.from({ length: 29 }, (v, k) => k + 1);
		}
		setMaxDay(daysInMonth[monthIndex - 1]);

		return Array.from({ length: daysInMonth[monthIndex - 1] }, (v, k) => k + 1);
	}

	isLeapYear = (year) => (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)

	/** Sets the date by calling the onSelect function in the Form component. */
	setDate = ({ month, day, year }) => this.props.onSelect(`${year}-${month}-${day}`)

	/**
	 * Calls the setDate function and sets the month/day/year based on a given value and type.
	 * Month and day will be prepended with a single 0.
	 *
	 * @param {Number}  item - Number that contains the value of month/day/year.
	 * @param {String}  type - String that describes which value is being changed. Must be "month", "day", or "year".
	*/
	changeStateOfType(item, type) {
		const callback = () => {
			const { month, day, year } = this.state;
			if (month && day && year) this.setDate(this.state);
		};

		switch (type) {
			case 'month':
				this.setState({ month: prepend0(item) }, callback);
				break;
			case 'day':
				this.setState({ day: prepend0(item) }, callback);
				break;
			case 'year':
				this.setState({ year: item }, callback);
				break;
		}
	}

	render = () => {
		const { style, datePickerStyle, fieldContainer, inputBoxStyle, dropDownArrowStyle } = styles;
		const { month, day, year, monthArray, yearArray, focused } = this.state;
		const { placeholder } = this.props;

		const defaultPickerStyle = {
			style,
			inputBoxStyle,
			iconSize: 32,
			iconColor: 'black',
			dropDownArrowStyle
		};

		if (!focused) {
			return <Input placeholder = { placeholder } value = '' onFocus = { () => this.setState({ focused: true }) } />;
		}
		else {
			return (
				<View style = { datePickerStyle }>
					<View style = { fieldContainer }>
						<PickerInput
							data = { monthArray }
							title = { 'Enter a Month' }
							value = { month }
							onSelect = { (text) => this.changeStateOfType(text, 'month') }
							placeholder = { 'MM' }
							{ ...defaultPickerStyle }
						/>
					</View>
					<View style = { fieldContainer }>
						<PickerInput
							data = { this.getDayArray() }
							title = { 'Enter a Day' }
							value = { day }
							onSelect = { (text) => this.changeStateOfType(text, 'day') }
							placeholder = { 'DD' }
							{ ...defaultPickerStyle }
						/>
					</View>
					<View style = { fieldContainer }>
						<PickerInput
							data = { yearArray }
							title = { 'Enter a Year' }
							value = { year }
							onSelect = { (text) => this.changeStateOfType(text, 'year') }
							placeholder = { 'YYYY' }
							{ ...defaultPickerStyle }
						/>
					</View>
				</View>
			);
		}
	};
}

DatePicker.defaultProps = { placeholder: 'Choose a Date' };

const styles = {
	fieldContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
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
		color: '#000',
		fontSize: 16,
		backgroundColor: 'white',
		borderRadius: 25,
		flexDirection: 'row',
		marginTop: 8,
		marginBottom: 8
	}
};

export { DatePicker };