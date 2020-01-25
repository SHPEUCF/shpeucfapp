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




class TimePicker extends Component {

    constructor(props) {
        super(props);
        var time = []
        if(this.props.value !== undefined && this.props.value !== null)
            var time = this.props.value.split(":")
        this.state = {
            hour: (time.length === 3) ? time[0]: "",
            minute: (time.length === 3) ? time[1]: "",
            period: (time.length === 3) ? time[2]: "",
            hourArr: Array.from({length: 12}, (v, k) => k+1),
            minuteArr: [0, 15, 30, 45],
            periodArr: ["AM", "PM"],

            focused: (time.length === 3) ? true : false
        }
    }
    static propTypes = {
        value: PropTypes.object,
        placeholder: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired
    }

    prepend0(item){
        if(item < 10){
            return "0" + item;
        }
        return item
    }

    update(item) {
        const {
            hour,
            minute,
            period
        } = item
        
        this.props.onSelect(item)
}

    //
    clickActionHour(item) {
        item = this.prepend0(item)
        const {
            minute,
            period
        } = this.state
        this.setState({hour: item})

        if(minute !== "" && period !== "") 
            this.update({hour: item, minute: minute, period: period})
    }

    clickActionMinute(item) {
        item = this.prepend0(item)
        const {
            hour, 
            period
        } = this.state

        this.setState({minute: item})

        if(hour !== "" && period !== "")
            this.update({hour: hour, minute: item, period: period})
    }
    
    clickActionPeriod(item) {
        const {
            hour, 
            minute
        } = this.state

        this.setState({period: item})

        if(hour !== "" && minute !== "")
            this.update({hour: hour, minute: minute, period: item})
    }

   _keyExtractor = (item, index) => index;

    render = () => {
        const {
            style,
            timePickerStyle,
            fieldContainer,
            inputBoxStyle,
            dropDownArrowStyle
        } = styles;

        const {
            value,
            placeholder
        } = this.props

        const {
            hour,
            minute,
            period,
            hourArr,
            minuteArr,
            periodArr,
            focused
        } = this.state
        var iconSize = 32
        if(!focused){
            return(
            <View>
                <Input
                placeholder={placeholder}
                onFocus={() => this.setState({focused: true})}/>
            </View>
            )
        } else
        return (
            <View>
                <View style={timePickerStyle}>
                    <View style={fieldContainer}>
                        <PickerInput
                        data={hourArr}
                        style={style}
                        title={"Enter an hour"}
                        inputBoxStyle={inputBoxStyle}
                        dropDownArrowStyle={dropDownArrowStyle}
                        iconSize={iconSize}
                        iconColor='black'
                        value={hour}
                        onSelect={(text) => this.clickActionHour(text)}
                        placeholder={"HH"}
                        />
                    </View>
                   <View style={fieldContainer}>
                        <PickerInput
                        data={minuteArr}
                        style={style}
                        title={"Enter minute"}
                        inputBoxStyle={inputBoxStyle}
                        dropDownArrowStyle={dropDownArrowStyle}
                        iconSize={iconSize}
                        iconColor='black'
                        value={minute}
                        onSelect={(text) => this.clickActionMinute(text)}
                        placeholder={"MM"}
                        />
                    </View>
                    <View style={fieldContainer}>
                        <PickerInput
                        data={periodArr}
                        style={style}
                        title={"Enter AM/PM"}
                        inputBoxStyle={inputBoxStyle}
                        iconSize={iconSize}
                        iconColor='black'
                        dropDownArrowStyle={dropDownArrowStyle}
                        value={period}
                        onSelect={(text) => this.clickActionPeriod(text)}
                        placeholder={"AM/PM"}
                        />
                    </View>
                </View>
            </View>
        )
    };
}


TimePicker.defaultProps = {
    placeholder: 'Choose a Time'
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
        flex: 1,
        width: 130,
    },
    inputBoxStyle: {
        flex: .42,
        borderRadius: 15,
        margin: 5,
        padding: 7,
    },
    dropDownArrowStyle: {
        flex: .3,
        paddingLeft: 0,
    },
    timePickerStyle: {
        flex: 1,
        color: '#000',
        fontSize: 16,
        backgroundColor: 'white',
        borderRadius: 25,
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 8,
    }
}

export { TimePicker }
