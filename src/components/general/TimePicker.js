import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Input, PickerInput } from './';
import { convertStandardToMilitaryTime, convertMilitaryToStandardTime, prepend0 } from '@/utils/events';

class TimePicker extends Component {
	static propTypes = {
		value: PropTypes.string,
		placeholder: PropTypes.string.isRequired,
		onSelect: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);

		let [time, isInitialized] = this.initializeTimePicker();

		this.state = {
			hour: isInitialized ? time[0] : '',
			minute: isInitialized ? time[1] : '',
			period: isInitialized ? time[2] : '',
			hourArr: Array.from({ length: 12 }, (v, k) => k + 1),
			minuteArr: [0, 15, 30, 45],
			periodArr: ['AM', 'PM'],
			focused: isInitialized
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value) {
			const [time, isInitialized] = this.initializeTimePicker();

			this.setState({
				hour: isInitialized ? time[0] : '',
				minute: isInitialized ? time[1] : '',
				period: isInitialized ? time[2] : '',
				focused: isInitialized
			});
		}
	}

	initializeTimePicker() {
		let time = [];

		if (this.props.value) {
			let [hour, minuteAndTimePeriod] = this.props.value.split(':');

			if (minuteAndTimePeriod.length === 2)
				[hour, minuteAndTimePeriod] = convertMilitaryToStandardTime(`${hour}:${minuteAndTimePeriod}`).split(':');

			let [minute, period] = minuteAndTimePeriod.split(' ');

			time = [hour, parseInt(minute), period];
		}
		const isInitialized = time.length === 3;

		if (isInitialized) this.update({ hour: time[0], minute: time[1], period: time[2] });

		return [time, isInitialized];
	}

	update({ hour, minute, period }) {
		if (hour !== '' && minute !== '' && period !== '') {
			this.props.onSelect(
				convertStandardToMilitaryTime(`${prepend0(hour)}:${prepend0(minute)} ${period}`)
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
		const { style, timePickerStyle, fieldContainer, inputBoxStyle, dropDownArrowStyle } = styles;
		const { hour, minute, period, hourArr, minuteArr, periodArr, focused } = this.state;
		const { placeholder } = this.props;

		const defaultPickerStyle = {
			style,
			inputBoxStyle,
			iconSize: 32,
			iconColor: 'black',
			dropDownArrowStyle
		};

		if (!focused) {
			return (
				<Input
					placeholder = { placeholder }
					value = ''
					onFocus = { () => this.setState({ focused: true }) }
				/>
			);
		}
		else {
			return (
				<View style = { timePickerStyle }>
					<View style = { fieldContainer }>
						<PickerInput
							data = { hourArr }
							style = { style }
							title = { 'Enter an hour' }
							value = { hour }
							onSelect = { (text) => this.clickActionHour(text) }
							placeholder = { '12' }
							{ ...defaultPickerStyle }
						/>
					</View>
					<View style = { fieldContainer }>
						<PickerInput
							data = { minuteArr }
							style = { style }
							title = { 'Enter minute' }
							value = { minute !== '' ? prepend0(minute) : '' }
							onSelect = { (text) => this.clickActionMinute(text) }
							placeholder = { '00' }
							{ ...defaultPickerStyle }
						/>
					</View>
					<View style = { fieldContainer }>
						<PickerInput
							data = { periodArr }
							title = { 'Enter AM/PM' }
							value = { period }
							onSelect = { (text) => this.clickActionPeriod(text) }
							placeholder = { 'PM' }
							{ ...defaultPickerStyle }
						/>
					</View>
				</View>
			);
		}
	};
}

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
	timePickerStyle: {
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

TimePicker.defaultProps = {
	placeholder: 'Choose a Time'
};

export { TimePicker };