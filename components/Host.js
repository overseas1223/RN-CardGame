import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';

export default class Host extends Component {
  constructor() {
    super();
    this.state = {
      codeNumber: ''
    }
  }

  componentDidMount() {
    // you generate host code here.
    var cN = Math.floor(Math.random()*90000) + 10000;
    this.setState({
      codeNumber: cN
    })
  }

  // if you click start button, then you run below. This is navigation function to go to Start screen
  startGame() {
    const socket = this.props.socket;
    socket.emit("codeGenerate", this.state.codeNumber);
    this.props.navigation.navigate('Start', {hosting: true, port: this.state.codeNumber});
  }
  
  render() {
    return (
      <View style={styles.container}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Your code</Text>
  
          <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: '5%'}}>{this.state.codeNumber}</Text>
  
          <View style={{marginTop: '10%'}}>
            <TouchableOpacity onPress={() =>
                this.startGame()
              }>
              <Text style={{backgroundColor: '#000', color: '#fff', fontSize:30, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, paddingRight: 54, paddingLeft: 54, borderRadius: 10, height: 60}}>Start</Text>
            </TouchableOpacity>
          </View>
  
          <View style={{marginTop: '10%'}}>
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate('Join')
              }>
              <Text style={{backgroundColor: '#000', color: '#fff', fontSize:30, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, paddingRight: 57, paddingLeft: 57, borderRadius: 10, height: 60}}>Join</Text>
            </TouchableOpacity>
          </View>
  
          <View style={{marginTop: '10%'}}>
            <TouchableOpacity onPress={() =>
                this.props.navigation.goBack()
              }>
              <Text style={{backgroundColor: '#000', color: '#fff', fontSize:30, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, paddingRight: 37, paddingLeft: 37, borderRadius: 10, height: 60}}>Cancel</Text>
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
    paddingTop: '50%',
    paddingTop: '50%'
  },
});
