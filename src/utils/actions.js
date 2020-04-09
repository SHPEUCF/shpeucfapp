import React from "react";
import { Avatar } from "react-native-elements";
import { View, Text } from "react-native";

// Created this functional component to fix current Avatar flickering issue on ios
// Should be fixed in the next React Native Elements Update
const userAvatar = ({ item }) => {
	return (
		<Avatar
			size = "large"
			rounded
			source = {{ uri: item.picture }}
		/>
	);
};
export const StableAvatar = React.memo(userAvatar);

export const createActionTypes = actionTypes => actionTypes
	.map(type => ({ [type]: `module/${type}`	}))
	.reduce((types, type) => ({ ...types, ...type }), {});

// MemberPanel needs should be made into it;s own component
export const MemberPanel = (user) => {
	const {
		textStyle,
		contentContainerStyle,
		userInfoContainer,
		fullFlex,
		AvatarContainer
	} = styles;

	return (
		<View style = { contentContainerStyle }>
			<View style = { userInfoContainer }>
				<Text style = { [textStyle, fullFlex ] }>{ `${user.firstName} ${user.lastName}` }</Text>
				<View style = { AvatarContainer }>
					{ user.picture === ""
					&& <Avatar
						size = "large"
						rounded
						titleStyle = {{ backgroundColor: user.color }}
						overlayContainerStyle = {{ backgroundColor: user.color }}
						title = { user.firstName[0].concat(user.lastName[0]) }
					/> }
					{ user.picture !== ""
					&& <StableAvatar
						item = { user }
					/> }
				</View>
			</View>
		</View>
	);
};

export const rankMembers = (sortedMembers, userId) => {
	let currentMember;
	let pastPoints = 0;
	let pastIndex = 1;

	sortedMembers.forEach((x, index) => {
		x.index = x.points !== 0 ? index + 1 : sortedMembers.length;
		if (x.points === pastPoints) x.index = pastIndex;
		if (x.id === userId) currentMember = x;

		pastPoints = x.points;
		pastIndex = x.index;
	});

	return currentMember;
};

const styles = {
	textStyle: {
		color: "#e0e6ed",
		fontSize: 20
	},
	userInfoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	fullFlex: {
		flex: 1
	},
	AvatarContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	contentContainerStyle: {
		height: 150,
		alignItems: "flex-start",
		paddingHorizontal: 15,
		justifyContent: "center"
	}
};