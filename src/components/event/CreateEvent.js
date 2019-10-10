import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet, Text, ScrollView, Modal, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import { Input, Button, PickerInput, DatePicker } from '../general';
import { RkAvoidKeyboard, RkButton, RkPicker } from 'react-native-ui-kitten';
import {
    createEvent,
    editEvent,
    typeChanged,
    committeeChanged,
    titleChanged,
    nameChanged,
    descriptionChanged,
    dateChanged,
    timeChanged,
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

    componentWillMount() {
        if(this.props.name !== '')
            this.props.titleChanged("Edit Event");

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
    onTimeChange(text) {
        this.props.timeChanged(text);
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

    onButtonPress() {
        const {
            type,
            committee,
            name,
            description,
            date,
            time,
            location,
            points,
            eventID
        } = this.props;

        if (type === '') {
            this.EventCreationError('Please enter event type');
        } else if (name === '') {
            this.EventCreationError('Please enter event name');
        } else if (description === '') {
            this.EventCreationError('Please enter a short event description');
        } else if (date === '') {
            this.EventCreationError('Please enter the date of the event');
        } else if (time === '') {
            this.EventCreationError('Please enter the time of the event');
        } else if (location === '') {
            this.EventCreationError('Please enter where the event is taking place');
        } else if (points === 0){
            this.EventCreationError('Please enter how many points the event is worth');
        }else{
            if(this.props.title === "Create Event")
            createEvent(type, committee, name, description, date, time, location, points);
            else
            editEvent(type, committee, name, description, date, time, location, points, eventID);
            this.props.goToEvents();
        }
    }

    clickAction(item) {
        this.onCommitteeChange(item)
        this.setState({text: String(item), modalVisible: false})
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
                <View style={styles.formContainerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTextStyle}>{this.props.title}</Text>
                    </View>
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
                            placeholder="Description"
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
                            <Input
                            placeholder="Time"
                            value={this.props.time}
                            onChangeText={this.onTimeChange.bind(this)}
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
                        {this.renderError()}
                        <Button 
                            title = {this.props.title}
                            onPress={this.onButtonPress.bind(this)}
                        />
                        <Button 
                            title = "CANCEL"
                            onPress={this.props.goToEvents.bind(this)}
                        />
                </View>
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
        padding: 20,
        backgroundColor: '#21252b'
    },
    headerStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginBottom: 10,
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
        flex: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 10,
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
    const { type, title, committee, name, description, date, time, location, points, error, eventID } = events;
    const { committeesList } = committees;

    return { type, title, name, description, date, time, location, points, error, eventID, committeesList, committee };
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
    timeChanged,
    locationChanged,
    epointsChanged,
    eventError,
    goToCreateEvent,
    goToEvents
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
