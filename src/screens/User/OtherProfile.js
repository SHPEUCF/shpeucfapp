import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Alert, ButtonLayout, NavBar, Avatar, Icon } from '@/components';
import Flag from 'react-native-flags';
import { verifiedCheckMark } from '@/utils/render';

const dimension = Dimensions.get('screen');

class OtherProfile extends Component {
	render() {
		return (
			this.renderContent()
		);
	}

	renderContent() {
		const {
			email, major, points
		} = this.props.visitedMember;
		const {
			bioContainer,
			fieldContainerStyle,
			itemLabelText,
			itemValueText,
			textColor
		} = styles;

		return (
			<SafeAreaView style = {{ flex: 1, backgroundColor: '#0c0b0b' }}>
				<NavBar back onBack = { () => Actions.pop() } />
				<View style = {{ backgroundColor: 'black', flex: 1 }}>
					{ this.renderPicture() }
					<View style = { [bioContainer] }>
						<View style = {{ flex: 0.2 }}></View>
						<View style = {{ flexDirection: 'row', flex: 1.5, justifyContent: 'space-evenly' }}>
							<View style = {{ flex: 0.1 }}></View>
							<View style = { [fieldContainerStyle, { flex: 0.3 }] }>
								<View style = {{ flex: 1, justifyContent: 'center' }}>
									<Text style = { [itemLabelText, textColor] }>Email:</Text>
								</View>
								{ this.props.major !== '' && <View style = {{ flex: 1, justifyContent: 'center' }}>
									<Text style = { [itemLabelText, textColor] }>Major:</Text>
								</View> }
								<View style = {{ flex: 1, justifyContent: 'center' }}>
									<Text style = { [itemLabelText, textColor] }>Points:</Text>
								</View>
							</View>
							<View style = { [fieldContainerStyle] }>
								<View style = {{ flex: 1, justifyContent: 'center' }}>
									<Text style = { [itemValueText, textColor] }>{ email }</Text>
								</View>
								{ this.props.major !== '' && <View style = {{ flex: 1, justifyContent: 'center' }}>
									<Text style = { [itemValueText, textColor] }>{ major }</Text>
								</View> }
								<View style = {{ flex: 1, justifyContent: 'center' }}>
									<Text style = { [itemValueText, textColor] }>{ points }</Text>
								</View>
							</View>
							<View style = {{ flex: 0.1 }}></View>
						</View>
						<View style = {{ flex: 0.2 }}></View>
					</View>
					{ this.renderSocialMedia() }
					{ this.renderFlag() }
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
			paidMember,
			color
		} = this.props.visitedMember;

		return (
			<View style = { headerInfoContainer }>
				<View style = {{ flex: 1, paddingTop: '8%', marginBottom: '30%' }}>
					<Avatar
						size = 'xlarge'
						title = { firstName[0].concat(lastName[0]) }
						source = { picture }
						style = {{ backgroundColor: color }}
					/>
				</View>
				<View style = { [taglineContainer] }>
					<View style = { row }>
						<Text style = { [nameLabelText, textColor] }>{ firstName } { lastName }</Text>
						{ verifiedCheckMark({ paidMember }) }
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

	renderFlag() {
		let flag = null;

		if (this.props.flag !== '' && this.props.flag) {
			flag = <Flag
				type = 'flat'
				code = { this.props.flag }
				size = { 32 }
			/>;
		}

		return (
			<ButtonLayout>
				<View style = {{ alignItems: 'center' }}>
					{ flag }
				</View>
			</ButtonLayout>
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
					<View style = { [LogoContainer, { backgroundColor: this.props.color, flex: 1 }] }>
						<TouchableOpacity
							onPress = { () => {
								Alert.alert('Coming Soon');
								// Actions.PostShow({ title: 'Linkedin', uri: 'https://www.linkedin.com/'})
							} }>
							<Icon name = 'logo-linkedin' size = { dimension.height * 0.045 } color = 'white' />
						</TouchableOpacity>
					</View>
					<View style = {{ flex: 0.01 }}></View>
					<View style = { [LogoContainer, { backgroundColor: this.props.color, flex: 1 }] }>
						<TouchableOpacity
							onPress = { () => {
								Alert.alert('Coming Soon');
								// Actions.PostShow({ title: 'Github', uri: 'https://www.github.com/'})
							} } >
							<Icon name = 'mail' size = { dimension.height * 0.045 } color = 'white' />
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
		backgroundColor: 'black',
		alignItems: 'center',
		borderBottomColor: '#e0e6ed22'
	},
	textColor: {
		color: '#e0e6ed'
	},
	row: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row'
	},
	taglineContainer: {
		flex: 0.4,
		paddingVertical: '3%',
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '70%'
	},
	fieldContainerStyle: {
		height: '100%',
		flexDirection: 'column',
		alignItems: 'flex-start',
		flex: 1
	},
	nameLabelText: {
		fontSize: dimension.height * 0.03,
		fontWeight: 'bold',
		color: '#fff',
		lineHeight: dimension.height * 0.03
	},
	itemLabelText: {
		fontSize: dimension.height * 0.02,
		fontWeight: 'bold',
		color: '#fff',
		lineHeight: dimension.height * 0.03
	},
	itemValueContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	itemValueText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#fff'
	},
	buttonsContainerStyle: {
		flex: 0.4
	},
	LogoContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	socialmediarow: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'black'
	},
	bioContainer: {
		flex: 0.7,
		backgroundColor: '#21252b'
	},
	socialmediatext: {
		flex: 1,
		alignSelf: 'center'
	}
};

const mapStateToProps = ({ members: { visitedMember } }) => ({ visitedMember });

export default connect(mapStateToProps)(OtherProfile);