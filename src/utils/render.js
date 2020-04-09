import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

// You pass in the privileges prop
export const verifiedCheckMark = ({ paidMember }) => {
	const {
		verifiedCheckMark
	} = styles;
	if (paidMember)
		return (
			<Ionicons

				name = "ios-checkmark-circle"
				size = { 25 }
				style = { verifiedCheckMark }
			/>
		);
};

const styles = {
	verifiedCheckMark: {
		color: "#FECB00",
		backgroundColor: "transparent",
		alignSelf: "center",
		marginLeft: 10
	}
};