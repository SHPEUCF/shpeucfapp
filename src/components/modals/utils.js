import { Dimensions, Easing } from 'react-native';

const { height } = Dimensions.get('screen');

export const modalAnimation = type => {
	switch (type) {
		case 'slide':
			return {
				animateInConfig: { easing: Easing.out(Easing.back()), duration: 800 },
				animateOutConfig: { easing: Easing.back(), duration: 800 },
				transitionOptions: animatedValue => ({
					marginTop: animatedValue.interpolate({
						inputRange: [0, 1, 2],
						outputRange: [height, height / 2, height]
					})
				})
			};
		case 'fade':
			return {
				transitionOptions: animatedValue => ({
					marginTop: animatedValue.interpolate({
						inputRange: [0, 1, 2],
						outputRange: [-60, 0, -60]
					}),
					opacity: animatedValue.interpolate({
						inputRange: [0, 1, 2],
						outputRange: [0, 1, 0]
					})
				})
			};
		case 'none':
			return {};
	}
};