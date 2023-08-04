import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';

export default class Join extends Component {
    constructor() {
        super();

        this.state = {
          codeText: '',
          error: false,
          qNumber: 0,
          playerName: ''
        };
    }

    componentDidMount() {
      const socket = this.props.socket;
      const self = this;
      // receive question number from host via web socket. and go to Start screen
      socket.on("getQNum", num => {
        this.props.navigation.navigate("Start", {hosting: false, port: this.state.codeText, qNum: num, name:this.state.playerName});
      });
    }
    // this func submit code that client input to host via web socket.
    submitCode() {
      const socket = this.props.socket;
      const io = this.props.io;
      const codeText = this.state.codeText;
      socket.emit("codeSent", codeText);
    }
    
    render() {
      const error = this.state.error;
        return (
            <View style={styles.container}>
                <View style={{height: 50}}></View>
                <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: '30%'}}>Type code</Text>
                <TextInput 
                  style={{marginTop: '3%', width: '50%', height: 30, color: '#000', fontSize: 28, borderWidth: 2, borderRadius: 5, textAlign: 'center'}} 
                  autoCorrect = {false}
                  onSubmitEditing = {() => this.submitCode()}
                  onChangeText = {codeText => {
                    this.setState({codeText: codeText});
                  }}
                />
                <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: '10%'}}>Type Name</Text>
                <TextInput 
                  style={{marginTop: '3%', width: '50%', height: 30, color: '#000', fontSize: 28, borderWidth: 2, borderRadius: 5, textAlign: 'center'}} 
                  autoCorrect = {false}                  
                  onChangeText = {text => {
                    this.setState({playerName: text});
                  }}
                />
                <View style={{marginTop: '10%'}}>
                  <TouchableOpacity onPress={() =>
                      this.submitCode()
                    }>
                    <Text style={{backgroundColor: '#000', color: '#fff', fontSize:30, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, paddingRight: 30, paddingLeft: 30, borderRadius: 10, height: 60}}>Join</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: '10%'}}>
                  <TouchableOpacity onPress={() =>
                     this.props.navigation.navigate('Home')
                    }>
                    <Text style={{backgroundColor: '#000', color: '#fff', fontSize:30, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, paddingRight: 34, paddingLeft: 34, borderRadius: 10, height: 60}}>Exit</Text>
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
    paddingTop: '10%'
  },
});
