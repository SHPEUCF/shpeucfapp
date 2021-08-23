import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { modalfy } from 'react-native-modalfy';
import { Icon } from '@/components';
import { modalAnimation } from './utils';

/**
 * Alert Modal component to render with modalfy.
 *
 * @typedef AlertModalProps
 * @prop {Object}      modal         Modalfy modal object
 * @prop {AlertConfig} modal.params  Modal configuration
 *
 * @param {AlertModalProps}
 */

export const AlertModal = ({ modal: { closeModal, params: { submit, cancel, message, title, type } } }) => {
	AlertModal.modalOptions = { backdropColor: 'green', backdropOpacity: 1 };

	const close = button => {
		const callback = { submit, cancel };
		const buttonPress = _.isFunction(callback[button])
			? callback[button]
			: callback[button] && callback[button].onPress;

		closeModal();
		buttonPress && buttonPress();
	};

	const renderTitle = () => {
		const { titleStyle, padding, center, titleContainer, textTitleContainer } = styles;

		const icon = () => {
			switch (type) {
				case 'confirmation':
					return <Icon type = 'AntDesign' name = 'questioncircleo' color = 'white' size = { 24 } />;
				case 'success':
					return <Icon type = 'AntDesign' name = 'checkcircleo' color = 'green' size = { 24 } />;
				case 'error':
					return <Icon type = 'AntDesign' name = 'closecircleo' color = 'red' size = { 24 } />;
				default:
					return <Icon type = 'AntDesign' name = 'warning' color = 'orange' size = { 24 } />;
			}
		};

		return (
			<View style = { [titleContainer, padding] }>
				<View style = { [center, { paddingRight: '4%' }] }>
					{ icon() }
				</View>
				<View style = { textTitleContainer }>
					<Text style = { titleStyle } numberOfLines = { 2 }>{ title || 'Alert' }</Text>
				</View>
			</View>
		);
	};

	const renderButton = () => {
		const { center, text, buttonText, buttonContainer, confirmButton, cancelButton } = styles;

		const submitTitle = submit && submit.title;
		const cancelTitle = cancel && cancel.title;

		if (type === 'confirmation') {
			return (
				<View style = { buttonContainer } >
					<TouchableOpacity style = { [center, confirmButton] } onPress = { () => close('submit') }>
						<Text style = { [text, buttonText] }>{ submitTitle || 'Confirm' }</Text>
					</TouchableOpacity>
					<TouchableOpacity style = { [center, cancelButton] } onPress = { () => close('cancel') }>
						<Text style = { [text, buttonText] }>{ cancelTitle || 'Cancel' }</Text>
					</TouchableOpacity>
				</View>
			);
		}
		else {
			return (
				<TouchableOpacity style = { [center, buttonContainer] } onPress = { () => close('submit') }>
					<Text style = { [text, buttonText] }>{ submitTitle || 'Ok' }</Text>
				</TouchableOpacity>
			);
		}
	};

	const { alertContainer, padding, text } = styles;

	return (
		<View style = { alertContainer }>
			{ renderTitle() }
			<ScrollView style = { [{ marginVertical: '3%' }, padding] }>
				<Text style = { text }>{ message }</Text>
			</ScrollView>
			{ renderButton() }
		</View>
	);
};

AlertModal.modalOptions = modalAnimation('fade');

/**
 * @typedef {Object} AlertConfig
 * @prop {string=}                  title           Title of alert
 * @prop {('alert'|'confirmation'|
 *		     'error'|'success')=}     type            Type of alert to display
 * @prop {Object|Function}          submit          Config or function to execute with submit button
 * @prop {string}                   submit.title    Title of confirm button
 * @prop {Function}                 submit.onPress  onPress of confirm button
 * @prop {Object|Function}          cancel          Config or function to execute with cancel button
 * @prop {string}                   cancel.title    Title of cancel button
 * @prop {Function}                 cancel.onPress  onPress of cancel button
 */

/**
 * Function to render an Alert.
 *
 * @param {string}       message  Message for alert to display
 * @param {AlertConfig=} config   Additional configuration for alert
 */

export const Alert = (message, config = { title: 'Alert', type: 'alert' }) => {
	const { openModal } = modalfy();

	openModal('AlertModal', { message, ...config });
};

const styles = {
	alertContainer: {
		flex: 1,
		borderRadius: 5,
		backgroundColor: 'rgba(33, 37, 43, 0.94)'
	},
	titleStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white'
	},
	text: {
		fontSize: 16,
		color: 'white'
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	padding: {
		paddingHorizontal: '5%'
	},
	buttonText: {
		fontWeight: '600'
	},
	buttonContainer: {
		height: '25%',
		flexDirection: 'row',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopWidth: 1,
		borderTopColor: 'rgba(255, 255, 255, 0.7)'
	},
	confirmButton: {
		flex: 1,
		borderRightWidth: 0.5,
		borderRightColor: 'rgba(255, 255, 255, 0.7)'
	},
	cancelButton: {
		flex: 1,
		borderLeftWidth: 0.5,
		borderLeftColor: 'rgba(255, 255, 255, 0.7)'
	},
	titleContainer: {
		flexDirection: 'row',
		paddingTop: '5%'
	}
};