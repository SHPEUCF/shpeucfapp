import React from 'react';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-crop-picker';
import { Icon, Alert } from '@/components';

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

const uriToBlob = uri => new Promise((resolve, reject) => {
	const xhr = new XMLHttpRequest();

	xhr.onload = () => resolve(xhr.response); // Resolves with blob
	xhr.onerror = () => reject('Could not convert to Blob');
	xhr.responseType = 'blob'; // Ensure a blob is returned

	xhr.open('GET', uri, true);
	xhr.send(null);
});

export const openGallery = (filePath, fileName, onImageStoreFunction) => {
	ImagePicker.openPicker({
		width: 300,
		height: 400,
		compressImageQuality: 0.8,
		mediaType: 'photo',
		cropping: true,
		cropperCircleOverlay: true
	}).then(image => {
		if (!image.filename) image.filename = image.path.split('/').pop();

		const storeImageUrl = (url, filePath) => firebase.database().ref(`${filePath}/`).update({ picture: url });
		const imageRef = firebase.storage().ref(filePath).child(fileName || image.filename);
		let uploadBlob = null;

		uriToBlob(image.path)
			.then(blob => imageRef.put(uploadBlob = blob, { contentType: 'image/jpg' }))
			.then(() => imageRef.getDownloadURL())
			.then(url => onImageStoreFunction ? onImageStoreFunction(url, filePath) : storeImageUrl(url, filePath))
			.then(() => Alert.alert('Successfully updated profile picture', { type: 'success' }))
			.catch(() => Alert.alert('Failed updating profile picture', { type: 'error' }))
			.finally(() => uploadBlob && uploadBlob.close());
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