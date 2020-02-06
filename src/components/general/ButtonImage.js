import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

const ButtonImage = ({ onPress, text, backgroundColor, image }) => {
	return (
		<View style = {{
			borderBottomWidth: 1,
			flexDirection: "row",
			borderBottomColor: "rgba(60,60,61,0.25)",
			flex: 1,
			height: 40,
			justifyContent: "center",
			backgroundColor: backgroundColor
		}}>
			<TouchableOpacity	style = {{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 10, marginRight: 10	}} onPress = { onPress }>
				<View style = {{ flex: 1,	flexDirection: "row",	alignItems: "center" }}>
					<View style = {{ flex: 1,	flexDirection: "row",	marginLeft: 10 }}>
						<View style = {{ flex: 0, padding: 5, backgroundColor: "#FDF7FF", borderRadius: 50, borderWidth: 2, borderColor: "rgba(0,0,0,0.1)" }}>
							<Image source = { image } style = {{ flex: 0,	height: 30,	width: 30 }} />
						</View>
					</View>
					<View style = {{ flex: 4, flexDirection: "row",	justifyContent: "flex-start" }}>
						<Text style = {{ textAlign: "left", fontSize: 16, fontWeight: "600" }}>{ text }</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export { ButtonImage };