import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
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
    this.state = {
      usersOnline: 0
    };
    AppState.addEventListener('change', () => { console.log(AppState.currentState) })
  }

  writeDatabase() {
    this.database.ref('notes/1').set({text: 'Hello World!'});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.labelText}>
            Users Online: {this.state.usersOnline}
          </Text>
        </View>
        <View style={styles.content}>
        </View>
        <View style={styles.footer}>
          <TextInput style={styles.textInput} />
          <TouchableOpacity style={styles.button}
            onPress={this.sendChat}>
            <Text style={styles.buttonText}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('FirebaseChatApp', () => FirebaseChatApp);
