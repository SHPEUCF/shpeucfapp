import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Modal,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';
import { Input } from './Input'
import Ionicons from 'react-native-vector-icons/Ionicons';


const dimension = Dimensions.get('window');

class PickerInput extends Component {

    constructor(props) {
        super(props);
        this.state = {text: '', modalVisible: false}
    }
    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.shape({})
        ]).isRequired,
        placeholder: PropTypes.string,
        onChangeText: PropTypes.func.isRequired
    }

    renderComponent(item) {

        const {
            itemStyle,
            itemTextStyle
        } = styles
        last = (item[1] == this.props.data[item.length]) ? 
            {borderBottomColor: '#0000'} : {}
        return(
            <TouchableOpacity
            onPress={() => this.setState({text: item[1], modalVisible: false})}>
                <View style={[itemStyle,last]}>
                    <Text style={itemTextStyle}>{item[1]}</Text>
                </View>
            </TouchableOpacity>
        )
    }

   _keyExtractor = (item, index) => index;

    render = () => {
        const {
            inputStyle,
            iconStyle,
            modalStyle,
            modalBackground,
            textStyle,
            buttonContainer,
            flatlistStyle,
            buttonStyle,
            titleStyle
        } = styles;

        const {
            title,
            data,
            placeholder,
            onChangeText
        } = this.props


        return (
            <View>
                <View style={{flexDirection:'row'}}>
                    <Input
                    style={inputStyle}
                    value={this.state.text}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    editable={false}
                    />
                    <Ionicons
                    onPress={() => this.setState({modalVisible: true})}
                    style={iconStyle}
                    name={'ios-arrow-dropdown'}
                    size={50}/>
                </View>
                <Modal
                transparent={true}
                visible={this.state.modalVisible}>
                    <View style={modalBackground}>
                        <View style={modalStyle}>
                            <Text style={titleStyle}>{title}</Text>
                            <View style={flatlistStyle}>
                                <FlatList
                                data={Object.entries(data)}
                                extraData={this.state}
                                keyExtractor={this._keyExtractor}
                                renderItem={({item}) => (
                                    this.renderComponent(item)
                                )}
                                />
                            </View>
                            <View style={buttonContainer}>
                                <TouchableOpacity  
                                style={buttonStyle}
                                onPress={() => this.setState({modalVisible: false})}>
                                    <Text style={textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    };
}


PickerInput.defaultProps = {
    title: 'Give me a title!',
    placeholder: 'Choose an Option'
}

const styles = {
    itemStyle: {
        flex: 1,
        height: dimension.height *.1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderBottomColor: '#0002',
        borderBottomWidth: 1
    },
    itemTextStyle: {
        padding: dimension.height * .028,
        flex: 1,
        fontSize: 16,
        alignSelf:'center',
        
    },
    titleStyle: {
        flex: .13,
        alignSelf: 'center',
        fontSize: 20
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'center'
    },
    flatlistStyle: {
        flex: .8,
        // backgroundColor: '#000a'
    },
    buttonContainer:{
        flex:.2,
        flexDirection: 'row',
        borderTopColor: '#0001',
        borderTopWidth: 1
    },
    textStyle:{
        flex: 1,
        alignSelf: 'center',
        fontSize: 18,
        paddingTop: 5
    },
    modalBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0003',
        margin: 0,
        height: dimension.height,
        width: dimension.width,
    },
    modalStyle: {
        height: dimension.height*.4,
        width: dimension.width*.8,
        backgroundColor:'#fff',
        padding: 12,
        borderRadius: 12,
    },
    inputStyle:{
        flex: 1
    },
    iconStyle: {
        flex: .2,
        paddingLeft: 10,
        alignSelf: 'center'
    }
}

export { PickerInput }
