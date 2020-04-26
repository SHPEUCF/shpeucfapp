import { Dimensions } from "react-native";
const dimension = Dimensions.get("window");

export default function platformStyles(appStyle) {
	return {
		knob: {
			width: 38,
			height: 7,
			borderRadius: 3,
			backgroundColor: appStyle.agendaKnobColor
		},
		weekdays: {
			position: "absolute",
			alignItems: "center",
			bottom: dimension.height - dimension.height * 0.34,
			left: 0,
			right: 0,
			top: 0,
			flexDirection: "row",
			justifyContent: "space-evenly",
			paddingLeft: 16,
			paddingRight: 16,
			backgroundColor: appStyle.calendarBackground
		}
	};
}