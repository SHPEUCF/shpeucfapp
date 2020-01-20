import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Modal,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Text,
    SafeAreaView
} from 'react-native';
import { Input } from './Input'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements'
import { Alert } from 'react-native';
import { Button } from './Button'
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



const dimension = Dimensions.get('window');

class FilterPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {text: this.props.value, modalVisible: false, filterOn: false, selectedNames: {}}
    }

    componentDidMount(){
        if (this.props.type === "Multiple"){
            this.setState({modalVisible: true})
        }
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        data: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.shape({})
        ]).isRequired,
        placeholder: PropTypes.string,
        onSelect: PropTypes.func.isRequired,
        inputBoxStyle: PropTypes.shape({}),
        style: PropTypes.shape({}),
        pickerItemStyle: PropTypes.shape({}),
        dropDownArrowStyle: PropTypes.shape({}),
        iconSize: PropTypes.number,
        filter: PropTypes.string,
        iconColor: PropTypes.string,
        onChangeText:  PropTypes.func,
        type: PropTypes.string,
        itemJSX: PropTypes.func
    }

    clickAction(user, index) {
        this.props.onSelect(user, index)
        this.setState({text: `${user.firstName} ${user.lastName}`, modalVisible: false})
    }

    selectUserAction(user) {
        let tmpSelectedNames = Object.assign({}, this.state.selectedNames)
        if(tmpSelectedNames[`${user.id}`])
            tmpSelectedNames[`${user.id}`] = undefined
        else
            tmpSelectedNames[`${user.id}`] = user.id
        this.setState({
            selectedNames: tmpSelectedNames
          })
    }

    renderComponent(item, index) {
        if (this.props.type === "Single"){

           
            const {
                containerStyle,
                contentContainerStyle,
                textStyle,
            } = styles

            let user = item[1]

            var re = new RegExp("^"+this.props.filter, "i");

            if (re.test(`${user.firstName} ${user.lastName}`) ){
            return(
                <TouchableOpacity
                onPress={() => this.clickAction(user, index)}>
                   <View style={[contentContainerStyle]}>
                        <View style={containerStyle}>
                            <View style={{flex:.1}}></View>
                            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <View style = {{flex: 1}}>
                                <Text style={ [textStyle, {fontWeight: 'bold'}]}>{`${user.firstName} ${user.lastName}`}</Text>
                                </View>
                                <View style = {{alignItems: "flex-end", flexDirection: "row", flex: .4}}>
                                <View style = {{flex: .2}}></View>
                                {(user.picture === '') && (
                                <Avatar
                                size = {dimension.height*.08}
                                rounded
                                titleStyle={{backgroundColor: this.props.dashColor}}
                                overlayContainerStyle={{backgroundColor: "black"}}
                                title={user.firstName[0].concat(user.lastName[0])}
                                />
                                )}
                                {(user.picture !== '') && (
                                <Avatar
                                size = {dimension.height*.08}
                                rounded
                                source= {{uri: user.picture}}
                                />
                                )}
                                </View>
                            </View>
                            <View style={{flex:.1}}></View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
            }
            

        }

        else if (this.props.type === "Multiple"){
            
                const {
                    filter,
                    pickerItemStyle,
                    excludeData,
                } = this.props;
                let user = item[1];
        
                const {
                    containerStyle,
                    contentContainerStyle,
                    textStyle,
                } = styles

                if(excludeData && excludeData[user.id]) return null;
        
                let selected = (this.state.selectedNames[`${user.id}`]) ?
                    { backgroundColor: '#f00' }: {};
                var re = new RegExp("^"+filter, "i");
        
                if (re.test(`${user.firstName} ${user.lastName}`) ){
                return(
                    <TouchableOpacity
                    onPress={() => this.selectUserAction(user)}>
                    <View style={[contentContainerStyle, selected]}>
                        <View style={containerStyle}>
                            <View style={{flex:.1}}></View>
                            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <View style = {{flex: 1}}>
                                <Text style={ [textStyle, {fontWeight: 'bold'}]}>{`${user.firstName} ${user.lastName}`}</Text>
                                </View>
                                <View style = {{alignItems: "flex-end", flexDirection: "row", flex: .4}}>
                                <Ionicons
                                onPress={() => this.props.callUser(user.id)}
                                name={'ios-arrow-dropright-circle'}
                                size={dimension.height*.04}
                                color={"#FECB00"}
                                />
                                <View style = {{flex: .2}}></View>
                                {(user.picture === '') && (
                                <Avatar
                                size = {dimension.height*.08}
                                rounded
                                titleStyle={{backgroundColor: this.props.dashColor}}
                                overlayContainerStyle={{backgroundColor: "black"}}
                                title={user.firstName[0].concat(user.lastName[0])}
                                />
                                )}
                                {(user.picture !== '') && (
                                <Avatar
                                size = {dimension.height*.08}
                                rounded
                                source= {{uri: user.picture}}
                                />
                                )}
                                </View>
                            </View>
                            <View style={{flex:.1}}></View>
                        </View>
                    </View>
                    </TouchableOpacity>
                )
                }
            }

        else if (this.props.type === "Searchbar"){
            var re = new RegExp("^"+this.props.filter, "i");
            if (re.test(`${item.firstName} ${item.lastName}`) ){
                return(
                <TouchableOpacity onPress={() => this.props.onSelect(item)}>
                    {this.props.itemJSX(item)}
                </TouchableOpacity>
                )
            }

        }
        
    }

   _keyExtractor = (item, index) => index;

    render = () => {
        let picker = null

        const {
            inputStyle,
            inputStylee,
            inputStyleee,
            iconStyle,
            modalStyle,
            modalBackground,
            textStyle,
            buttonContainer,
            flatlistStyle,
            buttonStyle,
            titleStyle,
        } = styles;

        const {
            title,
            value,
            data,
            placeholder,
            onChangeText,
            style,
            inputBoxStyle,
            dropDownArrowStyle,
            iconSize,
            iconColor
        } = this.props
        if(value !== undefined && value !== null && this.state.text !== String(value)){
            this.setState({text: String(value)})
        }

        if(this.props.type === "Single"){
            picker = <SafeAreaView>
            <View style={[{flexDirection:'row'}, style]}>
                <Input
                style={[inputStyle, inputBoxStyle]}
                value={this.state.text}
                placeholder={placeholder}
                editable={false}
                />
                <Ionicons
                onPress={() => this.setState({modalVisible: true})}
                style={[iconStyle, dropDownArrowStyle]}
                name={'ios-arrow-dropdown'}
                size={iconSize}
                color={iconColor}
                />
            </View>
            <Modal
            transparent={true}
            visible={this.state.modalVisible}>
            <KeyboardAwareScrollView
            style={{backgroundColor:  "#0c0b0b"}}
            resetScrollToCoords={{ x: 0, y: 0}}
            contentContainerStyle={{flexGrow: 1}}
            scrollEnabled={false}
            enableOnAndroid={true}
            >
                <SafeAreaView style={modalBackground}>
                    <View style={modalStyle}>
                        <Input
                        style={[inputStylee, inputStyleee]}
                        onChangeText={onChangeText}
                        value={this.props.filter}
                        placeholder="Search"
                        />
                        <View style={flatlistStyle}>
                            <FlatList
                            data={Object.entries(data)}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={({item, index}) => (
                                this.renderComponent(item, index)
                            )}
                            />
                        </View>
                        <View style={{height: dimension.height *.08, backgroundColor: "black"}}></View>
                        <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * .032, width:"100%"}}>
                            <View style={{flex: .3}}></View>
                            <View style={{flex: 1}}>
                                <Button 
                                title = "Cancel"
                                onPress={() => { this.props.onSelect(placeholder)
                                    this.setState({modalVisible: false})
                                    }}/>
                            </View>
                            <View style={{flex: .3}}></View>
                        </View>
                    </View>
                </SafeAreaView>
             </KeyboardAwareScrollView>
            </Modal>
        </SafeAreaView>
        }

        else if (this.props.type === "Multiple") {
            picker = 
            <Modal
            transparent={true}
            visible={this.state.modalVisible && this.props.visible}>
            <KeyboardAwareScrollView
            style={{backgroundColor:  "#0c0b0b"}}
            resetScrollToCoords={{ x: 0, y: 0}}
            contentContainerStyle={{flexGrow: 1}}
            scrollEnabled={false}
            enableOnAndroid={true}
            >
                <SafeAreaView style={modalBackground}>
                    <SafeAreaView style={modalStyle}>
                        <Input
                        style={[inputStylee, inputStyleee]}
                        onChangeText={onChangeText}
                        value={this.props.filter}
                        placeholder="Search"
                        />
                        <View style={flatlistStyle}>
                            <FlatList
                            data={Object.entries(this.props.data)}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={({item, index}) => (
                                this.renderComponent(item, index)
                            )}
                            />
                        </View>
                        <View style = {{height: dimension.height *.08, backgroundColor: "black"}}>
                            <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * .032, width:"100%", backgroundColor: "black"}}>
                                <View style={{flex: .45}}>
                                    <Button 
                                    title = "Done"
                                    onPress={() => this.props.onSelect(this.state.selectedNames)}
                                    />
                                </View>
                                <View style={{flex: .45}}>
                                    <Button 
                                    title = "Cancel"
                                    onPress={() => this.props.onClose()}
                                    />
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </SafeAreaView>
                </KeyboardAwareScrollView>
            </Modal>
        
        }

        else if (this.props.type === "Searchbar") {
            picker = 
            
                <View style = {{height: dimension.height *.1}}>
                    <Input
                    style={[inputStylee, inputStyleee, {flex: 1}]}
                    onChangeText={onChangeText}
                    value={this.props.filter}
                    placeholder="Search"
                    />
                </View>
        }

        return (
            <View>
             {picker}
            </View>
        )
    };
}


FilterPicker.defaultProps = {
    title: 'Give me a title!',
    placeholder: 'Choose an Option',
    iconSize: 50,
    iconColor: 'white'
}

const styles = {
    itemStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderBottomColor: '#0002',
        borderBottomWidth: 1
    },
    itemTextStyle: {
        paddingTop: dimension.height * .03,
        paddingBottom: dimension.height * .03,
        flex: 1,
        fontSize: 16,
        alignSelf:'center',

    },
    titleStyle: {
        flex: .13,
        alignSelf: 'center',
        fontSize: 20,
        backgroundColor: "white"
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'center'
    },
    flatlistStyle: {
        flex: 1.5
    },
    buttonContainer:{
        flex:.3,
        flexDirection: 'row',
        borderTopColor: '#0001',
        borderTopWidth: 1
    },
    textStyle:{
        flex: 1,
        alignSelf: 'center',
        fontSize: 18,
        paddingTop: dimension.height * .03,
    },
    modalBackground: {
        justifyContent: 'center',
        backgroundColor: '#0c0b0b',
        flex: 1
    },
    modalStyle: {
        flex: 1,
        backgroundColor: 'black',
    },
    inputStyle:{
        flex: 1
    },
    inputStylee:{
        flex: .1
    },
    iconStyle: {
        flex: .2,
        paddingLeft: 10,
        alignSelf: 'center'
    },
    inputStyleee: {
        color: '#000',
        fontSize: 16,
        marginTop: 8,
        marginBottom: 8,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 0,
      },
      containerStyle: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: "center",
      },
      screenBackground: {
        flex: 1,
        backgroundColor: '#0c0b0b',
      },
      curUserHighlight: {
        // backgroundColor: '#ffd70024',
        color: '#aa9100'
      },
      textStyle: {
        color: "#e0e6ed",
        fontSize: dimension.height * .027,
      },
      contentContainerStyle: {
    
        flex: 1,
        height: dimension.height*.14,
        backgroundColor: 'black',
      },
      progress: {
        // flex: 1,
        justifyContent: 'center',
        height: dimension.width*.03,
        borderColor: '#2C3239',
        backgroundColor: '#2C3239',
      },
      textColor: {
        color: '#e0e6ed'
      },
}

export { FilterPicker }