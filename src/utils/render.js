import React from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
import { Avatar } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import {
	storeImageUrl
} from "../ducks";

// You pass in the privileges prop or user object
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

// MemberPanel needs should be made into its own component
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
					&& <Avatar
						size = "large"
						rounded
						source = {{ uri: user.picture }}
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

export const openGallery = (filePath, fileName, onImageStoreFunction) => {
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
		const imageRef = firebase.storage().ref(filePath).child(fileName);

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
				// checks for custom function and if there is no custom function then do default
				onImageStoreFunction ? onImageStoreFunction(url, filePath) : storeImageUrl(url, filePath);
			})
			.catch((error) => {
				console.log(error);
			});
	});
};

const styles = {
	verifiedCheckMark: {
		color: "#FECB00",
		backgroundColor: "transparent",
		alignSelf: "center",
		marginLeft: 10
	},
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