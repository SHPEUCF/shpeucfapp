import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { NavBar, Button, ButtonLayout, FilterList } from '@/components';
import { SafeAreaView, View, Text } from 'react-native';
import { MemberPanel } from '@/utils/render';
import MemberService from '@/services/members';

const memberService = new MemberService();

class MemberAdmin extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			screenBackground,
			contentContainer,
			textStyle
		} = styles;

		return (
			<SafeAreaView style = { screenBackground }>
				<NavBar title = 'Members' back onBack = { () => Actions.pop() } />
				<View style = { contentContainer }>
					<Text style = { textStyle }>Paid Members</Text>
					<ButtonLayout>
						{ [true, false].map(value =>
							<FilterList
								multiple = { true }
								CustomForm = { this.createButton(value) }
								data = { this.makeUserList(value) }
								regexFunc = { (data) => { return `${data.firstName} ${data.lastName}` } }
								selectBy = { (data) => { return data.id } }
								itemJSX = { (data) => MemberPanel(data) }
								onSelect = { (selectedUsers) =>
									memberService.changePrivilegeOfMembers(
										selectedUsers.map((user) => { return user.id }), 'paidMember', value) }
							/>
						) }
					</ButtonLayout>
				</View>
			</SafeAreaView>
		);
	}

	makeUserList(value) {
		let list = {};

		Object.entries(this.props.allMemberAccounts).forEach(function([userId, userData]) {
			if (!userData.paidMember == value) list[userId] = userData;
		});

		return list;
	}

	createButton(value) {
		let title = value ? 'Add' : 'Remove';
		let ButtonWrapper = (props) => <Button
			title = { title }
			onPress = { props.onPress }
		/>;

		return ButtonWrapper;
	}
}

const styles = {
	screenBackground: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	textStyle: {
		alignSelf: 'center',
		color: 'white',
		fontSize: 18
	}
};

const mapStateToProps = ({ members }) => {
	const {
		allMemberAccounts
	} = members;

	return { allMemberAccounts };
};

export default connect(mapStateToProps)(MemberAdmin);