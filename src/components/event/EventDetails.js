import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    FlatList
} from 'react-native';
import {Button} from '../general'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    goToCreateEvent,
    goToCreateEventFromEdit,
    fetchCode,
    goToEvents,
    deleteEvents,
    getPrivilege,
    checkIn,
    openCheckIn,
    closeCheckIn,
    pageLoad,
    convertNumToDate,
    fetchMembersPoints
} from '../../actions'
import { Actions } from 'react-native-router-flux';

const dimension = Dimensions.get('screen');

class EventDetails extends Component {
    

    componentWillMount() {

        this.props.fetchMembersPoints()
        this.props.pageLoad()
        {this.setState({modalVisible: false})}
        this.props.fetchCode(this.props.eventID)
        this.props.getPrivilege()
    }

    convertNumToDate(date) {
        var months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        temp_date = date.split("-");
        return months[Number(temp_date[1]) - 1] + " " + temp_date[2];
    }

    renderCodeBox(){
        if (this.props.privilege !== undefined && this.props.privilege.board) {
            return (
                <Modal
                transparent={true}
                visible={this.state.modalVisible}>
                     <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={() => {
                                            this.setState({modalVisible: false})
                                            this.props.closeCheckIn(this.props.eventID)}}>
                            <Text>X</Text>
                            </TouchableOpacity>
                            <Text style={styles.modalText}>The event check-in is now open!</Text>
                            <Text style={styles.modalText}>Please provide everyone this code</Text>
                            <Text style={styles.codeText}>{this.props.code}</Text>
                            <Text style={styles.modalText}>When you close this box the event check-in will close</Text>

                        </View>
                    </View>
                </Modal>
            )
        }
        else
        return (
        <Modal
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
            alert('Modal has been closed.');
        }}
        visible={this.state.modalVisible}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => {this.setState({modalVisible: false})}}>
                    <Text>X</Text>
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <Text style={styles.headerTextStyle}>Enter Code</Text>
                        <TextInput
                        style={styles.modalTextInput}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        autoCapitalize={'characters'}
                        autoCorrect={false}
                        maxLength={4}
                        />
                        <Button 
                            title = "CHECK IN"
                            width = {dimension.width * .6}
                            onPress={() => {
                            if(this.props.code === this.state.text){
                                this.checkinButton(this.props.eventID, this.props.points)
                                // this.setState({modalVisible: false})
                            }
                        }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
  }

    renderComponent(item) {
        if(this.props.membersPoints !== undefined && this.props.membersPoints[item] !== undefined){
            const {
                firstName,
                lastName
            } = this.props.membersPoints[item]

            return(
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 16, alignSelf:'center'}}>{firstName} {lastName}</Text>
                </View>
            )
        }
    }
    renderAttendance() {
        
        const {
            privilege,
            eventList,
            eventID
        } = this.props
        
        const {
            lineOnTop,
            attendance
        } = styles

        var attendants = Object.keys(eventList[eventID].attendance)

        if(privilege !== undefined && privilege.board === true){
            return(
                <View style={[{flex: 1, flexDirection: 'column'}, lineOnTop]}>
                    <Text style={attendance}>Attendance</Text>
                    <FlatList
                    data={attendants}
                    extraData={this.state}
                    numColumns={2}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item, separators}) => (
                    this.renderComponent(item)
                    )}/>
                </View>
            )
        }
    }
    openCheckInButton(){
        this.props.openCheckIn(this.props.eventID)
        this.setState({modalVisible: true})
    }
    deleteButton(){
        this.props.deleteEvents(this.props.eventID);
        this.props.goToEvents();
    }
    checkinButton(ID, points){
        this.props.checkIn(ID, points);
    }
    renderButtons(){
        if(this.props.privilege !== undefined && this.props.privilege.board === true){
            return (
                <View>
                    <Button 
                        title = "OPEN CHECK-IN"
                        onPress={this.openCheckInButton.bind(this)}
                    />
                    <Button 
                        title = "DELETE EVENT"
                        onPress={this.deleteButton.bind(this)}
                    />
                    <Button 
                        title = "EDIT EVENT"
                        onPress={this.props.goToCreateEventFromEdit.bind(this)}
                    />
                </View>
            )
            }else
            return(
            <View style={{paddingTop:20, paddingHorizontal:10}}>
                <Button 
                    title = "CHECK IN"
                    onPress={() => {
                        this.setState({modalVisible: true})
                    }}
                />
            </View>
        )
    }
    render() {

        if (this.props.loading) {
            return <Spinner/>
        } 
        else {
            const {
                name,
                description,
                date,
                time,
                location,
            } = this.props

            const { 
                page,
                tabBar,
                tabBarText,
                container,
                icon_container,
                icon,
                text,
                final
            } = styles

            var iconSize = 25
            return (
                <View style={page}>
                    <View style={tabBar}>
                        <Text style={tabBarText}>{name}</Text>
                    </View>
                    <View style={container}>
                        <View style={icon_container}>
                            <Ionicons style={icon} name="md-time" size={iconSize} color='#000000'/>
                            <Text style={text}>{this.convertNumToDate(date)}  {time}</Text>
                        </View>
                        <View style={icon_container}>
                            <Ionicons style={icon} name="md-pin" size={iconSize} color='#000000'/>
                            <Text style={text}>{location}</Text>
                        </View>
                        <View style={[icon_container, {flex: .7}]}>
                            <Ionicons style={icon} name="md-list" size={iconSize} color='#000000'/>
                            <Text style={text}>{description}</Text>
                        </View>
                        <View style = {[icon_container, final]}>
                            {this.renderAttendance()}
                        </View>
                    </View>
                    {this.renderButtons()}
                    {this.renderCodeBox()}
                    <Button 
                        title = "CANCEL"
                        onPress={() => Actions.pop()}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: .95,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 25,
    },
    modalText: {
        alignSelf: 'center',
        fontSize:16
    },
    modalTextInput: {
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
        fontSize: 60
    },
    modalContent: {
        height: dimension.height*.5,
        width: dimension.width*.8,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    modalBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        height: dimension.height,
        width: dimension.width,
        backgroundColor: '#000a'
    },
    final: {
        flex: 1
    },
    icon_container: {
        flex: .2,
        flexDirection: 'row'
    },
    icon: {
        flex: .2
    },
    attendance: {
        fontSize: 20,
        alignSelf: 'center', 
        flex: .15,
        padding: 8
    },
    text: {
        flex: 1,
        fontSize: 20
    },
    lineOnTop: {
        borderTopColor: 'black',
        borderTopWidth: 1,
    },
    codeText: {
        margin:60,
        color: '#FECB00',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 50,
    }, 
    page: {
        flex: 1,
        backgroundColor: '#ebebf1',
    },
    tabBar: {
        height: dimension.height * .1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#0005",
        padding: 10
    },
    tabBarText: {
        color: '#000',
        fontSize: 20,
        margin: 20,
        alignSelf: "center"
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
    }
});

const mapStateToProps = ({ events, auth, members }) => {
  const { type, name, description, date, time, location, points, eventID, error, code, eventList } = events;
  const { privilege } = auth;
  const { membersPoints } = members

  return { type, name, description, date, time, location, points, eventID, error, privilege, code, eventList, membersPoints};
};

const mapDispatchToProps = {
    goToCreateEvent,
    goToCreateEventFromEdit,
    fetchCode,
    goToEvents,
    deleteEvents,
    getPrivilege,
    checkIn,
    openCheckIn,
    closeCheckIn,
    pageLoad,
    convertNumToDate,
    fetchMembersPoints
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
