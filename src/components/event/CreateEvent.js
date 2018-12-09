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
    typeChanged,
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
            points
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
            createEvent(type,name,description,date,time,location,points);
            this.props.goToEvents();
        }
    }

    render() {
            return (
                <View style={styles.formContainerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTextStyle}>Create Event</Text>
                        {/* <Text style={styles.headerSubtitleStyle}>Registration</Text> */}
                    </View>
                    <ScrollView
                    style={styles.scrollView}>
                    <RkAvoidKeyboard>
                        <View>
                            <RkTextInput
                            rkType='rounded'
                            placeholder="Event Type"
                            value={this.props.type}
                            autoCapitalize="words"
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
                            autoCapitalize="words"
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
                            />
                            <RkTextInput
                            rkType='rounded'
                            placeholder="Value"
                            value={this.props.value}
                            autoCapitalize="words"
                            maxLength={45}
                            onChangeText={this.onPointsChange.bind(this)}
                            />
                        </View>
                    </RkAvoidKeyboard>
                        {this.renderError()}
                        <RkButton rkType='rounded stretch'
                            style={{backgroundColor: '#FECB00', marginTop: 10, marginBottom: 10}}
                            contentStyle={{color: 'black', fontWeight: 'bold'}}
                            onPress={this.onButtonPress.bind(this)}
                            >
                            Create Event
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
  const { type, name, description, date, time, location, points, error } = events;

  return { type, name, description, date, time, location, points, error };
};

const mapDispatchToProps = {
    createEvent,
    typeChanged,
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
