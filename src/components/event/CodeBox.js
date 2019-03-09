import {View, Modal, TouchableOpacity, Dimensions, Text, TextInput} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {Button} from '../general/Button';
import {checkIn} from '../../actions/';
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
                {/* <View style={[modalContent,containerStyle]}> */}
                    <TouchableOpacity onPress={() => {this.setState({modalVisible: false})}}>
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
                            onPress={onPress(code)}
                        />
                    </View>
                {/* </View> */}
            </Modal>
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
        width: Dimensions.get("screen").width * .4,
        height: Dimensions.get("screen").height * .8,
    },
    modalContent: {
        padding: 12,
        flex: 1,
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
