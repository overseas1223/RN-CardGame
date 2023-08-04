import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Questions } from './Questions';

export default class Answers extends Component {
    constructor() {
        super();

        this.state = {
            sA1: false,
            sA2: false,
            sA3: false,
            sA4: false,
            sA5: false,
            sA6: false,
            flag: false
        }
    }
    // if client choose answer, below func is run.
    selectAnswer(a) {
        if(a == 'a1') {
            this.setState({sA1: true, flag: true});
        }
        if(a == 'a2') {
            this.setState({sA2: true, flag: true});
        }
        if(a == 'a3') {
            this.setState({sA3: true, flag: true});
        }
        if(a == 'a4') {
            this.setState({sA4: true, flag: true});
        }
        if(a == 'a5') {
            this.setState({sA5: true, flag: true});
        }
        if(a == 'a6') {
            this.setState({sA6: true, flag: true});
        }
        const socket = this.props.socket;
        const {qNumber, port, name} = this.props.route.params;
        var data = {
            qNumber:qNumber,
            port: port,
            name: name,
            sA: a
        }
        // send answer to host
        socket.emit("sAnswer", data);
    }

    componentDidMount() {
        const socket = this.props.socket;
        // according to host command, go to ScoreBoard screen.
        socket.on("goScoreBoard", data => {
            this.props.navigation.navigate('ScoreBoard', {data: data, hosting: false});
        });
        // according to host command, go to Start screen again.
        socket.on("goStartClient", data => {
            this.props.navigation.navigate('Start', {qNum: data.qNum, port: data.port, hosting: false});
        });
    }

    render() {
        const { qNumber } = this.props.route.params;
        const qArr = Questions[qNumber];
        const flag = this.state.flag;

        return (
            <View style={styles.container}>
                <Text style={{fontSize: 40, fontWeight: 'bold'}}>Pick a white card.</Text>
        
                <View style={{width: '100%'}}>
                    <TouchableOpacity onPress={() => {
                        if(!flag){
                            this.selectAnswer('a1');
                        }
                    }}>
                        <Text style={!this.state.sA1 ? {backgroundColor: '#FFF', color: '#000', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '10%', width: '100%', justifyContent: 'center'} : {backgroundColor: '#000', color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '10%', width: '100%', justifyContent: 'center'}}>{qArr.a1}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%'}}>
                    <TouchableOpacity onPress={() => {
                        if(!flag){
                            this.selectAnswer('a2');
                        }
                    }}>
                        <Text style={!this.state.sA2 ? {backgroundColor: '#FFF', color: '#000', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '5%', width: '100%', justifyContent: 'center'} : {backgroundColor: '#000', color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '5%', width: '100%', justifyContent: 'center'}}>{qArr.a2}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%'}}>
                    <TouchableOpacity onPress={() => {
                        if(!flag){
                            this.selectAnswer('a3');
                        }
                    }}>
                        <Text style={!this.state.sA3 ? {backgroundColor: '#FFF', color: '#000', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '5%', width: '100%', justifyContent: 'center'} : {backgroundColor: '#000', color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '5%', width: '100%', justifyContent: 'center'}}>{qArr.a3}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%'}}>
                    <TouchableOpacity onPress={() => {
                        if(!flag){
                            this.selectAnswer('a4');
                        }
                    }}>
                        <Text style={!this.state.sA4 ? {backgroundColor: '#FFF', color: '#000', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '5%', width: '100%', justifyContent: 'center'} : {backgroundColor: '#000', color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '5%', width: '100%', justifyContent: 'center'}}>{qArr.a4}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%'}}>
                    <TouchableOpacity onPress={() => {
                        if(!flag){
                            this.selectAnswer('a5');
                        }
                    }}>
                        <Text style={!this.state.sA5 ? {backgroundColor: '#FFF', color: '#000', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '5%', width: '100%', justifyContent: 'center'} : {backgroundColor: '#000', color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '5%', width: '100%', justifyContent: 'center'}}>{qArr.a5}</Text>
                    </TouchableOpacity>
                </View>
        
                <View style={{width: '100%'}}>
                    <TouchableOpacity onPress={() => {
                        if(!flag){
                            this.selectAnswer('a6');
                        }
                    }}>
                        <Text style={!this.state.sA6 ? {backgroundColor: '#FFF', color: '#000', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '5%', width: '100%', justifyContent: 'center'} : {backgroundColor: '#000', color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign:'center', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%', borderRadius: 10, borderColor: '#000', borderWidth: 2, marginTop: '5%', width: '100%', justifyContent: 'center'}}>{qArr.a6}</Text>
                    </TouchableOpacity>
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
    paddingTop: '25%',
    paddingLeft: '5%',
    paddingRight: '5%'
  },
});
