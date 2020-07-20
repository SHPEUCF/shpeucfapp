import React, { Component } from "react";
import { Avatar, Icon } from "react-native-elements";
import { View, Text, TouchableOpacity, Animated, Platform, UIManager, LayoutAnimation } from "react-native";

const defaultValues = {
	headerTitle: "Write a Title",
	headerSubTitle1: "write optional Subtitle 1",
	headerSubTitle2: "write optional Subtitle 2",
	roundBottom: 0
};

class CollapsibleView extends Component {
	constructor(props) {
		super(props);
		if (Platform.OS === "android")
			UIManager.setLayoutAnimationEnabledExperimental(true);

		this.state = {
			isExpand: false,
			Iconclicked: null
		};
		this.state = defaultValues;
	}

	render() {
		const { container } = styles;

		return (
			<View style = { [container] }>
				{ this.headerCollapseView() }
				{ this.bodyCollapseView() }
			</View>
		);
	}

	headerPicture(img) {
		const { pictureStyle } = styles;
		const imgSource = this.props.headerImage;
		const showImg = this.props.showHRImage === false ? false : true;

		console.log("IMG FUNC", this.props.headerImage);

		return (
			showImg && <Avatar
				size = "large"
				overlayContainerStyle = { pictureStyle }
				source = {{ uri: imgSource }}
				icon = {{ name: "photo", type: "font-awesome", iconStyle: { opacity: imgSource ? 1 : 0 } }}

			/>
		);
	}

    toggle = () => {
    	this.setState(prevState => { return { Iconclicked: !prevState.Iconclicked } });
    	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    	this.setState({ isExpand: !this.state.isExpand });

    	console.log("ExpandState: ", this.state.isExpand);
    }

    headerCollapseView() {
    	const headerTitle = this.props.headerTitle ? this.props.headerTitle : this.state.headerTitle;
    	const showText1 = this.props.showHRSubText1 === false ? false : true;
    	const showText2 = this.props.showHRSubText2 === false ? false : true;
    	const subText1 = this.props.headerSubTitle1 ? this.props.headerSubTitle1 : this.state.headerSubTitle1;
    	const subText2 = this.props.headerSubTitle2 ? this.props.headerSubTitle2 : this.state.headerSubTitle2;
    	const { headerContainer, hrTextContainer, textStyle, hrTitleText, hrSubTxt1, hrSubTxt2 } = styles;

    	return (
    		<View
    			style = { [headerContainer] }>

    			{ this.headerPicture(this.props.headerImage) }

    			<View style = { hrTextContainer }>
    				<Text style = { [textStyle, hrTitleText] }>{ headerTitle }</Text>
    				{ showText1 && <Text style = { [textStyle, hrSubTxt1] }>{ subText1 }</Text> }
    				{ showText2 && <Text style = { [textStyle, hrSubTxt2] }>{ subText2 } </Text> }
    			</View>
    			<RotateCollapseButton onPress = { this.toggle } iconToggle = { this.state.Iconclicked } />
    		</View>
    	);
    }

    bodyCollapseView() {
    	const text = this.props.bodyText ? this.props.bodyText : "Type the content here.";
    	const { textStyle, bodyTextStyle } = styles;

  	return (
    		this.state.isExpand && <View style = { styles.bodyCollapseStyle } >
    			{ this.props.extraBodyContentTop }
    			<Text style = { [textStyle, bodyTextStyle] }>{ text }</Text>
    			{ this.props.extraBodyContentBottom }
    		</View>
    	);
    }
}

const RotateCollapseButton = ({ onPress, iconToggle }) => {
	const rotationStyle = [styles.rotationStyle];

	if (iconToggle !== null) {
		const animation = new Animated.Value(iconToggle ? 0 : 1);

		Animated.timing(animation, {
			toValue: iconToggle ? 1 : 0,
			duration: 200,
			useNativeDriver: true
		}).start();

		const iconRotate = animation.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "180deg"]
		});
		const aniStyle = { transform: [{ rotate: iconRotate }] };

		rotationStyle.push(aniStyle);
	}

	return (
		<TouchableOpacity style = { styles.buttonStyle } onPress = { onPress }>
			<Animated.View style = { rotationStyle }>
				<Icon name = "downcircleo"
					type = "antdesign"
					size = { 55 }
					color = { "#FECB00" }
					iconStyle = {{ paddingTop: 4 }} />
			</Animated.View>
		</TouchableOpacity>
	);
};

const styles = {
	container: {
		marginHorizontal: 8,
		marginVertical: 8,
		backgroundColor: "#21252b",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		overflow: "hidden"
	},
	headerContainer: {
		flexDirection: "row",
		paddingVertical: 20,
		paddingHorizontal: 10,
		alignSelf: "baseline"

	},
	hrTextContainer: {
		flex: 1,
		marginHorizontal: 8
	},
	textStyle: {
		textAlign: "left",
		color: "#e0e6ed"
	},
	hrTitleText: {
		fontSize: 20,
		fontWeight: "bold"
	},
	hrSubTxt1: {
		fontSize: 16,
		paddingTop: 8
	},
	hrSubTxt2: {
		fontSize: 12,
		paddingTop: 5
	},
	pictureStyle: {
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
		overflow: "hidden"
	},
	bodyCollapseStyle: {
		paddingHorizontal: 10,
		paddingBottom: 20
	},
	bodyTextStyle: {
		fontSize: 16
	}
};

export { CollapsibleView };