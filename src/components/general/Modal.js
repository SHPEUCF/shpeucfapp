import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, BackHandler, Dimensions, View, ViewStyle } from 'react-native';
import { Animated } from './';

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
 * @prop {boolean}          visible            Control modal visibility
 * @prop {Function}         onHide             Callback to hide modal on backdrop or back button
 * @prop {number=}          priority           Controls zIndex of modal, larger priority modals show up on top
 * @prop {boolean=}         dismissBackdrop    Dismiss modal by tapping the backdrop
 * @prop {boolean=}         dismissBackButton  Dismiss modal with Android back button
 * @prop {'slide' | 'fade'} animation          Animation type for Modal
 * @prop {ViewStyle=}       backdrop           Modal backdrop style
 * @prop {ViewStyle}        style              Modal content style
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
	animation = 'slide',
	style,
	children
}) => {
	const [innerVisible, setInnerVisible] = useState(false);
	const { modal, childCenter } = styles;
	const content = useRef();

	useEffect(() => {
		if (visible)
			setInnerVisible(true);

		if (content.current) {
			switch (animation) {
				case 'fade':
					content.current.animation('timing', { toValue: visible ? 0 : -60, duration: 900 })
						.start(() => !visible && setInnerVisible(false));
					break;
				case 'slide':
					content.current.animation('timing', { toValue: visible ? 0 : height, duration: 825, easing: visible ? ['out', 'back'] : 'back' })
						.start(() => !visible && setInnerVisible(false));
			}
		}
	}, [visible]);

	return (
		(visible || innerVisible) &&
		<View style = { [modal, { elevation: priority + 99, zIndex: priority + 99 }] }>
			<TouchableOpacity
				activeOpacity = { 1 }
				onPress = { dismissBackdrop && onHide }
				style = { [{ height, width, justifyContent: 'center' }, backdrop] }
			>
				{ (animation === 'fade')
					? <Animated.View
						property = 'marginTop'
						initial = { -60 }
						interpolate = {{ property: 'opacity', ranges: { inputRange: [-60, 0], outputRange: [0, 1] } }}
						style = { [childCenter, style] }
						ref = { content }
					>
						{ children }
					</Animated.View>
					: <Animated.View
						property = 'marginTop'
						initial = { height }
						style = { [childCenter, style] }
						ref = { content }
					>
						{ children }
					</Animated.View>
				}
			</TouchableOpacity>
			{ visible && <BackButton onHide = { dismissBackButton && onHide } /> }
		</View>
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