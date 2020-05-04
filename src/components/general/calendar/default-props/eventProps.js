import React from "react";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { loadEvent } from "../../../../ducks";
import { goToViewEvent } from "../../../../utils/router";

const dimension = Dimensions.get("window");

export const DefaultItem = ({ item }) => {
	const {
		textColor,
		itemContainer
	} = styles;
	const state = useSelector(state => state);
	const dispatch = useDispatch();

	let viewName = item.type + ": " + item.name;
	if (item.committee)
		viewName = item.committee + ": " + item.name;

	return (
		<TouchableOpacity onPress = { () => viewEvent(item, dispatch) }>
			<View style = { [itemContainer, { backgroundColor: state.user.activeUser.color }] }>
				<Text style = { [{ fontWeight: "bold" }, textColor] }>{ viewName }</Text>
				<Text style = { textColor }> Time: { item.startTime } - { item.endTime }</Text>
				<Text style = { textColor }>Location: { item.location }</Text>
			</View>
		</TouchableOpacity>
	);
};

export const DefaultEmptyData = () => {
	const {
		textColor,
		emptyData
	} = styles;
	const color = useSelector(state => state.user.activeUser.color);

	return (
		<View style = { [emptyData, { backgroundColor: color }] }>
			<Text style = { textColor }>No events to display on this day</Text>
		</View>
	);
};

const viewEvent = (item, dispatch) => {
	dispatch(loadEvent(item));
	goToViewEvent("events");
};

const styles = {
	textColor: {
		color: "white"
	},
	emptyData: {
		height: dimension.height * 0.15,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#21252b",
		borderRadius: 5,
		marginTop: dimension.height * 0.017
	},
	itemContainer: {
		flex: 1,
		backgroundColor: "#21252b",
		borderRadius: 5,
		padding: dimension.height * 0.020,
		marginRight: dimension.height * 0.010,
		marginTop: dimension.height * 0.02
	}
};