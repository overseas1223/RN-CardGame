import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/Home';
import Host from './components/Host';
import Start from './components/Start';
import Answers from './components/Answers';
import Compare from './components/Compare';
import ScoreBoard from './components/ScoreBoard';
import Join from './components/Join';
import io from 'socket.io-client';
import { render } from 'react-dom';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.connectSocket();
  }

  connectSocket() {
    this.socket = io("http://10.10.10.22:4000");
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode={false}>
          <Stack.Screen name="Home">
            {props => <Home {...props} io={io} socket={this.socket} connectSocket={this.connectSocket} />}
          </Stack.Screen>
          <Stack.Screen name="Host">
            {props => <Host {...props} io={io} socket={this.socket} />}
          </Stack.Screen>
          <Stack.Screen name="Start">
            {props => <Start {...props} io={io} socket={this.socket} />}
          </Stack.Screen>
          <Stack.Screen name="Answers">
            {props => <Answers {...props} io={io} socket={this.socket} />}
          </Stack.Screen>
          <Stack.Screen name="Compare">
            {props => <Compare {...props} io={io} socket={this.socket} />}
          </Stack.Screen>
          <Stack.Screen name="ScoreBoard">
            {props => <ScoreBoard {...props} io={io} socket={this.socket} />}
          </Stack.Screen>
          <Stack.Screen name="Join">
            {props => <Join {...props} io={io} socket={this.socket} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
