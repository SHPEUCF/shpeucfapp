import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { Input, Button } from '../general';
import { RkAvoidKeyboard, RkButton, RkPicker } from 'react-native-ui-kitten';
import {
    addPosition,
    editPosition,
    positionTitleChanged,
    positionDescriptionChanged,
    deletePosition,
} from '../../actions'
import { Actions } from 'react-native-router-flux';




class PositionForm extends Component {
    // EventCreationError(text) {
    //     this.props.eventError(text);
    // }
    constructor(props) {
      super(props);
      this.state = {oldTitle: this.props.positionTitle};
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
            positionTitle,
            candidatePlan,
            positionDescription
        } = this.props;
        if (positionTitle === '') {
            // this.EventCreationError('Please enter a Candidate Name');
        } else if (candidatePlan === '') {
            // this.EventCreationError('Please enter a Plan of action');
        } else if (positionDescription === '') {
            // this.EventCreationError('Please enter a position');
        } else{
            if(this.props.title === "ADD"){

                this.props.addPosition(positionTitle, positionDescription);
              }
            else {
                if (this.state.oldTitle !== positionTitle)
                {
                  this.props.editPosition(positionTitle, positionDescription, this.state.oldTitle);
                }
                else{
                this.props.editPosition(positionTitle, positionDescription, null);}
              }
            Actions.ElectionPositions();
        }
    }

    render() {
            return (
                <View style={styles.formContainerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTextStyle}>{this.props.title + " POSITION"}</Text>
                        {/* <Text style={styles.headerSubtitleStyle}>Registration</Text> */}
                    </View>
                    <ScrollView
                    ref={(ref)=> (this.scrollView=ref)}
                    style={styles.scrollView}>
                    {/* <RkAvoidKeyboard> */}
                        <View>
                            <Input
                            placeholder="Position Title"
                            value={this.props.positionTitle}
                            onChangeText={this.props.positionTitleChanged.bind(this)}
                            />
                            <Input
                            placeholder="Position Description"
                            value={this.props.positionDescription}
                            onChangeText={this.props.positionDescriptionChanged.bind(this)}
                            />

                        </View>
                        {this.renderError()}
                        <Button
                            title = {this.props.title + " POSITION"}
                            onPress={this.onButtonPress.bind(this)}
                        />
                        <Button
                            title = "CANCEL"
                            onPress={Actions.ElectionPositions.bind(this)}
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
    const { positionTitle, positionDescription, title} = elect;

    return { positionTitle, positionDescription, title};
};

const mapDispatchToProps = {
   addPosition,
   editPosition,
   positionTitleChanged,
   positionDescriptionChanged,
   deletePosition,
}


export default connect(mapStateToProps, mapDispatchToProps)(PositionForm);
