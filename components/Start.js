import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Questions } from './Questions';
import { AsyncStorage } from 'react-native';
 
export default class Start extends Component {
    constructor() {
        super();

        this.state = {
            qNumber: 0,
            error: '',
            hosting: false,
            players: [],
            alreadyUsers: []
        }
    }

    componentDidMount() {
        // here you setup neccessary environment for start game. User in comment is the same as client.
        const {hosting, port, qNum, name, userRecords} = this.props.route.params;
        var alreadyUsers = this.state.alreadyUsers;
        const socket = this.props.socket;
        var RandomNumber = Math.floor(Math.random() * 5) + 1 ;

        if(hosting) {
            this.setState({
                qNumber: RandomNumber,
                hosting: hosting
            });
        }else{
            this.setState({
                qNumber: qNum
            });
            var data = {
                port: port,
                name: name
            }
            socket.emit("newUser", data);
        }
        // host sends code to clients
        socket.on("wantQNum", param => {
            var data = {
                qNum: RandomNumber,
                port: port,
                hosting: hosting
            }
            if(hosting) {
                socket.emit("hereQnum", data);
            }
        });
        // host receives all clients list
        socket.on("allUser", data => {
            if(hosting) {
                var tmp = this.state.players;
                tmp.push(data.name);
                this.setState({
                    players: tmp
                });
                var data = {
                    users: tmp,
                    port: data.port
                }
                socket.emit("giveAllUsers", data);
            }
        });
        // clients get others clients list
        socket.on("userGroup", data => {
            if(!hosting) {
                this.setState({
                    players: data.users
                });
            }
        });
        // notify all client start game
        socket.on("startClient", data => {
            // make client records format
            var userRecords = [];
            var users = [];
            if(this.state.alreadyUsers.length != 0) {
                this.setState({error: "here?"})
                userRecords = this.state.alreadyUsers;
            }else{
                users = this.state.players;
                users.map(u => {
                    userRecords.push({
                        uName: u,
                        score: 0
                    });
                });
            }
            // navigate to Compare & Answers screen according to host & client
            if(!hosting) {
                this.props.navigation.navigate("Answers", {qNumber: this.state.qNumber, port: data.port, name: name});
            }else{
                this.props.navigation.navigate('Compare', {'qNumber': this.state.qNumber, port: data.port, hosting: true, records: userRecords});
            }
        });

        //repeat round of game
        socket.on("goStartClient", data => {
            this.setState({
                qNumber: data.qNum,
                alreadyUsers: data.userRecords
            });
        });
    }
    // if host click black card question, start game
    startGame() {
        const socket = this.props.socket;
        const {hosting, port, qNum, name} = this.props.route.params;
        var data = {
            port: port,
            sg: true
        };
        // notify clients to start game round
        socket.emit("startGame", data);
    }
    
    render() {
        const qArr = Questions;
        const index = this.state.qNumber;
        const question = qArr[index].q;
        const error = this.state.error;
        const hosting = this.state.hosting;
        const players = this.state.players;
        const pLeng = players.length;
        const playersList = pLeng == 0 ? <Text>no users</Text> : players.map(p => {
            return <Text style={{color: '#000', fontSize: 20, marginTop: '5%', height: 25}}>{p}</Text>;
        });
        return (
            <View style={styles.container}>
                <View style={{width: '100%'}}>
                    <TouchableOpacity onPress={() =>{
                        if(hosting){
                            this.startGame();
                        }
                    } }>
                        <Text style={{backgroundColor: '#000', color: '#fff', fontSize: 30, fontWeight: 'bold', textAlign:'center', paddingTop: '20%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '20%', borderRadius: 10}}>{question}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: '10%'}}>
        {playersList}
                </View>
            </View>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '20%'
  },
});
