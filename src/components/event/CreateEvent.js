import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {View, StyleSheet, Text, ScrollView, Modal, Dimensions, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import { Input, Button, PickerInput, DatePicker, TimePicker } from '../general';
import {
    createEvent,
    editEvent,
    typeChanged,
    committeeChanged,
    titleChanged,
    nameChanged,
    descriptionChanged,
    dateChanged,
    startTimeChanged,
    endTimeChanged,
    locationChanged,
    epointsChanged,
    eventError,
    goToCreateEvent,
    goToEvents
} from '../../ducks'

const dimension = Dimensions.get('window');

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {text: this.props.value, modalVisible: false}
    }

    componentDidMount() {
        if(this.props.name !== ''){
            this.props.titleChanged("Edit Event");
            this.setState({changedStart: false, changedEnd: false})
        }
    }
    onTypeChange(text) {
        this.onCommitteeChange('');
        this.props.typeChanged(text);
        switch (text){
            case "Social Event":
                this.onPointsChange(3);
                break;
            case "Volunteer Event":
                    this.onPointsChange(3);
                    break;
            case "GBM":
                    this.onPointsChange(5);
                    break;
            case "Workshop":
                    this.onPointsChange(3);
                    break;
            case "Committee":
                    this.onPointsChange(2);
                    break;
            default:
                    this.onPointsChange('');
        }
    }
    onCommitteeChange(text) {
        this.props.committeeChanged(text);
    }
    onNameChange(text) {
        this.props.nameChanged(text);
    }
    onDescriptionChange(text) {
        this.props.descriptionChanged(text);
    }
    onDateChange(text) {
        this.props.dateChanged(text);
    }
    onStartTimeChange(text) {
        if (!this.state.changedStart && this.props.title === "Edit Event") this.setState({changedStart: true})
        this.props.startTimeChanged(this.convertToMilitary(text));
    }
    onEndTimeChange(text) {
        if (!this.state.changedEnd && this.props.title === "Edit Event") this.setState({changedEnd: true})
        this.props.endTimeChanged(this.convertToMilitary(text));
    }
    onLocationChange(text) {
        this.props.locationChanged(text);
    }
    onPointsChange(text) {
        this.props.epointsChanged(text);
    }
    EventCreationError(text) {
        this.props.eventError(text);
    }

    renderError() {
        if (this.props.error) {
            return (
            <View>
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
            </View>
            );
        }
    }

    convertToMilitary(text){
        if (text.hour === "12"){
            text.hour = "0" + 0
            if (text.period === "PM") {text.hour = "" + 12}
        } 
        else if (text.period === "PM") text.hour = "" + (parseInt(text.hour) + 12)

        return `${text.hour}:${text.minute}:${text.period}`
    }

    onButtonPress() {
        const {
            type,
            committee,
            name,
            description,
            date,
            startTime,
            endTime,
            location,
            points,
            eventID
        } = this.props;

        startTimeComp = startTime.split(":")

        endTimeComp = endTime.split(":")

        if (!this.state.changedStart && this.props.title === "Edit Event"){
            var newS = this.convertToMilitary({hour: startTimeComp[0], minute: startTimeComp[1], period: startTimeComp[2]})
            startTimeComp = newS.split(":")
        }

        if (!this.state.changedEnd && this.props.title === "Edit Event"){
            var newE = this.convertToMilitary({hour: endTimeComp[0], minute: endTimeComp[1], period: endTimeComp[2]})
            endTimeComp = newE.split(":")
        }

        if (type === '') {
            this.EventCreationError('Please enter event type');
        } else if (name === '') {
            this.EventCreationError('Please enter event name');
        } else if (date === '') {
            this.EventCreationError('Please enter the date of the event');
        } else if (startTime === '') {
            this.EventCreationError('Please enter the starting time of the event');
        } else if (endTime === '') {
            this.EventCreationError('Please enter the ending time of the event');
        } else if (endTimeComp[0] < startTimeComp[0]) {
            this.EventCreationError('Ending time must be after start time');
        } else if (endTimeComp[0] === startTimeComp[0] && (endTimeComp[1] <= startTimeComp[1])) {
            this.EventCreationError('Ending time must be after start time');
        } else if (location === '') {
            this.EventCreationError('Please enter where the event is taking place');
        } else if (points === 0){
            this.EventCreationError('Please enter how many points the event is worth');
        }else{
            if(this.props.title === "Create Event")
            createEvent(type, committee, name, description, date, startTime, endTime, location, points);
            else{
            editEvent(type, committee, name, description, date, `${startTimeComp[0]}:${startTimeComp[1]}:${startTimeComp[2]}`, `${endTimeComp[0]}:${endTimeComp[1]}:${endTimeComp[2]}`, location, points, eventID);
            this.props.startTimeChanged(this.convertHour(`${startTimeComp[0]}:${startTimeComp[1]}:${startTimeComp[2]}`))
            this.props.endTimeChanged(this.convertHour(`${endTimeComp[0]}:${endTimeComp[1]}:${endTimeComp[2]}`))
            }
            Actions.pop();
        }
    }

    clickAction(item) {
        this.onCommitteeChange(item)
        this.setState({text: String(item), modalVisible: false})
    }

    convertHour(time){
    var array = time.split(":")

    if(array[2] === "AM") {
    var hour = "" + (parseInt(array[0])) 
    if (hour === "0") hour = "12"
    return hour + ":" + array[1] + ":" +array[2]
    }
    
    var hour = "" + (parseInt(array[0]) - 12) 
    if (hour === "0") hour = "12"
    return hour + ":" + array[1] + ":" +array[2]
    }
    
    prepend0(time){
		var array = time.split(":")
        var hour = "" + (parseInt(array[0])) 
        return hour + ":" + array[1] + ":" +array[2]
	}

    renderComponent(item) {

        const {
            itemStyle,
            itemTextStyle
        } = styles

        const dataArr = Object.keys(this.props.committeesList)

        last = (item[0] == dataArr[dataArr.length - 1]) ? 
            {borderBottomColor: '#0000'} : {}
        return(
            <TouchableOpacity
            onPress={() => this.clickAction(item)}>
                <View style={[itemStyle, this.props.pickerItemStyle,last]}>
                    <Text style={itemTextStyle}>{item}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => index;

    showCommittees(){
        const {
            modalStyle,
            modalBackground,
            textStyle,
            buttonContainer,
            flatlistStyle,
            buttonStyle,
            titleStyle
        } = styles;

        if (this.props.type == "Committee")
        {
            return (

                <View>
                <Modal
                transparent={true}
                visible={this.state.modalVisible}>
                    <View style={modalBackground}>
                        <View style={modalStyle}>
                            <Text style={titleStyle}>{"Committees"}</Text>
                            <View style={flatlistStyle}>
                                <FlatList
                                data={Object.keys(this.props.committeesList)}
                                extraData={this.props}
                                keyExtractor={this._keyExtractor}
                                renderItem={({item}) => (
                                    this.renderComponent(item)
                                )}
                                />
                            </View>
                            <View style={buttonContainer}>
                                <TouchableOpacity  
                                style={buttonStyle}
                                onPress={() => this.setState({modalVisible: false})}>
                                    <Text style={textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            )
        }
    }

    render() {
            var stringType;
            if(this.props.type === "Committee"){

                if(this.props.committee !== ''){
                    stringType = this.props.type + ": " + this.props.committee
                }

                else{
                    stringType = this.props.type;
                }
            }

            else{
                stringType = this.props.type;
            }
            return (
                <SafeAreaView style={styles.formContainerStyle}>
                    <View style={{backgroundColor: "black", flex: 1}}>
                    <View style={{flex: .02}}></View>
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTextStyle}>{this.props.title}</Text>
                    </View>
                    <View style={{flex: .02}}></View>
                    <ScrollView
                    ref={(ref)=> (this.scrollView=ref)}
                    style={styles.scrollView}>
                        <View>
                            <PickerInput
                            placeholder="Event Type"
                            value={stringType}
                            data={["Committee","Social Event","Volunteer Event", "GBM", "Workshop","Other"]}
                            onSelect={(item) => {this.onTypeChange(item);
                            this.setState({modalVisible: true})}}
                            />
                            {this.showCommittees()}
                            <Input
                            placeholder="Name"
                            value={this.props.name}
                            onChangeText={this.onNameChange.bind(this)}
                            />
                            <Input
                            placeholder="Description (Optional)"
                            value={this.props.description}
                            autoCapitalize="sentences"
                            maxLength={200}
                            onChangeText={this.onDescriptionChange.bind(this)}
                            />
                            <DatePicker
                            placeholder={"Date"}
                            value={this.props.date}
                            onSelect={(text) => this.onDateChange(text)}
                            />
                            <TimePicker
                            placeholder={"Start Time"}
                            value={this.props.startTime}
                            onSelect={(text) => this.onStartTimeChange(text)}
                            />
                             <TimePicker
                            placeholder={"End Time"}
                            value={this.props.endTime}
                            onSelect={(text) => this.onEndTimeChange(text)}
                            />
                            <Input
                            placeholder="Location"
                            value={this.props.location}
                            onChangeText={this.onLocationChange.bind(this)}
                            />
                            <Input
                            placeholder="Value"
                            value={(this.props.points === 0 || this.props.points === undefined)  ? "" : this.props.points.toString()}
                            onChangeText={this.onPointsChange.bind(this)}
                            />
                        </View>
                    </ScrollView>
                    <View style={{flex: .5}}></View>
                        {this.renderError()}
                        <SafeAreaView>
                        <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * .032, width:"100%"}}>
                        <View style={{flex: .45}}>
                        <Button 
                            title = {this.props.title}
                            onPress={this.onButtonPress.bind(this)}
                        />
                        </View>
                        <View style={{flex: .45}}>
                        <Button 
                            title = "Cancel"
                            onPress={() => {
                                if(this.props.title === "Edit Event"){
                                    this.props.startTimeChanged(this.prepend0(this.props.startTime))
                                    this.props.endTimeChanged(this.prepend0(this.props.endTime))
                                }
                                Actions.pop()}
                        }
                        />
                        </View>
                        </View>
                    </SafeAreaView>
                    </View>
                    <View style={{height: dimension.height *.08, backgroundColor: "#0c0b0b"}}></View>
                </SafeAreaView>
            )
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    itemStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderBottomColor: '#0002',
        borderBottomWidth: 1
    },
    itemTextStyle: {
        paddingTop: dimension.height * .03,
        paddingBottom: dimension.height * .03,
        flex: 1,
        fontSize: 16,
        alignSelf:'center',
    },
    formContainerStyle: {
        flex: 1,
        backgroundColor: '#0c0b0b'
    },
    headerStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex:.5
    },
    headerTextStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#e0e6ed'
    },
    errorTextStyle: {
        fontSize: 14,
        alignSelf: 'center',
        color: 'red',
        fontWeight: 'bold',
        padding: 10,
    },
    pickerTextInput: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        backgroundColor: "black",
        height: "50%",
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    titleStyle: {
        flex: .13,
        alignSelf: 'center',
        fontSize: 20
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'center'
    },
    flatlistStyle: {
        flex: .8
    },
    buttonContainer:{
        flex:.2,
        flexDirection: 'row',
        borderTopColor: '#0001',
        borderTopWidth: 1
    },
    textStyle:{
        flex: 1,
        alignSelf: 'center',
        fontSize: 18,
        paddingTop: 5
    },
    modalBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0003',
        margin: 0,
        height: dimension.height,
        width: dimension.width,
    },
    modalStyle: {
        height: dimension.height*.4,
        width: dimension.width*.8,
        backgroundColor:'#fff',
        padding: 12,
        borderRadius: 12,
    },
});

const mapStateToProps = ({ events, committees }) => {
    const { type, title, committee, name, description, date, startTime, endTime, location, points, error, eventID } = events;
    const { committeesList } = committees;

    return { type, title, name, description, date, startTime, endTime, location, points, error, eventID, committeesList, committee};
};

const mapDispatchToProps = {
    createEvent,
    editEvent,
    typeChanged,
    titleChanged,
    committeeChanged,
    nameChanged,
    descriptionChanged,
    dateChanged,
    startTimeChanged,
    endTimeChanged,
    locationChanged,
    epointsChanged,
    eventError,
    goToCreateEvent,
    goToEvents
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
