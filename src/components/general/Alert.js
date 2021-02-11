import React, { Component } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Animate, Icon } from './';
import _ from 'lodash';

/**
 * @classdesc Component that renders the alert box component using the Animation component. It is only
 *            rendered once, then its state is changed accordingly. No props are passed in to the function.
 */

class AlertComponent extends Component {
	constructor(props) {
		super(props);

		this.state = { visible: false, message: '', title: '', type: '' };
	}

	changeAlert(updatedAlert) {
		this.setState({ visible: true, ...updatedAlert }, () => {
			Animate.animation({ relative: { ratio: 0.375 }, duration: 800, easing: ['out', 'back'], easeValue: 1 });
		});
	}

	close(button) {
		const buttonPress = _.isFunction(this.state[button])
			? this.state[button]
			: this.state[button] && this.state[button].onPress;

		Animate.animation({ relative: { ratio: 1.0 }, duration: 800, easing: 'back', easeValue: 1 }, () => {
			this.setState({ visible: false, submit: {}, cancel: {} });
			buttonPress && buttonPress();
		});
	}

	renderTitle() {
		const { title, padding, center, titleContainer, textTitleContainer } = styles;

		const icon = () => {
			switch (this.state.type || 'alert') {
				case 'confirmation':
					return <Icon type = 'AntDesign' name = 'questioncircleo' color = 'white' size = { 24 } />;
				case 'success':
					return <Icon type = 'AntDesign' name = 'checkcircleo' color = 'green' size = { 24 } />;
				case 'error':
					return <Icon type = 'AntDesign' name = 'closecircleo' color = 'red' size = { 24 } />;
				case 'alert':
					return <Icon type = 'AntDesign' name = 'warning' color = 'orange' size = { 24 } />;
			}
		};

		return (
			<View style = { [titleContainer, padding] }>
				<View style = { [center, { paddingRight: '4%' }] }>
					{ icon() }
				</View>
				<View style = { textTitleContainer }>
					<Text style = { title } numberOfLines = { 2 }>{ this.state.title || 'Alert' }</Text>
				</View>
			</View>
		);
	}

	renderMessage() {
		const { padding, text } = styles;

		return (
			<ScrollView style = { [{ marginVertical: '3%' }, padding] }>
				<Text style = { text }>{ this.state.message }</Text>
			</ScrollView>
		);
	}

	renderButton() {
		const { center, text, buttonText, buttonContainer, confirmButton, cancelButton } = styles;
		const { submit, cancel, type } = this.state;

		let submitTitle = submit && submit.title;
		let cancelTitle = cancel && cancel.title;

		if (type === 'confirmation') {
			return (
				<View style = { buttonContainer } >
					<TouchableOpacity style = { [center, confirmButton] } onPress = { () => this.close('submit') }>
						<Text style = { [text, buttonText] }>{ submitTitle || 'Confirm' }</Text>
					</TouchableOpacity>
					<TouchableOpacity style = { [center, cancelButton] } onPress = { () => this.close('cancel') }>
						<Text style = { [text, buttonText] }>{ cancelTitle || 'Cancel' }</Text>
					</TouchableOpacity>
				</View>
			);
		}
		else {
			return (
				<TouchableOpacity style = { [center, buttonContainer] } onPress = { () => this.close('submit') }>
					<Text style = { [text, buttonText] }>{ submitTitle || 'Ok' }</Text>
				</TouchableOpacity>
			);
		}
	}

	render() {
		const { modalContainer, alertContainer } = styles;

		return (
			<View>
				<Modal transparent = { true } visible = { this.state.visible }>
					<View style = { modalContainer }>
						<Animate.Animate
							type = 'View'
							property = 'marginTop'
							containerStyle = { alertContainer }
							initial = {{ ratio: 1, screen: 'height' }}
						>
							{ this.renderTitle() }
							{ this.renderMessage() }
							{ this.renderButton() }
						</Animate.Animate>
					</View>
				</Modal>
			</View>
		);
	}
}

/**
 * @classdesc Utility class for the AlertComponent. Used to display the alert dialog with the static alert() function,
 *            similar to the native alert box.
 *
 * @typedef {Object} Alerted
 *		@property {string=}                  title           Title of alert.
 *		@property {('alert'|'confirmation'|
 *		            'error'|'success')=}     type            Type of alert to display.
 *		@property {Object|Function}          submit          Config or function to execute with submit button.
 *		@property {string}                   submit.title    Title of confirm button.
 *		@property {Function}                 submit.onPress  onPress of confirm button.
 *		@property {Object|Function}          cancel          Config or function to execute with cancel button.
 *		@property {string}                   cancel.title    Title of cancel button.
 *		@property {Function}                 cancel.onPress  onPress of cancel button.
 */

export class Alert {
	static AlertBox = () => <AlertComponent ref = { alert => (this.AlertComponent = alert) } />;

	/**
	 * @param {string}    message  Message for alert to display.
	 * @param {Alerted=}  config   (Optional) Additional configuration for alert.
	 */

	static alert(message, config = { title: 'Alert', type: 'alert' }) {
		this.AlertComponent.changeAlert({ message, ...config });
	}
}

const styles = {
	modalContainer: {
		height: '100%',
		alignItems: 'center',
		backgroundColor: '#000a'
	},
	alertContainer: {
		width: '90%',
		borderRadius: 5,
		backgroundColor: 'rgba(33, 37, 43, 0.94)',
		height: '25%',
		justifyContent: 'space-between'
	},
	title: {
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
	},
	textTitleContainer: {
		justifyContent: 'center',
		width: '90%'
	}
};