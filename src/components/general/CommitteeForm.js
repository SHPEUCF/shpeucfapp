import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { Input, Button } from '../general';
import { RkAvoidKeyboard, RkButton, RkPicker } from 'react-native-ui-kitten';
import {
    addCommittee,
    editCommittee,
    committeeTitleChanged,
    committeeDescriptionChanged,
    deleteCommittee,

} from '../../ducks'
import { Actions } from 'react-native-router-flux';




class CommitteeForm extends Component {
    // EventCreationError(text) {
    //     this.props.eventError(text);
    // }
    constructor(props) {
      super(props);
      this.state = {oldTitle: this.props.committeeTitle};
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
            committeeTitle,
            candidatePlan,
            committeeDescription,
            committees
        } = this.props;


        var length = (committees !== null && committees !== undefined) ? Object.entries(committees).length : 0

        if (committeeTitle === '') {
            // this.EventCreationError('Please enter a Candidate Name');
        } else if (candidatePlan === '') {
            // this.EventCreationError('Please enter a Plan of action');
        } else if (committeeDescription === '') {
            // this.EventCreationError('Please enter a committee');
        } else{
            if(this.props.title === "ADD"){

                this.props.addCommittee(committeeTitle, committeeDescription, length);
              }
            else {
                if (this.state.oldTitle !== committeeTitle)
                {
                  this.props.editCommittee(committeeTitle, committeeDescription, this.state.oldTitle);
                }
                else{
                this.props.editCommittee(committeeTitle, committeeDescription, null);}
              }
              Actions.CommitteesBackEnd();
        }
    }

    render() {
            return (
                <View style={styles.formContainerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTextStyle}>{this.props.title + " COMMITTEE"}</Text>
                        {/* <Text style={styles.headerSubtitleStyle}>Registration</Text> */}
                    </View>
                    <ScrollView
                    ref={(ref)=> (this.scrollView=ref)}
                    style={styles.scrollView}>
                    {/* <RkAvoidKeyboard> */}
                        <View>
                            <Input
                            placeholder="Committee Title"
                            value={this.props.committeeTitle}
                            onChangeText={this.props.committeeTitleChanged.bind(this)}
                            />
                            <Input
                            placeholder="Committee Description"
                            value={this.props.committeeDescription}
                            onChangeText={this.props.committeeDescriptionChanged.bind(this)}
                            />

                        </View>
                        {this.renderError()}
                    </ScrollView>
                    <Button
                        title = {this.props.title + " COMMITTEE"}
                        onPress={this.onButtonPress.bind(this)}
                    />
                    <Button
                        title = "CANCEL"
                        onPress={Actions.CommitteesBackEnd.bind(this)}
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
        paddingTop: 30,
        padding: 10,
        paddingBottom: 10,
        backgroundColor: "#2C3239"
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
    }
});

const mapStateToProps = ({ general }) => {
    const { committeeTitle, committeeDescription, title, committees} = general

    return { committeeTitle, committeeDescription, title, committees};
};

const mapDispatchToProps = {
   addCommittee,
   editCommittee,
   committeeTitleChanged,
   committeeDescriptionChanged,
   deleteCommittee,
}


export default connect(mapStateToProps, mapDispatchToProps)(CommitteeForm);