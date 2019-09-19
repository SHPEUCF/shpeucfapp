import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { Input, Button } from '../general';
import { RkAvoidKeyboard, RkButton, RkPicker } from 'react-native-ui-kitten';
import {
    addApplication,
    editApplication,
    candidateFNameChanged,
    candidateLNameChanged,
    candidatePlanChanged,
    candidatePositionChanged
} from '../../ducks'
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
            firstName,
            lastName,
            candidatePlan,
            applyPosition,
        } = this.props;
        //alert("Still need to implement this action")

        /*if (candidateName === '') {
            // this.EventCreationError('Please enter a Candidate Name');
        }*/ if (candidatePlan === '') {
            // this.EventCreationError('Please enter a Plan of action');
        } else{
            if(this.props.title === "ADD") {
                this.props.addApplication(firstName, lastName, candidatePlan, applyPosition);}
            else {
                this.props.editApplication(applyPosition, candidatePlan);}
            Actions.ElectionCandidates();
        }
    }

    renderButtons(){
        const {
            buttonContainer
        } = styles
        return (
            <View style={buttonContainer}>
                <Button
                    title = "EDIT"
                    onPress={this.onButtonPress.bind(this)}
                />
                <Button
                    title = "CANCEL"
                    onPress={Actions.ElectionCandidates.bind(this)}
                />
            </View>
        )
    }
    render() {
        const {
            formContainerStyle,
            headerStyle,
            headerTextStyle,
            content,
            textColor
        } = styles
            return (
                <View style={formContainerStyle}>
                    <View style={headerStyle}>
                        <Text style={[headerTextStyle, textColor]}>{"Candidate Plan"}</Text>
                        {/* <Text style={styles.headerSubtitleStyle}>Registration</Text> */}
                    </View>
                        <View style ={content}>
                            <View style={{flex: .4}}>
                                <Input
                                placeholder="Candidate Plan"
                                multiline={true}
                                blurOnSubmit={true}
                                value={this.props.candidatePlan}
                                onChangeText={this.props.candidatePlanChanged.bind(this)}
                                />
                            </View >
                        </View>
                        {this.renderError()}
                        {this.renderButtons()}
                </View>
            )
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    content: {
        flex: 1
    },
    buttonContainer: {
        flex: .2
    },
    formContainerStyle: {
        flex: 1,
        padding: 20,
        backgroundColor: '#2C3239'
    },
    headerStyle: {
        flex: .1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginBottom: 10,
    },
    textColor: {
        color: '#e0e6ed'
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

const mapStateToProps = ({ elect, user }) => {
    const {candidatePlan, title, applyPosition, candidateId} = elect;
    const {firstName, lastName, id} = user;

    return { firstName , lastName, applyPosition, candidatePlan, title, id, candidateId };
};

const mapDispatchToProps = {
    addApplication,
    editApplication,
    candidateFNameChanged,
    candidateLNameChanged,
    candidatePlanChanged,
    candidatePositionChanged
}


export default connect(mapStateToProps, mapDispatchToProps)(CandidateForm);
