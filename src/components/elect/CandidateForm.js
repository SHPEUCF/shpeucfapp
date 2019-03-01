import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { Input, Button } from '../general';
import { RkAvoidKeyboard, RkButton, RkPicker } from 'react-native-ui-kitten';
import {
    addCandidates,
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
            candidateName,
            candidatePlan,
            candidatePosition
        } = this.props;
        alert("Still need to implement this action")
        return;
        if (candidateName === '') {
            // this.EventCreationError('Please enter a Candidate Name');
        } else if (candidatePlan === '') {
            // this.EventCreationError('Please enter a Plan of action');
        } else if (candidatePosition === '') {
            // this.EventCreationError('Please enter a position');
        } else{
            if(this.props.title === "ADD")
                this.props.addCandidates(candidateFName, candidateLName, candidatePlan, candidatePosition);
            else
                this.props.editCandidates(candidateName, candidatePlan, candidatePosition);
            Actions.ElectionCandidates();
        }
    }

    render() {
            return (
                <View style={styles.formContainerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTextStyle}>{this.props.title + " CANDIDATE"}</Text>
                        {/* <Text style={styles.headerSubtitleStyle}>Registration</Text> */}
                    </View>
                    <ScrollView
                    ref={(ref)=> (this.scrollView=ref)}
                    style={styles.scrollView}>
                    {/* <RkAvoidKeyboard> */}
                        <View>
                            <Input
                            placeholder="Candidate First Name"
                            value={this.props.candidateFName}
                            onChangeText={this.props.candidateFNameChanged.bind(this)}
                            />
                            <Input
                            placeholder="Candidate Last Name"
                            value={this.props.candidateLName}
                            onChangeText={this.props.candidateLNameChanged.bind(this)}
                            />
                            <Input
                            placeholder="Candidate Plan"
                            value={this.props.candidatePlan}
                            onChangeText={this.props.candidatePlanChanged.bind(this)}
                            />
                            <Input
                            placeholder="position needs to be picker"
                            value={this.props.candidatePosition}
                            autoCapitalize="sentences"
                            maxLength={200}
                            onChangeText={this.props.candidatePositionChanged.bind(this)}
                            />
                        </View>
                        {this.renderError()}
                        <Button 
                            title = {this.props.title + " CANDIDATE"}
                            onPress={this.onButtonPress.bind(this)}
                        />
                        <Button 
                            title = "CANCEL"
                            onPress={Actions.ElectionCandidates.bind(this)}
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

const mapStateToProps = ({ elect }) => {
    const { candidateFName, candidateLName, candidatePosition, candidatePlan, title } = elect;

    return { candidateFName,candidateLName, candidatePosition, candidatePlan, title };
};

const mapDispatchToProps = {
    addCandidates,
    editCandidates,
    candidateFNameChanged,
    candidateLNameChanged,
    candidatePlanChanged,
    candidatePositionChanged
}


export default connect(mapStateToProps, mapDispatchToProps)(CandidateForm);
