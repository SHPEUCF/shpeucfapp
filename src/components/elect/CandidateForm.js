import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { Input, Button } from '../general';
import { RkAvoidKeyboard, RkButton, RkPicker } from 'react-native-ui-kitten';
import {
    addApplication,
    editCandidates,
    candidateFNameChanged,
    candidateLNameChanged,
    candidatePlanChanged,
    candidatePositionChanged
} from '../../actions'
import { Actions } from 'react-native-router-flux';


class CandidateForm extends Component {
    // EventCreationError(text) {
    //     this.props.eventError(text);
    // }


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
            addApplication,
            firstName,
            lastName,
            candidatePlan,
            applyPosition,
            id
        } = this.props;
        //alert("Still need to implement this action")

        /*if (candidateName === '') {
            // this.EventCreationError('Please enter a Candidate Name');
        }*/ if (candidatePlan === '') {
            // this.EventCreationError('Please enter a Plan of action');
        } else{
            if(this.props.title === "ADD")
                this.props.addApplication(firstName, lastName, candidatePlan, applyPosition, id);
            /*else
                this.props.editCandidates(candidateName, candidatePlan, candidatePosition);
            Actions.ElectionCandidates();*/
        }
    }

    render() {
            return (
                <View style={styles.formContainerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTextStyle}>{"Candidate Plan"}</Text>
                        {/* <Text style={styles.headerSubtitleStyle}>Registration</Text> */}
                    </View>
                    <ScrollView
                    ref={(ref)=> (this.scrollView=ref)}
                    style={styles.scrollView}>
                    {/* <RkAvoidKeyboard> */}
                        <View>
                            <Input
                            placeholder="Candidate Plan"
                            value={this.props.candidatePlan}
                            onChangeText={this.props.candidatePlanChanged.bind(this)}
                            />
                        </View>
                        {this.renderError()}
                        <Button
                            title = "APPLY"
                            onPress={this.onButtonPress.bind(this)}
                        />
                        <Button
                            title = "CANCEL"
                            onPress={Actions.popTo.bind(this,"Election")}
                        />
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

const mapStateToProps = ({ elect, auth }) => {
    const {candidatePlan, title, applyPosition} = elect;
    const {firstName, lastName, id} = auth;

    return { firstName , lastName, applyPosition, candidatePlan, title, id };
};

const mapDispatchToProps = {
    addApplication,
    editCandidates,
    candidateFNameChanged,
    candidateLNameChanged,
    candidatePlanChanged,
    candidatePositionChanged
}


export default connect(mapStateToProps, mapDispatchToProps)(CandidateForm);
