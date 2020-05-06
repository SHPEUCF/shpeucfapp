import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Input } from "./Input";
import { PickerInput } from "./PickerInput";

class DatePicker extends Component {
	constructor(props) {
		super(props);

		let date = [];
		if (this.props.value) date = this.props.value.split("-");

		this.state = {
			month: date.length === 3 ? date[1] : "",
			day: date.length === 3 ? date[2] : "",
			year: date.length === 3 ? date[0] : "",
			monthArr: Array.from({ length: 12 }, (v, k) => k + 1),
			dayArr: Array.from({ length: 31 }, (v, k) => k + 1),
			yearArr: Array.from({ length: 101 }, (v, k) => new Date().getFullYear() - k),
			focused: date.length === 3
		};
	}

		static propTypes = {
			value: PropTypes.object,
			placeholder: PropTypes.string.isRequired,
			onSelect: PropTypes.func.isRequired
		}

		prepend0(item) {
			if (item < 10)
				return "0" + item;

			return item;
		}

		leapYear(year) {
			return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
		}

		update(item) {
			const {
				month,
				day,
				year
			} = item;
			this.props.onSelect(`${year}-${month}-${day}`);
		}

		clickActionMonth(item) {
			const {
				day,
				year
			} = this.state;

			item = this.prepend0(item);

			this.setState({ month: item });
			const month30 = [false, false, false, true, false, true,
				false, false, true, false, true, false];

			if (item === 2)
				if (year != 0 && this.leapYear(year)) {
					this.setState({ dayArr: Array.from({ length: 29 }, (v, k) => k + 1) });
					if (day > 29) this.setState({ day: 29 });
				}
				else {
					this.setState({ dayArr: Array.from({ length: 28 }, (v, k) => k + 1) });
					if (day > 28) this.setState({ day: 28 });
				}
			if (month30[item]) {
				this.setState({ dayArr: Array.from({ length: 30 }, (v, k) => k + 1) });
				if (day > 30) this.setState({ day: 30 });
			}
			else if (item !== 2) {
				this.setState({ dayArr: Array.from({ length: 31 }, (v, k) => k + 1) });
			}
			if (day !== "" && year !== "")
				this.update({ day: day, month: item, year: year });
		}
		clickActionDay(item) {
			const {
				month,
				year
			} = this.state;

			item = this.prepend0(item);
			this.setState({ day: item });

			if (month !== "" && year !== "")
				this.update({ day: item, month: month, year: year });
		}

		clickActionYear(item) {
			const {
				month,
				day
			} = this.state;

			this.setState({ year: item });

			if (month === "2" && this.leapYear(item)) {
				this.setState({ dayArr: Array.from({ length: 29 }, (v, k) => k + 1) });
				if (day > 29) this.setState({ day: "29" });
			}
			if (month !== "" && day !== "")
				this.update({ day: day, month: month, year: item });
		}

	_keyExtractor = (item, index) => index;

	render = () => {
		const {
			style,
			datePickerStyle,
			fieldContainer,
			inputBoxStyle,
			dropDownArrowStyle
		} = styles;
		const {
			placeholder
		} = this.props;
		const {
			month,
			day,
			year,
			monthArr,
			dayArr,
			yearArr,
			focused
		} = this.state;

		let iconSize = 32;

		if (!focused)
			return (
				<View>
					<Input
						placeholder = { placeholder }
						value = ""
						onFocus = { () => this.setState({ focused: true }) }
					/>
				</View>
			);
		else
			return (
				<View>
					<View style = { datePickerStyle }>
						<View style = { fieldContainer }>
							<PickerInput
								data = { monthArr }
								style = { style }
								title = { "Enter a Month" }
								inputBoxStyle = { inputBoxStyle }
								dropDownArrowStyle = { dropDownArrowStyle }
								iconSize = { iconSize }
								iconColor = 'black'
								value = { month }
								onSelect = { (text) => this.clickActionMonth(text) }
								placeholder = { "MM" }
							/>
						</View>
						<View style = { fieldContainer }>
							<PickerInput
								data = { dayArr }
								style = { style }
								title = { "Enter a Day" }
								inputBoxStyle = { inputBoxStyle }
								dropDownArrowStyle = { dropDownArrowStyle }
								iconSize = { iconSize }
								iconColor = 'black'
								value = { day }
								onSelect = { (text) => this.clickActionDay(text) }
								placeholder = { "DD" }
							/>
						</View>
						<View style = { fieldContainer }>
							<PickerInput
								data = { yearArr }
								style = { style }
								title = { "Enter a Year" }
								inputBoxStyle = { inputBoxStyle }
								iconSize = { iconSize }
								iconColor = 'black'
								dropDownArrowStyle = { dropDownArrowStyle }
								value = { year }
								onSelect = { (text) => this.clickActionYear(text) }
								placeholder = { "YYYY" }
							/>
						</View>
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

DatePicker.defaultProps = {
	placeholder: "Choose a Date"
};

export { DatePicker };