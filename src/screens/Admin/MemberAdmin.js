import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { NavBar, Button, ButtonLayout, FilterList } from "../../components/general";
import { SafeAreaView, View, Text } from "react-native";
import { changePrivilegeOfMembers } from "../../ducks";
import { MemberPanel } from "../../utils/actions"

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
				<NavBar title = "Members" back onBack = { () => Actions.pop() } />
				<View style = { contentContainer }>
					<Text style = { textStyle }>Paid Members</Text>
					<ButtonLayout>
						{ [true, false].map(value =>
							<FilterList
								type = "Multiple"
								CustomForm = { this.createButton(value) }
								data = { this.makeUserList(value) }
								regexFunc = { (data) => { return `${data.firstName} ${data.lastName}` } }
								selectBy = { (data) => { return data.id } }
								itemJSX = { (data) => MemberPanel(data) }
								onSelect = { (selectedUsers) =>
									changePrivilegeOfMembers(
										selectedUsers.map((user) => { return user.id }), "paidMember", value) }
							/>
						) }
					</ButtonLayout>
				</View>
			</SafeAreaView>
		);
	}

	makeUserList(value) {
		let list = {};

		Object.entries(this.props.userList).forEach(function(user) {
			let userId = user[0];
			let userData = user[1];

			if (!userData.paidMember == value) list[userId] = userData;
		});

		return list;
	}

	createButton(value) {
		let title = value ? "Add" : "Remove";

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
		backgroundColor: "#0c0b0b"
	},
	contentContainer: {
		flex: 1,
		justifyContent: "center"
	},
	textStyle: {
		alignSelf: "center",
		color: "white",
		fontSize: 18
	}
};

const mapStateToProps = ({ members }) => {
	const {
		userList
	} = members;

	return { userList };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberAdmin);