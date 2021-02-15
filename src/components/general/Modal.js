import React, { useEffect } from 'react';
import { TouchableOpacity, BackHandler, Dimensions, SafeAreaView, ViewStyle } from 'react-native';

const { height, width } = Dimensions.get('screen');

/**
 * Control Android back button handler to remove default Router control
 * or hide modal if `onHide` callback is given.
 *
 * @param {{ onHide: Function }}
 */

const BackButton = ({ onHide }) => {
	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			onHide && onHide();

			return true;
		});

		return () => backHandler.remove();
	});

	return null;
};

/**
 * Displays a dialog on top of the current screen.
 *
 * @typedef {Object} ModalProps
 * @prop {boolean}    visible            Control modal visibility
 * @prop {Function}   onHide             Callback to hide modal on backdrop or back button
 * @prop {number=}    priority           Controls zIndex of modal, larger priority modals show up on top
 * @prop {boolean=}   dismissBackdrop    Dismiss modal by tapping the backdrop
 * @prop {boolean=}   dismissBackButton  Dismiss modal with Android back button
 * @prop {ViewStyle=} backdrop           Modal backdrop style
 * @prop {ViewStyle}  style              Modal content style
 *
 * @param {ModalProps}
 */

export const Modal = ({
	visible,
	onHide,
	priority = 1,
	dismissBackdrop = true,
	dismissBackButton = true,
	backdrop = styles.backdrop,
	style,
	children
}) => {
	const { modal, childCenter } = styles;

	return (
		visible &&
		<SafeAreaView style = { [modal, { elevation: priority + 7, zIndex: priority + 99 }] }>
			<TouchableOpacity
				activeOpacity = { 1 }
				onPress = { dismissBackdrop && onHide }
				style = { [{ height, width, justifyContent: 'center' }, backdrop] }
			>
				<TouchableOpacity activeOpacity = { 1 } style = { [childCenter, style] }>
					{ children }
				</TouchableOpacity>
			</TouchableOpacity>
			{ visible && <BackButton onHide = { dismissBackButton && onHide } /> }
		</SafeAreaView>
	);
};

const styles = {
	modal: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	childCenter: {
		alignItems: 'center'
	}
};