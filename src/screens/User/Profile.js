import React, { Component } from "react";
import firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { Button } from "../../components/general";
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import Flag from "react-native-flags";
import { verifiedCheckMark } from "../../utils/render";
import { loadUser, logoutUser, goToEditProfileForm, pageLoad, pictureChanged } from "../../ducks";

const dimension = Dimensions.get("window");
class Profile extends Component {
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
			points
		} = this.props;
		const {
			bioContainer,
			fieldContainerStyle,
			itemLabelText,
			itemValueText,
			textColor
		} = styles;

		return (
			<SafeAreaView style = {{ flex: 1, backgroundColor: "#0c0b0b" }}>
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
								{ this.props.major !== "" && <View style = {{ flex: 1, justifyContent: "center" }}>
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
								{ this.props.major !== "" && <View style = {{ flex: 1, justifyContent: "center" }}>
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
					<View style = {{ flex: 0.3 }}></View>
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
			privilege
		} = this.props;

		return (
			<View style = { [headerInfoContainer] }>
				<View style = {{ flex: 1, paddingTop: "8%" }}>
					{ picture === ""
					&& <Avatar
						size = { dimension.height * 0.32 }
						rounded
						titleStyle = {{ backgroundColor: this.props.dashColor }}
						overlayContainerStyle = {{ backgroundColor: this.props.dashColor }}
						title = { firstName[0].concat(lastName[0]) }
						onPress = { () => this.openGallery() }
					/>	}
					{ picture !== ""
					&& <Avatar
						size = { dimension.height * 0.32 }
						rounded
						source = {{ uri: picture }}
						onPress = { () => this.openGallery() }
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

	constructor(props) {
		super(props);
		this.state = {
			dp: null
		};
	}

	openGallery() {
		const Blob = RNFetchBlob.polyfill.Blob;
		const fs = RNFetchBlob.fs;
		window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
		window.Blob = Blob;

		ImagePicker.openPicker({
			width: 300,
			height: 400,
			includeBase64: true,
			compressImageQuality: 0.8,
			mediaType: "photo",
			cropping: true,
			cropperCircleOverlay: true
		}).then(image => {
			const imagePath = image.path;
			let uploadBlob = null;
			let mime = "image/jpg";
			const imageRef = firebase.storage().ref("users/profile").child(this.props.id);

			fs.readFile(imagePath, "base64")
				.then((data) => {
					// console.log(data);

					return Blob.build(data, { type: `${mime};BASE64` });
				})
				.then((blob) => {
					uploadBlob = blob;

					return imageRef.put(blob, { contentType: mime });
				})
				.then(() => {
					uploadBlob.close();

					return imageRef.getDownloadURL();
				})
				.then((url) => {
					let obj = {};

					this.props.pictureChanged(url);
					obj["dp"] = url;
					this.setState(obj);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	}

	renderButtons() {
		const {
			buttonsContainerStyle
		} = styles;

		return (
			<View style = {{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * 0.032, width: "100%" }}>
				<View style = { buttonsContainerStyle }>
					<Button
						title = "Edit profile"
						onPress = { this.props.goToEditProfileForm.bind(this) }
					/>
				</View>
				{ this.props.flag !== "" && this.props.flag && <View style = {{}}>
					<Flag
						type = "flat"
						code = { this.props.flag }
						size = { 32 }
					/>
				</View> }
				<View style = { buttonsContainerStyle }>
					<Button
						title = "Logout"
						onPress = { this.props.logoutUser.bind(this) }
					/>
				</View>
			</View>
		);
	}

	renderSocialMedia() {
		const {
			logoContainer,
			socialmediarow
		} = styles;

		return (
			<View style = {{ flex: 0.2 }}>
				<View style = {{ flex: 0.03 }}></View>
				<View style = { socialmediarow }>
					<View style = { [logoContainer, { backgroundColor: this.props.dashColor, flex: 1 }] }>
						<TouchableOpacity
							onPress = { () => {
								alert("Coming Soon");
							} }>
							<Ionicons name = "logo-linkedin" size = { dimension.height * 0.045 } color = 'white' />
						</TouchableOpacity>
					</View>
					<View style = {{ flex: 0.01 }}></View>
					<View style = { [logoContainer, { backgroundColor: this.props.dashColor, flex: 1 }] }>
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
		paddingBottom: "3%",
		alignItems: "center",
		justifyContent: "flex-end"
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
	const {
		firstName,
		lastName,
		email,
		major,
		points,
		picture,
		quote,
		id,
		dashColor,
		flag,
		privilege
	} = user;
	const {
		loading
	} = general;

	return {
		firstName,
		lastName,
		email,
		major,
		points,
		picture,
		quote,
		loading,
		id,
		dashColor,
		flag,
		privilege
	 };
};

const mapDispatchToProps = {
	loadUser,
	logoutUser,
	goToEditProfileForm,
	pageLoad,
	pictureChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);