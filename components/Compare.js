import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Questions } from './Questions';

export default class Compare extends Component {
    constructor() {
        super();

        this.state = {
            ansArray: [],
            error: ''
        }
    }

    componentDidMount() {
        const socket = this.props.socket;
        // host receives answers via socket.
        socket.on("Ansarrive", data => {
            var tmp = this.state.ansArray;
            var ansTmp = {
                name: data.name,
                sa: data.sA,
            }
            tmp.push(ansTmp);
            this.setState({ansArray: tmp});
        });
    }
    // if host click prefer answer, below func is run.
    goScore(name) {
        const socket = this.props.socket;
        const {qNumber, port, hosting, records} = this.props.route.params;

        var tmp = records;
        var userRecords = [];
        var flag = false;
        tmp.map(u => {
            userRecords.push({
                uName: u.uName,
                score: u.uName == name ? u.score + 1 : u.score
            });
            if(u.score == 2 && u.uName == name) {
                flag = true;
            }
        });
        var RandomNumber = Math.floor(Math.random() * 5) + 1 ;
        var data = {
            port: port,
            userRecords: userRecords
        }
        var dataForUser = {
            port: port,
            qNum: RandomNumber,
            userRecords: userRecords,
            flag: flag
        }
        // according to clients' score, decide where to go
        if(flag == false) {
            socket.emit("goStart", dataForUser);
            this.props.navigation.navigate('Start', { qNum: RandomNumber, userRecords: userRecords, port: port, hosting: true});
        } else {
            socket.emit("goScore", data);
            this.props.navigation.navigate('ScoreBoard', {data: data, hosting: true});
        }
    }
    
    render() {
        const ansArray = this.state.ansArray;
        const {qNumber, port, hosting} = this.props.route.params;
        const qArr = Questions[qNumber];

        const ansList = ansArray.map(a => {
            return <View>
                        <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>{a.name}</Text>
                        <View style={{width: '100%', paddingBottom: '8%'}}>
                            <TouchableOpacity onPress={() => {
                                this.goScore(a.name);
                            }}>
                                <Text style={{backgroundColor: '#FFF', color: '#000', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '2%', width: '100%', justifyContent: 'center'}}>{qArr[a.sa]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>;
                    <View>
                    <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>{a.name}</Text>
                    <View style={{width: '100%', paddingBottom: '8%'}}>
                        <TouchableOpacity onPress={() => {
                            this.goScore(a.name);
                        }}>
                            <Text style={{backgroundColor: '#FFF', color: '#000', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '2%', width: '100%', justifyContent: 'center'}}>{qArr[a.sa]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        });

        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Text style={{backgroundColor: '#000', color: '#fff', fontSize: 30, fontWeight: 'bold', textAlign:'center', paddingTop: '15%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '15%', borderRadius: 10}}>{qArr.q}</Text>
                </TouchableOpacity>
        
                <View style={{ marginTop: '10%', width: '100%'}}>
                    <ScrollView>             
                        {
                            ansList
                        }
        
                        <View style={{height: 150}}></View>
                    </ScrollView>
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
    paddingTop: '15%'
  },
});
