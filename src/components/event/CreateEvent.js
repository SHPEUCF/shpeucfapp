import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {
    RkAvoidKeyboard,
    RkTextInput,
    RkButton,
    RkPicker,
    RkText
} from 'react-native-ui-kitten';
import {
    createEvent,
    editEvent,
    typeChanged,
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
} from '../../actions'


class CreateEvent extends Component {
    componentWillMount() {
        if(this.props.name !== '')
            this.props.titleChanged("Edit Event");
            
    }
    onTypeChange(text) {
        this.props.typeChanged(text);
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
                createEvent(type,name,description,date,time,location,points);
            else
                editEvent(type, name, description, date, time, location, points, eventID);
            this.props.goToEvents();
        }
    }

    render() {
            return (
                <View style={styles.formContainerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTextStyle}>{this.props.title}</Text>
                        {/* <Text style={styles.headerSubtitleStyle}>Registration</Text> */}
                    </View>
                    <ScrollView
                    ref={(ref)=> (this.scrollView=ref)}
                    style={styles.scrollView}>
                    {/* <RkAvoidKeyboard> */}
                        <View>
                            <RkTextInput
                            rkType='rounded'
                            placeholder="Event Type"
                            value={this.props.type}
                            maxLength={45}
                            onChangeText={this.onTypeChange.bind(this)}
                            />
                            <RkTextInput
                            rkType='rounded'
                            placeholder="Name"
                            value={this.props.name}
                            autoCapitalize="words"
                            maxLength={45}
                            onChangeText={this.onNameChange.bind(this)}
                            />
                            <RkTextInput
                            rkType='rounded'
                            placeholder="Description"
                            value={this.props.description}
                            autoCapitalize="sentences"
                            maxLength={200}
                            onChangeText={this.onDescriptionChange.bind(this)}
                            />
                            <RkTextInput
                            rkType='rounded'
                            placeholder="Date"
                            value={this.props.date}
                            autoCapitalize="words"
                            maxLength={45}
                            onChangeText={this.onDateChange.bind(this)}
                            />
                            <RkTextInput
                            rkType='rounded'
                            placeholder="Time"
                            value={this.props.time}
                            autoCapitalize="words"
                            maxLength={45}
                            onChangeText={this.onTimeChange.bind(this)}
                            />
                            <RkTextInput
                            rkType='rounded'
                            placeholder="Location"
                            value={this.props.location}
                            autoCapitalize="words"
                            maxLength={45}
                            onChangeText={this.onLocationChange.bind(this)}
                            // onFocus={this.scrollView.scrollTo({x:100,y:100,animated: true})}
                            />
                            <RkTextInput
                            rkType='rounded'
                            placeholder="Value"
                            value={(this.props.points === 0 || this.props.points === undefined)  ? "" : this.props.points.toString()}
                            autoCapitalize="words"
                            maxLength={45}
                            onChangeText={this.onPointsChange.bind(this)}
                            // onFocus={this.scrollView.scrollTo({x:100,y:100,animated: true})}
                            />
                            {/* <RkPicker
                            rkType='rounded'
                            optionHeight={80}
                            optionRkType={'medium'}
                            selectedOptionRkType={'medium danger'}
                            confirmButtonText={'Select'}
                            title="Colleges"
                            titleTextRkType={'large'}
                            data={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}
                            visible={this.state.pickerVisible}
                            onConfirm={this.handlePickedValueCollege}
                            onCancel={this.hidePicker1}
                            selectedOptions={this.state.collegeSelected}
                            /> */}
                        </View>
                    {/* </RkAvoidKeyboard> */}
                        {this.renderError()}
                        <RkButton rkType='rounded stretch'
                            style={{backgroundColor: '#FECB00', marginTop: 10, marginBottom: 10}}
                            contentStyle={{color: 'black', fontWeight: 'bold'}}
                            onPress={this.onButtonPress.bind(this)}
                            >
                            {this.props.title}
                        </RkButton>
                        <RkButton rkType='rounded stretch'
                            style={{backgroundColor: '#FECB00', marginTop: 10, marginBottom: 10}}
                            contentStyle={{color: 'black', fontWeight: 'bold'}}
                            onPress={this.props.goToEvents.bind(this)}
                            >
                            Cancel
                        </RkButton>
                    </ScrollView>
                </View>
            )
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1E1E1',
        justifyContent: 'flex-end',
    },
    formContainerStyle: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 30,
        paddingBottom: 10,
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
    }
});

const mapStateToProps = ({ events }) => {
    const { type, title, name, description, date, time, location, points, error, eventID } = events;

    return { type, title, name, description, date, time, location, points, error, eventID };
};

const mapDispatchToProps = {
    createEvent,
    editEvent,
    typeChanged,
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
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
