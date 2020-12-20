import React, { useRef, useEffect } from "react";
import { Animated, View } from "react-native";

export const ProgressBar = ({ progress, width, height, color, style }) => {
	const progressWidth = useRef(new Animated.Value(progress * width)).current;

	useEffect(() => {
		Animated.timing(progressWidth, { toValue: progress * width, duration: 1000 }).start();
	}, [progress]);

	return (
		<View style = { [style, styles.bar, { width, height, elevation: 1 }] }>
			<Animated.View style = {{ backgroundColor: color, height, width: progressWidth }} />
		</View>
	);
};

const styles = {
	bar: {
		borderRadius: 5
	}
};