import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Modal,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';
import { Input } from './Input'
import { PickerInput } from './PickerInput'
import Ionicons from 'react-native-vector-icons/Ionicons';


const dimension = Dimensions.get('window');

class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            month: "",
            day: "",
            year: ""
        }
    }
    static propTypes = {
        value: PropTypes.object.isRequired,
        onConfirm: PropTypes.func.isRequired
    }

    clickAction(item) {
        this.props.onConfirm(item)
        this.setState({ modalVisible: false})
    }

   _keyExtractor = (item, index) => index;

    render = () => {
        const {
            style,
            iconStyle,
            fieldContainer,
            inputBoxStyle,

        } = styles;

        const {
            title,
            data,
        } = this.props


        return (
            <View>
                <View style={{flexDirection:'row'}}>
                    <View style={fieldContainer}>
                        <PickerInput
                        data={[1,2,3,4,5,6,7,8,9,10,11,12]}
                        style={style}
                        inputBoxStyle={inputBoxStyle}
                        value={this.state.month}
                        placeholder={"MM"}
                        />
                    </View>
                   <View style={fieldContainer}>
                        <PickerInput
                        data={[1,2,3,4]}
                        style={style}
                        inputBoxStyle={inputBoxStyle}
                        value={this.state.day}
                        placeholder={"DD"}
                        />
                    </View>
                    <View style={fieldContainer}>
                        <PickerInput
                        data={[2019,2020,2021]}
                        style={style}
                        inputBoxStyle={inputBoxStyle}
                        value={this.state.year}
                        placeholder={"YYYY"}
                        />
                    </View>
                </View>
            </View>
        )
    };
}


DatePicker.defaultProps = {
    title: 'Give me a title!',
    placeholder: 'Choose an Option'
}

const styles = {
    titleStyle: {
        flex: .13,
        alignSelf: 'center',
        fontSize: 20
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'center'
    },
    fieldContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    style: {
        width: 100,
    },
    inputBoxStyle: {
        width: 10,
        borderRadius: 0
    }
}

export { DatePicker }
