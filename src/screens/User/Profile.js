import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { Button, ButtonLayout } from "../../components/general";
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { Avatar } from "react-native-elements";
import Flag from "react-native-flags";
import { openGallery } from "../../utils/render";
import { verifiedCheckMark } from "../../utils/render";
import { loadUser, logoutUser, pageLoad, editUser } from "../../ducks";
import {
	editProfileFormDataPrivileged,
	editProfileFormDataRegular,
	convertObjectToInitialValues
} from "../../data/FormData";
import { Form } from "../../components";

const dimension = Dimensions.get("window");
class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editProfileFormVisibility: false
		};
	}
	shouldComponentUpdate(nextProps) {
		return nextProps.firstName || nextProps.lastName || nextProps.firstName !== "";
	}

	render() {
		return (
			this.renderContent()
		);
	}

	renderContent() {
		const {
			email,
			major,
			points,
			privilege
		} = this.props.activeUser;
		const {
			bioContainer,
			fieldContainerStyle,
			itemLabelText,
			itemValueText,
			textColor
		} = styles;

		return (
			<SafeAreaView style = {{ flex: 1, backgroundColor: "#0c0b0b" }}>
				<Form
					elements = { privilege.eboard ? editProfileFormDataPrivileged : editProfileFormDataRegular }
					initialValues = { convertObjectToInitialValues(this.props.activeUser) }
					title = "Edit Profile"
					visible = { this.state.editProfileFormVisibility }
					changeVisibility = { (visible) => this.setState({ editProfileFormVisibility: visible }) }
					onSubmit = { ({ gender, major, country, birthday }) =>
						editUser({ gender, major, country, birthday }) }
				/>
				<View style = {{ flex: 1, backgroundColor: "black" }}>
					{ this.renderPicture() }
					<View style = { [bioContainer] }>
						<View style = {{ flex: 0.2 }}></View>
						<View style = {{ flexDirection: "row", flex: 1.5, justifyContent: "space-evenly" }}>
							<View style = {{ flex: 0.1 }}></View>
							<View style = { [fieldContainerStyle, { flex: 0.3 }] }>
								<View style = {{ flex: 1, justifyContent: "center" }}>
									<Text style = { [itemLabelText, textColor] }>Email:</Text>
								</View>
								{ major !== "" && <View style = {{ flex: 1, justifyContent: "center" }}>
									<Text style = { [itemLabelText, textColor] }>Major:</Text>
								</View> }
								<View style = {{ flex: 1, justifyContent: "center" }}>
									<Text style = { [itemLabelText, textColor] }>Points:</Text>
								</View>
							</View>
							<View style = { [fieldContainerStyle] }>
								<View style = {{ flex: 1, justifyContent: "center" }}>
									<Text style = { [itemValueText, textColor] }>{ email }</Text>
								</View>
								{ major !== "" && <View style = {{ flex: 1, justifyContent: "center" }}>
									<Text style = { [itemValueText, textColor] }>{ major }</Text>
								</View> }
								<View style = {{ flex: 1, justifyContent: "center" }}>
									<Text style = { [itemValueText, textColor] }>{ points }</Text>
								</View>
							</View>
							<View style = {{ flex: 0.1 }}></View>
						</View>
						<View style = {{ flex: 0.2 }}></View>
					</View>
					{ this.renderSocialMedia() }
					{ this.renderButtons() }
				</View>
			</SafeAreaView>
		);
	}

	renderPicture() {
		const {
			headerInfoContainer,
			taglineContainer,
			nameLabelText,
			textColor,
			row
		} = styles;

		const {
			firstName,
			lastName,
			picture,
			privilege,
			color,
			id
		} = this.props.activeUser;

		return (
			<View style = { [headerInfoContainer] }>
				<View style = {{ flex: 1, paddingTop: "8%", marginBottom: "30%" }}>
					{ picture === ""
					&& <Avatar
						size = { dimension.height * 0.32 }
						rounded
						titleStyle = {{ backgroundColor: color }}
						overlayContainerStyle = {{ backgroundColor: color }}
						title = { firstName[0].concat(lastName[0]) }
						onPress = { () => openGallery(`users/${id}`, id) }
					/>	}
					{ picture !== ""
					&& <Avatar
						size = { dimension.height * 0.32 }
						rounded
						source = {{ uri: picture }}
						onPress = { () => openGallery(`users/${id}`, id) }
					/> }
				</View>
				<View style = { [taglineContainer] }>
					<View style = { row }>
						<Text style = { [nameLabelText, textColor] }>{ firstName } { lastName }</Text>
						{ verifiedCheckMark(privilege || {}) }
					</View>
				</View>
			</View>
		);
	}

	renderButtons() {
		const {
			flag
		} = this.props.activeUser;

		let icon = flag !== "" && flag ? {
			data: <Flag
				type = "flat"
				code = { flag }
				size = { 32 }
			/>,
			layer: 1
		} : null;

		return (
			<View>
				<ButtonLayout
					icon = { icon }
				>
					<Button
						title = "Edit profile"
						onPress = { () => this.setState({ editProfileFormVisibility: true }) }
					/>
					<Button
						title = "Logout"
						onPress = { () => logoutUser() }
					/>
				</ButtonLayout>
			</View>
		);
	}

	renderSocialMedia() {
		const {
			logoContainer,
			socialmediarow
		} = styles;

		const {
			color
		} = this.props.activeUser;

		return (
			<View style = {{ flex: 0.2 }}>
				<View style = {{ flex: 0.03 }}></View>
				<View style = { socialmediarow }>
					<View style = { [logoContainer, { backgroundColor: color, flex: 1 }] }>
						<TouchableOpacity
							onPress = { () => {
								alert("Coming Soon");
							} }>
							<Ionicons name = "logo-linkedin" size = { dimension.height * 0.045 } color = 'white' />
						</TouchableOpacity>
					</View>
					<View style = {{ flex: 0.01 }}></View>
					<View style = { [logoContainer, { backgroundColor: color, flex: 1 }] }>
						<TouchableOpacity
							onPress = { () => {
								alert("Coming Soon");
							} }>
							<Ionicons name = "ios-mail" size = { dimension.height * 0.045 } color = 'white' />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = {
	headerInfoContainer: {
		flex: 1.4,
		backgroundColor: "black",
		alignItems: "center",
		borderBottomColor: "#e0e6ed22"
	},
	textColor: {
		color: "#e0e6ed"
	},
	row: {
		flex: 1,
		alignItems: "center",
		flexDirection: "row"
	},
	taglineContainer: {
		flex: 0.4,
		paddingVertical: "3%",
		alignItems: "center",
		justifyContent: "flex-end",
		width: "70%"
	},
	fieldContainerStyle: {
		height: "100%",
		flexDirection: "column",
		alignItems: "flex-start",
		flex: 1
	},
	nameLabelText: {
		fontSize: dimension.height * 0.03,
		fontWeight: "bold",
		color: "#fff",
		lineHeight: dimension.height * 0.03
	},
	itemLabelText: {
		fontSize: dimension.width * 0.04,
		fontWeight: "bold",
		color: "#fff",
		lineHeight: dimension.height * 0.03
	},
	itemValueContainerStyle: {
		flexDirection: "row",
		justifyContent: "center"
	},
	itemValueText: {
		fontSize: dimension.height * 0.02,
		fontWeight: "500",
		color: "#fff"
	},
	buttonsContainerStyle: {
		flex: 0.4
	},
	logoContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	socialmediarow: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "black"
	},
	bioContainer: {
		flex: 0.7,
		backgroundColor: "#21252b"
	},
	socialmediatext: {
		flex: 1,
		alignSelf: "center"
	}
};

const mapStateToProps = ({ user, general }) => {
	const { activeUser } = user;
	const { loading } = general;

	return {
		activeUser,
		loading
	 };
};

const mapDispatchToProps = {
	loadUser,
	pageLoad
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);