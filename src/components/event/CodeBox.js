/*
* Can't figure out how to get this to work. It just fills the screen.
* An example of desired outcome is shown when you click the check in buttons
* in the events page
*/




import {View, Modal, TouchableOpacity, Dimensions, Text, TextInput} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {Button} from '../general/Button';
import {checkIn} from '../../ducks';
import Icons from 'react-native-vector-icons';

const dimension = Dimensions.get('screen');
global.self = global;
const CodeBox = ({
    visible,
    supportedOrientations,
    onRequestClose,
    onShow,
    transparent,
    animationType,
    hardwareAccelerated,
    onDismiss,
    onOrientationChange,
    presentationStyle,
    animated,
    containerStyle,
    textStyle,
    modalStyle,
    onPress,
    code,
}) => {
    const {
        modalContent,
        input,
        text,
        container,
        modal
    } = styles;
    return (
        <View style = {[modal]}
            visible={visible}
            >
            <Modal
            supportedOrientations={supportedOrientations}
            onRequestClose={onRequestClose}
            onShow={onShow}
            transparent={transparent}
            animationType={animationType}
            hardwareAccelerated={hardwareAccelerated}
            onDismiss={onDismiss}
            onOrientationChange={onOrientationChange}
            presentationStyle={presentationStyle}
            animated={animated}
            visible={visible}
            style={[modal,modalContent,containerStyle,modalStyle]}
            >
                <TouchableOpacity onPress={() => {this.setState({visible: false})}}>
                <Text>X</Text>
                </TouchableOpacity>
                <View style={[container]}>
                    <Text style={[text,textStyle]}>Enter Code</Text>
                    <TextInput
                    style={[input,textStyle]}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    autoCapitalize={'characters'}
                    autoCorrect={false}
                    maxLength={4}
                    />
                    <Button 
                        title = "CHECK IN"
                        width = {dimension.width * .6}
                        onPress= {(code, eventID, points) => {}}
                    />
                </View>
            </Modal>
        </View>
    )
}

const styles = {
    text: {
        fontSize: 20
    },
    input: {
        marginTop: dimension.height*.05,
        height: 80,
        textAlign: 'center',
        width: dimension.width*.6,
        backgroundColor: '#FECB0022',
        borderColor: '#FECB00',
        borderRadius: 16,
        borderWidth: 3,
        borderStyle: 'solid',
        fontWeight: 'bold',
        fontSize: 60,
    },
    modal: {
        padding: 100,
        margin: 100,
        width: Dimensions.get("screen").width * .4,
        height: Dimensions.get("screen").height * .8,
    },
    modalContent: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        align: self,
        margin: 0,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 5,
    },
};

CodeBox.defaultProps = {
  containerStyle: styles.modalContent,
  onPress: function(code, eventID, points){
        if(code === this.state.text){
            checkIn(eventID, points)
        }
    }

}

const mapStateToProps = ({}) => {

  return { };
};


const mapDispatchToProps ={
    checkIn
}
export default connect(mapStateToProps, mapDispatchToProps)(CodeBox);
