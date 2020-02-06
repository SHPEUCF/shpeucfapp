import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { Button } from "../components/general";
import { Avatar } from "react-native-elements";
import Flag from "react-native-flags";
import RNFetchBlob from "rn-fetch-blob";
import firebase from "firebase";
import ImagePicker from "react-native-image-crop-picker";
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";

const dimension = Dimensions.get("window");

class OtherProfile extends Component {
	render() {
		return (
			this.renderContent()
		);
	}

	renderContent() {
		const {
			email, major, points
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
				<View style = {{ backgroundColor: "black", flex: 1 }}>
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
					<View style = {{ height: dimension.height * 0.08, backgroundColor: "black" }}></View>
				</View>
			</SafeAreaView>
		);
	}

	renderPicture() {
		const {
			headerInfoContainer,
			taglineContainer,
			nameLabelText,
			textColor
		} = styles;
		const {
			firstName,
			lastName,
			picture
		} = this.props;

		return (
			<View style = { headerInfoContainer }>
				<View style = {{ backgroundColor: "black", flex: 1 }}>
					<View style = {{ flex: 0.05, backgroundColor: "black" }}></View>
					<View style = {{ flex: 1, paddingTop: "3%", paddingLeft: "5%", paddingRight: "5%" }}>
						{ picture === ""
						&& <Avatar
							size = { dimension.height * 0.32 }
							rounded
							titleStyle = {{ backgroundColor: this.props.dashColor, height: "100%", width: "100%", justifyContent: "center", paddingTop: "20%" }}
							title = { firstName[0].concat(lastName[0]) }
						/> }
						{ picture !== ""
						&& <Avatar
							size = { dimension.height * 0.32 }
							rounded
							source = {{ uri: picture }}
						/> }
					</View>
					<View style = { taglineContainer }>
						<View style = {{ flexDirection: "row", alignItems: "center" }}>
							<View style = {{ flex: 1, alignItems: "center" }}>
								<Text style = { [nameLabelText, textColor] }>{ firstName + " " + lastName }</Text>
							</View>
						</View>
					</View>
					<View style = {{ flex: 0.05, backgroundColor: "black" }}></View>
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

		if (this.props.screen)
			return (
				<SafeAreaView style = {{}}>
					<SafeAreaView style = {{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-start", width: "100%", position: "absolute", bottom: dimension.height * 0.032, backgroundColor: "black" }}>
						<View style = {{ flex: 0.3 }}></View>
						<View style = { [buttonsContainerStyle, { flex: 1 }] }>
							<Button
								title = "Back"
								onPress = { () => { Actions.pop()	} }
							/>
						</View>
						<View style = {{ flex: 0.3 }}></View>
					</SafeAreaView>
				</SafeAreaView>
			);

		return (
			<SafeAreaView style = {{}}>
				<SafeAreaView style = {{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-start", width: "100%", position: "absolute", bottom: dimension.height * 0.032, backgroundColor: "black" }}>
					{ /* <TouchableOpacity onPress={this.props.goToEditProfileForm.bind(this)} style={{backgroundColor: "#FECB00", borderWidth: 1, borderColor: "#0000",flex: 1, alignItems: "center", justifyContent: "center"}}>
						<View style={{justifyContent: "center"}}>
							<Text style={{fontSize: 18}}> Edit Profile </Text>
						</View>
					</TouchableOpacity>
					<View style={{flex: .01}}></View>
					<TouchableOpacity onPress={this.props.logoutUser.bind(this)} style={{backgroundColor: "#FECB00", borderWidth: 1, borderColor: "#0000",flex: 1, alignItems: "center", justifyContent: "center"}}>
						<Text style={{fontSize: 18}}> Logout </Text>
					</TouchableOpacity>*/ }
					<View style = { buttonsContainerStyle }>
						<Button
							title = "My Profile"
							onPress = { () => {
								Actions.push("main");
								Actions.profile();
							} }
						/>
					</View>
					{ this.props.flag !== ""
						&& this.props.flag
						&& <View style = {{}}>
							<Flag
								type = "flat"
								code = { this.props.flag }
								size = { 32 }
							/>
						</View> }
					<View style = { buttonsContainerStyle }>
						<Button
							title = "Leaderboard"
							onPress = { () => Actions.pop() }
						/>
					</View>
				</SafeAreaView>
			</SafeAreaView>
		);
	}

	renderSocialMedia() {
		const {
			LogoContainer,
			socialmediarow
		} = styles;

		return (
			<View style = {{ flex: 0.2 }}>
				<View style = {{ flex: 0.03 }}></View>
				<View style = { socialmediarow }>
					<View style = { [LogoContainer, { backgroundColor: this.props.dashColor, flex: 1 }] }>
						<TouchableOpacity
							onPress = { () => {
								alert("Coming Soon");
								// Actions.PostShow({ title: 'Linkedin', uri: 'https://www.linkedin.com/'})
							} }>
							<Ionicons name = "logo-linkedin" size = { dimension.height * 0.045 } color = 'white' />
						</TouchableOpacity>
					</View>
					<View style = {{ flex: 0.01 }}></View>
					<View style = { [LogoContainer, { backgroundColor: this.props.dashColor, flex: 1 }] }>
						<TouchableOpacity
							onPress = { () => {
								alert("Coming Soon");
								// Actions.PostShow({ title: 'Github', uri: 'https://www.github.com/'})
							} } >
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
		fontSize: dimension.height * 0.02,
		fontWeight: "bold",
		color: "#fff",
		lineHeight: dimension.height * 0.03
	},
	itemValueContainerStyle: {
		flexDirection: "row",
		justifyContent: "center"
	},
	itemValueText: {
		fontSize: 16,
		fontWeight: "500",
		color: "#fff"
	},
	buttonsContainerStyle: {
		flex: 0.4
	},
	LogoContainer: {
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

const mapStateToProps = ({ members, general, user }) => {
	const {
		firstName,
		lastName,
		email,
		major,
		points,
		picture,
		quote,
		dashColor,
		flag
	} = members;
	const {
		loading
	} = general;
	const {
		privilege
	} = user;

	return {
		firstName,
		lastName,
		email,
		major,
		points,
		picture,
		quote,
		loading,
		privilege,
		dashColor,
		flag
	};
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);