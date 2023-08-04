import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';

export default class ScoreBoard extends Component {
    constructor() {
        super();

        this.state = {
          users: [],
          selected: ''
        }
    }

    componentDidMount() {
      const {data, hosting} = this.props.route.params;
      const socket = this.props.socket;

      this.setState({
        users: data.userRecords
      });
      //client get command from host to go to Home screen
      socket.on("restartGame", data => {
        // socket.close();
        this.props.navigation.navigate("Home");
      });
    }

    // if host click exit button, go to Home screen.
    restart() {
      const socket = this.props.socket;
      const {data, hosting} = this.props.route.params;
      socket.emit("restart", data);
    }
    
    render() {
        const {data, hosting} = this.props.route.params;
        const arr = this.state.users;

        const resultList = arr.map(a => {
          return <View style={{width: '100%', alignItems: 'center', marginTop: '5%', height: 60}}><Text style={{color: '#000', fontSize:30}}>{a.uName} :  {a.score}</Text></View>;
        });

        return (
            <View style={styles.container}>
                <Text style={{fontSize: 40, fontWeight: 'bold', marginTop: '25%'}}>Score Board</Text>
                {
                  resultList
                }
                {
                  hosting ? <View style={{marginTop: '10%', height: 100}}>
                  <TouchableOpacity onPress={() =>
                      {
                        this.restart();
                      }
                    }>
                    <Text style={{backgroundColor: '#000', color: '#fff', fontSize:30, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, paddingRight: 37, paddingLeft: 37, borderRadius: 10}}>Exit</Text>
                  </TouchableOpacity>
                </View> : null
                }
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
