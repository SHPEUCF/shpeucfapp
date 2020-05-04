import { StyleSheet } from "react-native";
import * as defaultStyle from "../style";
import platformStyles from "./platform-style";
import { Dimensions } from "react-native";

const STYLESHEET_ID = "stylesheet.agenda.main";
const dimension = Dimensions.get("window");

export default function styleConstructor(theme = {}) {
	const appStyle = { ...defaultStyle, ...theme };
	const { knob, weekdays } = platformStyles(appStyle);

	return StyleSheet.create({
		knob,
		weekdays,
		header: {
			overflow: "hidden",
			justifyContent: "flex-end",
			position: "absolute",
			height: "100%",
			width: "100%"
		},
		knobContainer: {
			flex: 1,
			position: "absolute",
			left: 0,
			right: 0,
			justifyContent: "center",
			height: dimension.height * 0.04,
			bottom: 0,
			alignItems: "center",
			backgroundColor: appStyle.calendarBackground
		},
		weekday: {
			width: 32,
			textAlign: "center",
			color: appStyle.textSectionTitleColor,
			fontSize: appStyle.textDayHeaderFontSize,
			fontFamily: appStyle.textDayHeaderFontFamily,
			fontWeight: appStyle.textDayHeaderFontWeight
		},
		buttonsLayout: {
			flexDirection: "row",
			justifyContent: "space-between",
			height: dimension.height * 0.04,
			alignItems: "center"
		},
		buttonContainer: {
			width: "30%",
			alignItems: "center"
		},
		reservations: {
			flex: 5,
			marginTop: dimension.height * 0.18,
			backgroundColor: appStyle.backgroundColor
		},
		...theme[STYLESHEET_ID] || {}
	});
}