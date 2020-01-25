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
    FlatList,
    Linking,
    SafeAreaView,
    Alert
} from 'react-native';
import { Button, NavBar, FilterPicker } from '../general'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    goToCreateEvent,
    goToCreateEventFromEdit,
    fetchCode,
    goToEvents,
    deleteEvents,
    getPrivilege,
    checkIn,
    rsvp,
    openCheckIn,
    closeCheckIn,
    pageLoad,
    convertNumToDate,
    fetchAllUsers,
    emailListUsers,
    filterChanged,
    fetchMemberProfile,
    startTimeChanged,
    endTimeChanged,
} from '../../ducks'
import { Actions } from 'react-native-router-flux';
import QRCode from 'react-native-qrcode-svg'
import QRCodeScanner from 'react-native-qrcode-scanner'

const dimension = Dimensions.get('screen');

class EventDetails extends Component {

    constructor(props){
        super(props)
        this.state ={modalVisible: false, pickerVisible: false}

    }

    componentDidMount() {
        this.props.filterChanged("")
       
        this.props.fetchCode(this.props.eventID)
        if (this.props.privilege !== undefined && this.props.privilege.board) {
            this.props.fetchAllUsers()
        }

        this.props.startTimeChanged(this.convertHour(this.props.startTime))
        this.props.endTimeChanged(this.convertHour(this.props.endTime))
    }

    convertNumToDate(date) {
        var months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        temp_date = date.split("-");
		return `${months[Number(temp_date[1]) - 1]} ${temp_date[2]}`;
    }

    onSuccess = (e) => {
        if(this.props.code === e.data){
            this.checkinButton(this.props.eventID, this.props.points)
        }
        else {
            alert("Incorrect Code")
         }
      }
    

    renderCodeBox(){
        const {
            modalBackground,
            modalContent,
            modalText,
            modalTextInput,
            codeText,
            container,
            headerTextStyle,
            textColor
        } = styles
        if (this.props.privilege !== undefined && this.props.privilege.board) {
            return (
                <Modal
                transparent={true}
                visible={this.state.modalVisible}>
                     <View style={modalBackground}>
                        <View style={modalContent}>
                            <TouchableOpacity onPress={() => {
                            this.setState({modalVisible: false})
                            this.props.closeCheckIn(this.props.eventID)}}>
                             <Ionicons 
                            name="md-close-circle" 
                            size={dimension.height * .05} 
                            color = 'e0e6ed'/>
                            </TouchableOpacity>
                            <View style = {{paddingTop: 20}}>
                            </View>
                            <View style = {{alignItems: "center", flex: 2, justifyContent: "center"}}>
                            <QRCode
                                value = {this.props.code}
                                size = {300}
                            />
                            </View>
                            <View style = {{paddingTop: 20}}>
                            </View>
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
            <SafeAreaView>
                <View style = {{height: dimension.height, backgroundColor: "black"}}>
                    <View style = {{flex: .2}}></View>
                    <View style ={{flex: 1, justifyContent: "flex-start"}}>
                    <QRCodeScanner
                    onRead={this.onSuccess}
                    fadeIn={false}
                    containerStyle= {{flex: .7}}
                    />
                    </View>
                    <View style={{flexDirection: "row", flex: .9, justifyContent: "space-evenly", alignItems: "center", justifyContent:"center", width:"100%"}}>
                        <View style={{flex: .3}}></View>
                            <View style={{flex: 1}}>
                            <Button
                            title = "DONE"
                            onPress = {() => this.setState({modalVisible: false})}
                            />
                            </View>
                    <View style={{flex: .3}}></View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
        





            /*<Modal
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
            alert('Modal has been closed.');
        }}
        visible={this.state.modalVisible}
        >
            <View style={modalBackground}>
                <View style={modalContent}>
                    <TouchableOpacity onPress={() => {this.setState({modalVisible: false})}}>
                    <Text style={{color: "#FECB00"}}>X</Text>
                    </TouchableOpacity>
                    <View style={container}>
                        <Text style={[headerTextStyle, textColor]}>Enter Code</Text>
                        <TextInput
                        style={modalTextInput}
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
                    </Modal>*/
    )
  }

    renderComponent(item) {
        const {
            textColor
        } = styles
        if(this.props.userList !== undefined && this.props.userList[item] !== undefined){
            const {
                firstName,
                lastName
            } = this.props.userList[item]
            return(
                <View style={{flex: 1}}>
                    <Text style={[{fontSize: 16, alignSelf:'center'}, textColor]}>{firstName} {lastName}</Text>
                </View>
            )
        }
    }

    convertArrayOfObjectsToCSV(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += String(item[key]).replace('&','and').replace('\n',' ');
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    sendListToMail(attendants) {

        const {
            privilege,
            userList,
            name,
        } = this.props

        var users = [];
        const email = userList[privilege.id].email
        attendants.map(attendant => {users.push(userList[attendant])})


        var csv = this.convertArrayOfObjectsToCSV({
            data: users
        });

        if (csv == null) return;

        filename = `${name}.csv` || 'export.csv';
        
        data = `Instructions: \n1.Open a plain text Editor(Not microsoft Word)\n2.Copy everything under the line and paste it into the text editor\n3.save the file and change the extension to .csv(Look up how to do this if you dont know how)\n` +
         `4.Open the file in either Numbers or Excel\n------------------\n\n` + csv
        var link = `mailto:${email}?subject=event: ${name}&body=`+ data
        if(!Linking.canOpenURL(link)){
            alert('Email could not be sent', 'Failure')
        }else{
            Linking.openURL(link)
            alert('Email app should be Opened')
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
            attendance,
            attendanceContainer,
            icon,
            textColor
        } = styles

        if (eventList === null || eventList === undefined) {return null}

        if (eventList[eventID] === null || eventList[eventID] === undefined) {return null}

        if(privilege !== undefined && privilege.board === true && eventList !== undefined && eventList[eventID] !== undefined && eventList[eventID].attendance !== undefined) {
            var attendants = Object.keys(eventList[eventID].attendance)

            return (
                <View style={[{flex: 1, flexDirection: 'column'}, lineOnTop]}>
                    <View style={attendanceContainer}>
                        <View style={{flex:.5}}/>
                        <Text style={[attendance, textColor]}>Attendance</Text>
                        <Ionicons 
                        style={[icon, {alignSelf: 'center'}, textColor]} 
                        name="md-mail" 
                        size={35} 
                        color = 'e0e6ed'
                        onPress={() => this.sendListToMail(attendants)}/>
                    </View>
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
        this.props.deleteEvents(this.props.eventID)
        Actions.pop()
    }
    checkinButton(ID, points){
        this.props.checkIn(ID, points, null);
    }

    callUser(id){
        this.setState({pickerVisible: false})
        this.props.pageLoad();
        this.props.fetchMemberProfile(id);

        if (this.props.screen === "dashboard")  Actions["OtherProfileD"]({screen: this.props.screen})
        else if (this.props.screen === "events") Actions["OtherProfileE"]({screen: this.props.screen})
        else if (this.props.screen === ("dashboard" + "committeepage")) Actions["OtherProfileCPD"]({screen: this.props.screen})
        else if (this.props.screen === ("committees" + "committeepage")) Actions["OtherProfileC"]({screen: this.props.screen})
    }

    renderPickMembers(){
        const {
            filter,
            userList,
            eventList,
            eventID,
            filterChanged,
        } = this.props;

        if (eventList === null || eventList === undefined) {return null}

        let excludeDataProp = (eventList[eventID] === null || eventList[eventID] === undefined) ? {} : Object.assign({}, eventList[eventID].attendance)

        if (excludeDataProp === null || excludeDataProp === undefined){
            excludeDataProp = {[this.props.id]: true}
        }

        else Object.assign(excludeDataProp, {[this.props.id]: true})

        return (
            <View>
                <FilterPicker
                title={"Members"}
                visible={this.state.pickerVisible}
                callUser={(id) => this.callUser(id)}
                filter={filter}
                type="Multiple"
                data={userList}
                excludeData={excludeDataProp}
                onChangeText={filterChanged.bind(this)}
                onClose={() => {
                    this.setState({pickerVisible: false})
                }}
                onSelect={(selectedUsers) => {
                    this.checkInMembers(selectedUsers)
                    this.setState({pickerVisible: false})
                 }}
                />
            </View>
        )
    }

    renderRSVP() {
        const {
            rsvp,
            eventID,
            userID
        } = this.props;

        rsvp(eventID, userID);
    }

    eventListNum() {
        

        return "10 people";
    }

    renderEventListNum(iconSize) {
        const {
            privilege,
            eventList,
            eventID
        } = this.props;

        const {
            icon,
            icon_container,
            text,
            textColor
        } = styles;

        let numRSVP = 0, numAttendance;

        if (eventList != undefined && eventList[eventID] != undefined) {
            if (eventList[eventID].attendance != undefined)
                numAttendance = Object.keys(eventList[eventID].attendance).length;
            if (eventList[eventID].rsvp != undefined)
                numRSVP = Object.keys(eventList[eventID].rsvp).length;
        }

        if (privilege != null && privilege.board) {
            return ([
                <View style={icon_container}>
                    <Ionicons style={[icon, textColor]} name="ios-people" size={iconSize} color='#000'/>
                    <Text style={[text, textColor]}>{numRSVP} {(numRSVP == 1) ? "person" : "people"} RSVP'd</Text>
                </View>,
                numAttendance != undefined && <View style={icon_container}>
                    <Ionicons style={[icon, textColor]} name="md-people" size={iconSize} color='#000'/>
                    <Text style={[text, textColor]}>{numAttendance} {(numAttendance == 1) ? "person" : "people"} attended</Text>
                </View>
            ])
        }
    }

    limitRSVP(date) {
        temp_date = date.split("-");
        let thisdate = new Date(), month = (thisdate.getMonth() + 1), 
            year = thisdate.getFullYear(), day = (thisdate.getDate());

        if (temp_date[0] >= parseInt(year) &&
            temp_date[1] >= parseInt(month) &&
            temp_date[2] > parseInt(day))
            return true;
    }
    
    checkInMembers(selectedUsers){
        const {
            checkIn,
            eventID,
            points,
            id,
            firstName,
            lastName
        } = this.props;

        let userArr = Object.values(selectedUsers);
        userArr.forEach(function(userID){
            checkIn(eventID, points, userID, {id: id, name: firstName + " " +lastName})
        })
    }
    
    prepend0(item){
        var array = item.split(":")
    
		var hour = (array[0])  

        if(hour.length === 1){
            hour = "0" + hour;
        }
        
        return  hour + ":" + array[1] + ":" +array[2]
    }

    renderButtons(){
        if(this.props.privilege !== undefined && this.props.privilege.board === true){
            return (
                <View>
                    <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * .1, width:"100%"}}>
                        <View style={{flex: .45}}>
                            <Button 
                                title = "Open check-in"
                                onPress={this.openCheckInButton.bind(this)}
                            />
                        </View>
                        <View style={{flex: .45}}>
                            <Button 
                                title = "Manual check-in"
                                onPress={() => this.setState({pickerVisible: true})}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * .032, width:"100%"}}>
                          <View style={{flex: .45}}>
                            <Button 
                            title = "Edit event"
                            onPress={() => {
                                this.props.startTimeChanged(this.prepend0(this.props.startTime))
                                this.props.endTimeChanged(this.prepend0(this.props.endTime))
                                this.props.goToCreateEventFromEdit(this.props.screen)}
                            }/>
                        </View>
                        <View style={{flex: .45}}>
                            <Button 
                            title = "Delete event"
                            onPress = {
                                    () => Alert.alert('Confirmation', 'Are you sure you want to delete', [
                                {
                                    text: 'Confirm',
                                    onPress: () => this.deleteButton()
                                },
                                {
                                    text: 'Cancel',
                                }
                            ])}
                            />
                        </View>
                    </View>
                </View>
            )
            }else
            return(
            <View>
            {(this.limitRSVP(this.props.date)) && (<View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * .032, width:"100%"}}>
                <View style={{flex: .45}}>
                    <Button 
                        title = "Check in"
                        onPress={() => {
                            this.setState({modalVisible: true})
                        }}
                    />
                </View>
                <View style={{flex: .45}}>
                <Button
                    title = "RSVP"
                    onPress = {() => {
                        this.renderRSVP()
                    }}/>
                </View>
            </View>)}
            {(!this.limitRSVP(this.props.date)) && (<View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * .032, width:"100%"}}>
                <View style={{flex: .3}}></View>
                    <View style={{flex: 1}}>
                        <Button 
                            title = "Check in"
                            onPress={() => {
                                this.setState({modalVisible: true})
                            }}
                        />
                    </View>
                <View style={{flex: .3}}></View>
            </View>)}
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
                startTime,
                endTime,
                location,
                type,
                committee
            } = this.props

            const { 
                page,
                tabBar,
                tabBarText,
                container,
                icon_container,
                icon,
                text,
                textColor,
                final
            } = styles

            let viewName = type + ": " + name, iconSize = 25;
            if (committee !== '') viewName = committee + ": " + name;

            return (
                <SafeAreaView style={page}>
                    <NavBar title={viewName} back onBack={() => Actions.pop()} />
                    {this.renderPickMembers()}
                    <View style={container}>
                        <View style={icon_container}>
                            <Ionicons style={[icon, textColor]} name="md-calendar" size={iconSize} color='#000'/>
                            <Text style={[text, textColor]}>{this.convertNumToDate(date)}</Text>
                        </View>
                        <View style={icon_container}>
                            <Ionicons style={[icon, textColor]} name="md-time" size={iconSize} color='#000'/>
                            <Text style={[text, textColor]}>{startTime}-{endTime}</Text>
                        </View>
                        <View style={icon_container}>
                            <Ionicons style={[icon, textColor]} name="md-pin" size={iconSize} color='#000'/>
                            <Text style={[text, textColor]}>{location}</Text>
                        </View>
                        {(description != '') && (<View style={[icon_container, {flex: .7}]}>
                            <Ionicons style={[icon, textColor]} name="md-list" size={iconSize} color='#000'/>
                            <Text style={[text, textColor]}>{description}</Text>
                        </View>)}
                        {this.renderEventListNum(iconSize)}
                        <View style = {[icon_container, final]}>
                            {this.renderAttendance()}
                        </View>
                    </View>
                    {this.renderButtons()}
                    {this.renderCodeBox()}
                    <View style={{height: dimension.height *.08, backgroundColor: "black"}}></View>
                </SafeAreaView>
            )
        }
    }
    
    convertHour(time){
        var array = time.split(":")
    
        if(array[2] === "AM") {
        var hour = "" + (parseInt(array[0])) 
        if (hour === "0") hour = "12"
        return hour + ":" + array[1] + ":" +array[2]
        }
        
        var hour = "" + (parseInt(array[0]) - 12) 
        if (hour === "0") hour = "12"
        return hour + ":" + array[1] + ":" +array[2]
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 25,
        backgroundColor: "black"
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
        backgroundColor: '#e0e6ed22',
        borderColor: '#e0e6ed',
        borderRadius: 16,
        borderWidth: 3,
        borderStyle: 'solid',
        fontWeight: 'bold',
        fontSize: 60,
        color: '#E0E6ED'
    },
    modalContent: {
        height: dimension.height*.6,
        width: dimension.width*.9,
        padding: 12,
        backgroundColor: 'white',
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
    textColor: {
        color: '#e0e6ed'
    },
    icon_container: {
        flex: .2,
        flexDirection: 'row'
    },
    icon: {
        flex: .2
    },
    attendanceContainer: {
        flex: .5,
        flexDirection: 'row',
    },
    attendance: {
        fontSize: 20,
        alignSelf: 'center', 
        flex: .8,
    },
    text: {
        flex: 1,
        fontSize: 20
    },
    lineOnTop: {
        borderTopColor: '#e0e6ed',
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
        backgroundColor: '#0c0b0b',
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
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
      },
      textBold: {
        fontWeight: '500',
        color: '#000',
      },
      buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
      },
      buttonTouchable: {
        padding: 16,
      },
});

const mapStateToProps = ({ events, user, members, general }) => {
  const { type, name, description, date, startTime, endTime, location, points, eventID, error, code, eventList, committee } = events;
  const { privilege, firstName, lastName, id} = user;
  const { userList } = members;
  const { filter } = general;

  return { type, name, description, date, startTime, endTime, location, points, eventID, error, privilege, code, eventList, userList, filter, firstName, lastName, id, committee};
};

const mapDispatchToProps = {
    goToCreateEvent,
    goToCreateEventFromEdit,
    fetchCode,
    goToEvents,
    deleteEvents,
    getPrivilege,
    checkIn,
    rsvp,
    openCheckIn,
    closeCheckIn,
    pageLoad,
    convertNumToDate,
    fetchAllUsers,
    emailListUsers,
    filterChanged,
    fetchMemberProfile,
    startTimeChanged,
    endTimeChanged,
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
