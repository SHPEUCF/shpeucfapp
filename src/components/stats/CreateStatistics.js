import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { Input, Button } from '../general';
import { RkAvoidKeyboard, RkButton, RkPicker } from 'react-native-ui-kitten';
import {
    
} from '../../ducks'
import { Actions } from 'react-native-router-flux';

var filters = []

const obj = {
        "keys1" : "poop",
        "keys2" : "poop",
        "keys3" : "poop",
}
filters = [];
for(k in obj){
    filters.push(k.key)
}


class CreateStatistics extends Component {
    componentWillMount() {
        // if(this.props.name !== '')
        //     this.props.titleChanged("Edit Event");

    }

    // hidepicker = () =>{
    //     this.setState({pickerVisible: false})
    // }

    // handlePickedValueCollege = (input) =>{
    //     this.setState({collegeSelected: input});
    //     this.populateMajorArray(input);
    //     this.hidePicker();
    // };

    onButtonPress() {
        const {
           
        } = this.props;

        // if (type === '') {
        //     this.EventCreationError('Please enter event type');
        // } else if (name === '') {
        //     this.EventCreationError('Please enter event name');
        // } else if (description === '') {
        //     this.EventCreationError('Please enter a short event description');
        // } else if (date === '') {
        //     this.EventCreationError('Please enter the date of the event');
        // } else if (time === '') {
        //     this.EventCreationError('Please enter the time of the event');
        // } else if (location === '') {
        //     this.EventCreationError('Please enter where the event is taking place');
        // } else if (points === 0){
        //     this.EventCreationError('Please enter how many points the event is worth');
        // }else{
        //     if(this.props.title === "Create Event")
        //         createEvent(type,name,description,date,time,location,points);
        //     else
        //         editEvent(type, name, description, date, time, location, points, eventID);
        //     this.props.goToEvents();
        // }
    }

    render() {
            return (
                <View style={styles.formContainerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTextStyle}>Create Statistics</Text>
                        {/* <Text style={styles.headerSubtitleStyle}>Registration</Text> */}
                    </View>
                    {/* <RkAvoidKeyboard> */}
                        <View>
                            {/* <RkPicker
                            rkType='rounded'
                            optionHeight={80}
                            optionRkType={'medium'}
                            selectedOptionRkType={'medium danger'}
                            confirmButtonText={'Select'}
                            title="Filters"
                            titleTextRkType={'large'}
                            data={filters}
                            onConfirm={this.handlePickedValueCollege}
                            onCancel={this.hidepicker}
                            selectedOptions={this.state.collegeSelected}
                            /> */}
                        </View>
                    {/* </RkAvoidKeyboard> */}
                        <Button 
                            title = "CREATE STATISTICS"
                            onPress={this.onButtonPress.bind(this)}
                        />
                        <Button 
                            title = "CANCEL"
                            onPress={Actions.popTo.bind(this,'Statistics')}
                        />
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

const mapStateToProps = ({ members }) => {

    return {  };
};

const mapDispatchToProps = {
  
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateStatistics);
