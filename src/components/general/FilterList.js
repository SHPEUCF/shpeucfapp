import React, { Component } from "react";
import PropTypes from "prop-types";
import { View,	Modal,	FlatList,	Dimensions,	TouchableOpacity,	Text,	SafeAreaView } from "react-native";
import { Input } from "./Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "./Button";
import { ButtonLayout } from "./ButtonLayout";

/*
	FilterList

	Documentation in progress

	Full Examples
		Single
		<FilterPicker
			type = "Single"
			data = { userList }
			value = { userList[chair.id] }
			placeholder = { "Director/Chairperson" }
			regexFunc = { (data) => { return `${data.firstName} ${data.lastName}` } }
			selectBy = { (data) => { return data.id } }
			onSelect = { (data) => { this.props.chairChanged(data) } }
			itemJSX = { (data) => this.renderMemberComponent(data) }
		/>
		Multiple
		<FilterPicker
			type = "Multiple"
			CustomForm = { Wrapper }
			data = { list }
			regexFunc = { (data) => { return `${data.firstName} ${data.lastName}` } }
			selectBy = { (data) => { return data.id } }
			itemJSX = { (data) => this.renderCheckInComponent(data) }
			onSelect = { (selectedUsers) => {
				this.checkInMembers(selectedUsers);
			} }
		/>
		SearchBar
		<FilterPicker
			title = { "Members" }
			type = "Searchbar"
			data = { sortedMembers }
			search = { this.state.search }
			placeholder = "Find user"
			regexFunc = { (data) => { return `${data.firstName} ${data.lastName}` } }
			onSelect = { (data) => this.callUser(data.id) }
			itemJSX = { (data) => this.renderComponent(data, sortedMembers) }
		/>
*/

const dimension = Dimensions.get("window");

class FilterList extends Component {
	constructor(props) {
		super(props);
		this.state = { val: "", modalVisible: false, filter: "", selected: {} };
	}

	componentDidMount() {
		const {
			type,
			value,
			regexFunc,
			selectBy
		} = this.props;

		let valArray;
		let selectedObj = {};

		if (value) {
			// process initial values and store them into the selected state property

			if (type === "Single" && Object.values(value).length !== 0) {
				this.setState({ val: regexFunc(value) });
				selectedObj[selectBy(value)] = value;
			}
			// multiple values get processed individually and stored into the state property
			// compatible with both array and object values
			else {
				valArray = Array.isArray(value) ? value : Object.values(value);
				valArray.forEach(function (item) {
					selectedObj[selectBy(item)] = item;
				});
			}
			this.setState({ selected: selectedObj });
		}
	}

	static propTypes = {
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.array,
			PropTypes.shape({})
		]).isRequired,
		data: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.shape({})
		]).isRequired,
		CustomForm: PropTypes.func,
		placeholder: PropTypes.string,
		onSelect: PropTypes.func,
		filter: PropTypes.string,
		type: PropTypes.string,
		regexFunc: PropTypes.func,
		selectBy: PropTypes.func,
		itemJSX: PropTypes.func,
		selectionBoxStyle: PropTypes.shape({}),
		searchBoxStyle: PropTypes.shape({}),
		modalBackgroundStyle: PropTypes.shape({})
	}

	render = () => {
		const {
			placeholder,
			type,
			CustomForm,
			search,
			selectionBoxStyle,
			iconColor,
			iconSize
		} = this.props;
		const {
			val,
			modalVisible
		} = this.state;
		const {
			iconStyle,
			dropDownArrowStyle,
			selectionStyle
		} = styles;

		let picker = null;

		if (type === "Searchbar") {
			if (search == null) console.log("You didn't pass in a prop to control the searchbar!");
			picker = <View style = {{ height: dimension.height }}>
				{ search
				&& <View>
					{ this.renderSearchBox() }
				</View> }
				{ this.renderFlatList() }
			</View>;
		}

		else {
			// renders selectively based on whether a CustomForm was supplied
			picker = <SafeAreaView>
				{ !CustomForm && <View style = {{ flexDirection: "row" }}>
					<Input
						style = { [selectionStyle, selectionBoxStyle] }
						value = { val }
						editable = { false }
						placeholder = { placeholder }
					/>
					<Ionicons
						onPress = { () => this.setState({ modalVisible: true }) }
						style = { [iconStyle, dropDownArrowStyle] }
						name = { "ios-arrow-dropdown" }
						size = { iconSize }
						color = { iconColor }
					/>
				</View> }
				{ CustomForm && <CustomForm
					onPress = { () => this.setState({ modalVisible: true }) }
				/> }
				<Modal
					transparent = { true }
					visible = { modalVisible }
				>
					{ this.renderModalContent() }
				</Modal>
			</SafeAreaView>;
		}

		return (
			<View>
				{ picker }
			</View>
		);
	};

	renderModalContent() {
		const {
			modalBackground
		} = styles;
		const {
			modalBackgroundStyle
		} = this.props;

		return (
			<SafeAreaView style = { [modalBackground, modalBackgroundStyle] }>
				{ this.renderSearchBox() }
				{ this.renderFlatList() }
				{ this.renderButtons() }
				<View style = {{ height: dimension.height * 0.08, backgroundColor: "black" }} />
			</SafeAreaView>
		);
	}

	renderSearchBox() {
		const {
			searchStyle,
			searchBoxContainer
		} = styles;
		const {
			searchBoxStyle,
			placeholder
		} = this.props;

		return (
			<View style = { searchBoxContainer }>
				<Input
					style = { [searchStyle, searchBoxStyle] }
					onChangeText = { (text) => this.setState({ filter: text }) }
					value = { this.state.filter }
					placeholder = { placeholder }
				/>
			</View>
		);
	}

	renderFlatList() {
		const {
			data
		} = this.props;

		let newData = Array.isArray(data) ? data : Object.values(data);

		return (
			<FlatList
				data = { newData }
				extraData = { this.state }
				keyExtractor = { this._keyExtractor }
				renderItem = { ({ item }) => this.renderComponent(item) }
			/>
		);
	}

	renderComponent(data) {
		const {
			onSelect,
			regexFunc,
			selectBy,
			type
		} = this.props;

		const {
			filter,
			selected
		} = this.state;

		let re = new RegExp("^" + filter, "i");
		let backgroundColor = {};
		let pressAction = (data) => onSelect(data);

		let regexVal = regexFunc(data);
		let desiredVal = selectBy(data);

		if (type !== "Searchbar") {
			backgroundColor = selected[`${desiredVal}`] ? { backgroundColor: "#f00" } : {};
			pressAction = (data) => this.select(data, desiredVal);
		}

		if (re.test(regexVal))
			return (
				<TouchableOpacity
					onPress = { () => pressAction(data) }>
					<View style = { backgroundColor }>
						{ this.props.itemJSX(data, this.props.regexFunc) }
					</View>
				</TouchableOpacity>
			);
	}

	_keyExtractor = (item, index) => index;

	select(data, desiredVal) {
		const {
			type
		} = this.props;
		const {
			selected
		} = this.state;

		let selectedData = Object.assign({}, selected);

		if (selectedData[`${desiredVal}`]) { selectedData[`${desiredVal}`] = undefined }
		else {
			if (type === "Single") selectedData = {};
			selectedData[`${desiredVal}`] = data;
		}
		this.setState({ selected: selectedData });
	}

	renderButtons() {
		const {
			selected
		} = this.state;
		const {
			type,
			regexFunc
		} = this.props;

		let output = selected;
		let value = "";

		return (
			<ButtonLayout>
				<Button
					title = "Done"
					onPress = { () => {
						if (type === "Single") {
							// automatically derives output value from selected state and displays selected value
							output = Object.values(selected)[0];
							value = regexFunc(output);
						}
						this.props.onSelect(output);
						this.setState({ modalVisible: false, selected: {}, val: value, filter: "" });
					} }
				/>
				<Button
					title = "Cancel"
					onPress = { () => {
						this.setState({ modalVisible: false, selected: {}, filter: "" });
					} }
				/>
			</ButtonLayout>
		);
	}

	// auxiliary function that allows parent to control modalvisibility
	changeVisible(change) {
		this.setState({ modalVisible: change });
	}
}

const defaultJSX = (data, regexFunc) => {
	const {
		contentContainerStyle,
		textStyle
	} = styles;

	return (
		<View style = { contentContainerStyle }>
			<Text style = { textStyle }>  { regexFunc(data) } </Text>
		</View>
	);
};

// handles default values for regexFunc and selectBy props
const defaultValues = (data) => {
	return data;
};

const styles = {
	modalBackground: {
		backgroundColor: "black",
		flex: 1
	},
	selectionStyle: {
		flex: 1
	},
	searchStyle: {
		color: "#000",
		fontSize: 16,
		marginTop: 8,
		marginBottom: 8,
		padding: 15,
		backgroundColor: "white",
		borderRadius: 0,
		flex: 1
	},
	searchBoxContainer: {
		height: dimension.height * 0.12
	},
	iconStyle: {
		flex: 0.2,
		paddingLeft: 10,
		alignSelf: "center"
	},
	contentContainerStyle: {
		height: dimension.height * 0.18,
		alignItems: "flex-start",
		paddingLeft: 40,
		justifyContent: "center"
	},
	textStyle: {
		color: "#e0e6ed",
		fontSize: dimension.width * 0.05
	}
};

FilterList.defaultProps = {
	title: "Give me a title!",
	placeholder: "Choose an Option",
	iconSize: 50,
	iconColor: "white",
	itemJSX: defaultJSX,
	regexFunc: defaultValues,
	selectBy: defaultValues
};

export { FilterList };