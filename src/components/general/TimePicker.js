import React, { Component } from "react";
import PropTypes from "prop-types";
import {	View } from "react-native";
import { Input } from "./Input";
import { convertStandardToMilitaryTime, prependZero } from "../../utils/events";
import { PickerInput } from "./PickerInput";

class TimePicker extends Component {
	constructor(props) {
		super(props);

		let time = [];

		if (this.props.value) {
			time = this.props.value.split(":");
			time = [prependZero(time[0]), ...time[1].split(" ")];
		}

		const isInitialized = time.length === 3;
		if (isInitialized) this.update({ hour: time[0], minute: time[1], period: time[2] });

		this.state = {
			hour: isInitialized ? time[0] : "",
			minute: isInitialized ? time[1] : "",
			period: isInitialized ? time[2] : "",
			hourArr: Array.from({ length: 12 }, (v, k) => k + 1),
			minuteArr: [0, 15, 30, 45],
			periodArr: ["AM", "PM"],
			focused: isInitialized
		};
	}

	static propTypes = {
		value: PropTypes.string,
		placeholder: PropTypes.string.isRequired,
		onSelect: PropTypes.func.isRequired
	}

	update({ hour, minute, period }) {
		if (hour !== "" && minute !== "" && period !== "") {
			this.props.onSelect(
				convertStandardToMilitaryTime(`${prependZero(hour)}:${prependZero(minute)} ${period}`)
			);
		}
	}

	clickActionHour(hour) {
		const { minute, period } = this.state;
		this.setState({ hour });
		this.update({ hour, minute, period });
	}

	clickActionMinute(minute) {
		const { hour, period } = this.state;
		this.setState({ minute });
		this.update({ hour, minute, period });
	}

	clickActionPeriod(period) {
		const { hour, minute } = this.state;
		this.setState({ period });
		this.update({ hour, minute, period });
	}

	render = () => {
		const {
			style,
			timePickerStyle,
			fieldContainer,
			inputBoxStyle,
			dropDownArrowStyle
		} = styles;
		const {
			placeholder
		} = this.props;
		const {
			hour,
			minute,
			period,
			hourArr,
			minuteArr,
			periodArr,
			focused
		} = this.state;

		let iconSize = 32;

		if (!focused) {
			return (
				<View>
					<Input
						placeholder = { placeholder }
						value = ""
						onFocus = { () => this.setState({ focused: true }) } />
				</View>
			);
		}
		else {
			return (
				<View>
					<View style = { timePickerStyle }>
						<View style = { fieldContainer }>
							<PickerInput
								data = { hourArr }
								style = { style }
								title = { "Enter an hour" }
								inputBoxStyle = { inputBoxStyle }
								dropDownArrowStyle = { dropDownArrowStyle }
								iconSize = { iconSize }
								iconColor = 'black'
								value = { hour }
								onSelect = { (text) => this.clickActionHour(text) }
								placeholder = { "HH" }
							/>
						</View>
						<View style = { fieldContainer }>
							<PickerInput
								data = { minuteArr }
								style = { style }
								title = { "Enter minute" }
								inputBoxStyle = { inputBoxStyle }
								dropDownArrowStyle = { dropDownArrowStyle }
								iconSize = { iconSize }
								iconColor = 'black'
								value = { minute }
								onSelect = { (text) => this.clickActionMinute(text) }
								placeholder = { "MM" }
							/>
						</View>
						<View style = { fieldContainer }>
							<PickerInput
								data = { periodArr }
								style = { style }
								title = { "Enter AM/PM" }
								inputBoxStyle = { inputBoxStyle }
								iconSize = { iconSize }
								iconColor = 'black'
								dropDownArrowStyle = { dropDownArrowStyle }
								value = { period }
								onSelect = { (text) => this.clickActionPeriod(text) }
								placeholder = { "AM/PM" }
							/>
						</View>
					</View>
				</View>
			);
		}
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
	timePickerStyle: {
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

TimePicker.defaultProps = {
	placeholder: "Choose a Time"
};

export { TimePicker };