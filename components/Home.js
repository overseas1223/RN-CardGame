import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import io from 'socket.io-client';

export default class Home extends Component {
  constructor() {
    super();
  }  

  componentDidMount() {
    
  }

  exitAppNow() {
    BackHandler.exitApp();
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: '70%'}}>Cards Against Humanity</Text>
          <View style={{marginTop: '10%', width: '100%', alignItems: 'center'}}>
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate('Host')
              }>
              <View style={{width: '100%', height: 60 }}>
                <Text style={{backgroundColor: '#000', color: '#fff', fontSize:30, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, paddingRight: 30, paddingLeft: 30, borderRadius: 10}}>Start</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: '10%',  width: '100%', alignItems: 'center'}}>
            <TouchableOpacity onPress={() =>
                this.exitAppNow()
              }>
              <View style={{width: '100%', height: 60 }}>
                <Text style={{backgroundColor: '#000', color: '#fff', fontSize:30, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, paddingRight: 37, paddingLeft: 37, borderRadius: 10}}>Exit</Text>
              </View>
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
