import React from 'react';
import { ScrollView, SafeAreaView, View, Dimensions } from 'react-native';
import { Button, ButtonLayout, NavBar } from '@/components';

export const FormModal = ({ modal: { params: { title, elementsHTML, submitButtonName, submit, reset } } }) => (
	<View style = { styles.container }>
		<SafeAreaView style = { styles.container }>
			<ScrollView style = { styles.elementsStyle }>{ elementsHTML }</ScrollView>
			<ButtonLayout>
				<Button title = { submitButtonName || 'Confirm' } onPress = { submit } />
				<Button title = 'Cancel' onPress = { reset } />
			</ButtonLayout>
		</SafeAreaView>
	</View>
);

const styles = {
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
	elementsStyle: {
		flex: 0.8
	}
};