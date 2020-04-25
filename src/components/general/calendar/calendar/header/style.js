import { StyleSheet } from "react-native";
import * as defaultStyle from "../../style";

const STYLESHEET_ID = "stylesheet.calendar.header";

export default function(theme = {}) {
	const appStyle = { ...defaultStyle, ...theme };
	return StyleSheet.create({
		header: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: 6,
			alignItems: "center"
		},
		monthText: {
			fontSize: appStyle.textMonthFontSize,
			fontFamily: appStyle.textMonthFontFamily,
			fontWeight: appStyle.textMonthFontWeight,
			color: appStyle.monthTextColor,
			margin: 10
		},
		arrow: {
			padding: 10,
			...appStyle.arrowStyle
		},
		arrowImage: {
			tintColor: appStyle.arrowColor
		},
		disabledArrowImage: {
			tintColor: appStyle.disabledArrowColor
		},
		week: {
			marginTop: 7,
			flexDirection: "row",
			justifyContent: "space-evenly"
		},
		dayHeader: {
			width: "8%",
			marginTop: 2,
			marginBottom: 7,
			textAlign: "center",
			fontSize: appStyle.textDayHeaderFontSize,
			fontFamily: appStyle.textDayHeaderFontFamily,
			fontWeight: appStyle.textDayHeaderFontWeight,
			color: appStyle.textSectionTitleColor
		},
		...theme[STYLESHEET_ID] || {}
	});
}