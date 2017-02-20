import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as firebase from 'firebase';
import config from './config.js';

firebase.initializeApp(config);

// All firebase database data is stored as json objects
// database ref will be the key in database e.g.
// ref 'notes/1' will be key 'notes/1'
//
// let database = firebase.database();
// database.ref('notes/1').set({text: 'Hello World!'});

export default class FirebaseChatApp extends Component {
  constructor(props) {
    super(props);
    this.database = firebase.database();
    this.writeDatabase();
  }

  writeDatabase() {
    this.database.ref('notes/1').set({text: 'Hello World!'});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FirebaseChatApp', () => FirebaseChatApp);
