import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Input } from './Input';
import { PickerInput } from './PickerInput';
import { convertTimeTo } from '@/utils/events';

/**
 * Picker to select hour, minute, and period.
 *
 * @typedef {Object} TimePickerProps
 * @prop {string}   value        Initial value of time.
 * @prop {Function} onSelect     Callback to use new time values picked.
 * @prop {string=}  placeholder  Placeholder for time picker input.
 *
 * @param {TimePickerProps}
 */

export const TimePicker = ({ value, onSelect, placeholder = 'Choose a time' }) => {
	const [initHour = '', initMinute = '', initPeriod = ''] = value && convertTimeTo(value, 'standard');
	const [hour, setHour] = useState(initHour);
	const [minute, setMinute] = useState(initMinute);
	const [period, setPeriod] = useState(initPeriod);
	const [focused, setFocused] = useState(false);

	const hourArray = Array.from(Array(12), (v, hour) => hour + 1);
	const minuteArray = [0, 15, 30, 45];
	const periodArray = ['AM', 'PM'];

	useEffect(() => {
		(hour && minute && period) && onSelect(convertTimeTo(`${hour}:${minute} ${period}`, 'military').join(':'));
	}, [hour, minute, period]);

	/**
	 * @description Sets the hour/min/period based on a given time and time type.
	 *
	 * @param {string}                       timeValue  Contains the value of hour/minute/time.
	 * @param {'hour' | 'minute' | 'period'} type       Describes which value is being changed.
	 */
	const changeStateOfType = (timeValue, type) => {
		switch (type) {
			case 'hour':
				return setHour(timeValue);
			case 'minute':
				return setMinute(timeValue);
			case 'period':
				return setPeriod(timeValue);
		}
	};

	const { style, timePickerStyle, fieldContainer, inputBoxStyle, dropDownArrowStyle } = styles;
	const defaultPickerStyle = { style, inputBoxStyle, iconSize: 32, iconColor: 'black', dropDownArrowStyle };
	const pickers = [
		{ data: hourArray, time: 'hour', value: hour, placeholder: '12' },
		{ data: minuteArray, time: 'minute', value: minute.padStart(2, '0'), placeholder: '00' },
		{ data: periodArray, time: 'AM/AP', value: period, placeholder: 'PM' }
	];

	return (
		!focused && <Input placeholder = { placeholder } value = '' onFocus = { () => setFocused(true) } />
			|| <View style = { timePickerStyle }>
				{ pickers.map(({ time, ...timeProps }) =>
					<View style = { fieldContainer }>
						<PickerInput
							title = { `Enter ${time}` }
							onSelect = { time => changeStateOfType(time, time) }
							{ ...timeProps }
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
		marginVertical: 8
	}
};