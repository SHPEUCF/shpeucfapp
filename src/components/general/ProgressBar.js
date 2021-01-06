import React, { useRef, useEffect } from "react";
import { Animated, View, ViewStyle } from "react-native";

/**
 * @desc Progress Bar component for leaderboard.
 *
 * @typedef {Object} ProgressBarProps
 * @prop {Number}          progress  Progress indication on bar.
 * @prop {Number | String} width     Progress bar width.
 * @prop {Number | String} height    Progress bar height.
 * @prop {String}          color     Color of progress indicator.
 * @prop {ViewStyle}       style
 *
 * @param {...ProgressBarProps}
 */

export const ProgressBar = ({ progress, width, height, color, style }) => {
	const progressWidth = useRef(new Animated.Value(progress * width)).current;

	useEffect(() => {
		Animated.timing(progressWidth, { toValue: progress * width, duration: 1000 }).start();
	}, [progress]);

	let progressBorder = (progress === 1) ? styles.bar : styles.progress;

	return (
		<View style = { [style, styles.bar, { width, height }] }>
			<Animated.View style = { [progressBorder, { backgroundColor: color, height, width: progressWidth }] } />
		</View>
	);
};

const styles = {
	bar: {
		borderRadius: 5
	},
	progress: {
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5
	}
};