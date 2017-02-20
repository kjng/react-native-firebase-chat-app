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
import BackgroundTimer from 'react-native-background-timer';
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
    this.state = {
      input: '',
      messages: [],
      usersOnline: 0
    };
    this.usersOnlineRef = this.database.ref('usersOnline');
    this.messagesRef = this.database.ref('messages');

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentDidMount() {
    this.usersOnlineListener();
    this.messagesListener();
    this.incrementUsersOnline();
  }

  handleAppStateChange() {
    console.log('AppState', AppState.currentState);
    var currentState = AppState.currentState;
    if (currentState === 'active') {
      this.incrementUsersOnline();
    } else if (currentState === 'inactive') {
      BackgroundTimer.setTimeout(() => this.decrementUsersOnline(), 0);
    }
  }

  incrementUsersOnline() {
    this.usersOnlineRef.transaction((currentUsersOnline) => {
      return currentUsersOnline + 1;
    });
  }

  decrementUsersOnline() {
    this.usersOnlineRef.transaction((currentUsersOnline) => {
      return currentUsersOnline > 0 ? currentUsersOnline - 1 : 0;
    });
  }

  usersOnlineListener() {
    this.usersOnlineRef.on('value', (snapshot) => {
      console.log('UsersOnline Change', snapshot.val());
      this.setState({usersOnline: snapshot.val()});
    });
  }

  messagesListener() {
    this.messagesRef.on('value', (snapshot) => {
      console.log('Getting new messages...');
      if (snapshot.val() !== null) {
        this.setState({messages: snapshot.val()});
      }
    });
  }

  sendMessage() {
    console.log(this.state.input);
    this.messagesRef.transaction((messages) => {
      if (!messages) {
        messages = [];
      }
      messages.push(this.state.input);
      this.setState({input: ''});
      return messages;
    });
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
          {this.state.messages.map((message, i) => {
            return (
              <Text key={i}>{message}</Text>
            );
          })}
        </View>
        <View style={styles.footer}>
          <TextInput style={styles.textInput}
            value={this.state.input}
            onChangeText={(text) => this.setState({input: text})}
          />
          <TouchableOpacity style={styles.button}
            onPress={this.sendMessage}>
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
    paddingTop: 20
  },
  content:{
    padding: 10,
    flex:1,
  },
  labelText:{
    fontSize: 20
  },
  header:{
    justifyContent:'center',
    alignItems: 'center',
    height: 50,
    padding: 5,
    backgroundColor: '#dddddd'
  },
  footer:{
    height: 50,
    flexDirection: 'row',
    padding: 5
  },
  textInput:{
    flex:1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10
  },
  button:{
    width: 100,
    backgroundColor: 'darkblue',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  buttonText:{
    fontSize: 20,
    color: 'white'
  }
});

AppRegistry.registerComponent('FirebaseChatApp', () => FirebaseChatApp);
