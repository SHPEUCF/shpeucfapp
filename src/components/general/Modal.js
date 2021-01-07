import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView, BackHandler, Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('screen');

/**
 *
 */

export const Modal = ({ visible, onHide, priority, style, dismissBack, dismissButton, children }) => {
	const mounted = useRef(false);

	useEffect(() => {
		if (mounted.current) {
			if (visible && dismissButton && Platform.OS === 'android')
				BackHandler.addEventListener('hardwareBackPress', () => hide());
			else if (dismissButton && Platform.OS === 'android')
				BackHandler.removeEventListener('hardwareBackPress');
		}
		else {
			mounted.current = true;
		}
	});

	const hide = () => {
		if (onHide)
			onHide();

		return true;
	};

	const { modal, backdrop } = styles;

	return (
		<SafeAreaView style = { [modal, { elevation: priority + 7, zIndex: priority + 99 }] }>
			<TouchableOpacity activeOpacity = { 0.6 } style = { [{ height, width }, backdrop] } onPress = { dismissBack && hide }>
				<TouchableOpacity activeOpacity = { 1 } style = { style }>
					{ children }
				</TouchableOpacity>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

Modal.defaultProps = {
	priority: 1
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
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		justifyContent: 'center'
	}
};