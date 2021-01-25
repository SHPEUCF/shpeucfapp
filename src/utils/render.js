import React from 'react';
import firebase from 'firebase';
import { Icon } from '@/components';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

export const stockImg = 'https://cdn0.iconfinder.com/data/icons/superuser-web-kit/512/686909-user_people_man_human_head_person-512.png';

// You pass in the privileges prop or user object
export const verifiedCheckMark = ({ paidMember }) => {
	const { verifiedCheckMark } = styles;

	if (paidMember) {
		return (
			<Icon name = 'checkmark-circle' size = { 25 } style = { verifiedCheckMark } />
		);
	}
};

/**
 * @description Directly modifies firstName and lastName to get first word.
 *
 * @param {Object} item  Object with firstName and lastName keys
 * @param {String} item.firstName
 * @param {String} item.lastName
 */

export const truncateNames = item => {
	let [firstName] = item.firstName.trim().split(' ');
	let [lastName] = item.lastName.trim().split(' ');

	if (firstName.length + lastName.length >= 15)
		lastName = `${lastName[0]}.`;

	return [firstName, lastName];
};

export const openGallery = (filePath, fileName, onImageStoreFunction) => {
	const Blob = RNFetchBlob.polyfill.Blob;
	const fs = RNFetchBlob.fs;
	const storeImageUrl = (url, filePath) => {
		firebase.database().ref(`${filePath}/`).update({
			picture: url
		});
	};

	window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
	window.Blob = Blob;

	ImagePicker.openPicker({
		width: 300,
		height: 400,
		includeBase64: true,
		compressImageQuality: 0.8,
		mediaType: 'photo',
		cropping: true,
		cropperCircleOverlay: true
	}).then(image => {
		if (!image.filename) image.filename = image.path.split('/').pop();
		const imagePath = image.path;
		let uploadBlob = null;
		let mime = 'image/jpg';
		/*
		 * Normally pictures are uploaded under a consistent filename so that pictures are automatically overwritten
		 * If there is no consistent filename passed in, this will allow for infite uploads to the same filepath
		 */
		const imageRef = firebase.storage().ref(filePath).child(fileName || image.filename);

		fs.readFile(imagePath, 'base64')
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
		color: '#FECB00',
		backgroundColor: 'transparent',
		alignSelf: 'center',
		marginLeft: 10
	}
};