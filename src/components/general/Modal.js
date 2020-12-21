import React, { PureComponent } from "react";
import { TouchableWithoutFeedback, SafeAreaView, BackHandler, View, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

/**
 *
 */

export default class Modal extends PureComponent {
	componentDidUpdate() {
		if (this.props.visible)
			BackHandler.addEventListener("hardwareBackPress", () => this.hide());
		else
			BackHandler.removeEventListener("hardwareBackPress");
	}

	hide() {
		if (this.props.onHide) this.props.onHide();

		return true;
	}

	render() {
		const { style, priority, children } = this.props;
		const { modal, childContainer, backdrop } = styles;

		return (
			<SafeAreaView style = { [modal, { elevation: priority + 7, zIndex: priority + 99 }] }>
				<TouchableOpacity activeOpacity = { 1 } style = { [{ height, width }, backdrop] } onPress = { () => this.hide() }>
					<TouchableOpacity activeOpacity = { 1 } style = { [childContainer, style] }>
						{ children }
					</TouchableOpacity>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}

Modal.defaultProps = {
	priority: 1,
	dismissible: true
};

const styles = {
	modal: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	childContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#21252B"
	},
	backdrop: {
		backgroundColor: "#000",
		opacity: 0.6
	}
};