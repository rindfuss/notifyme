import React, { Component } from 'react';
import { Platform, StyleSheet, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
});

const firebaseCredentials = Platform.select({
  ios: 'https://invertase.link/firebase-ios',
  android: 'https://invertase.link/firebase-android',
});


export default class WelcomeScreen extends Component {

constructor(props) {
    super(props);
    this.state = {
        initializing: true,
        user: null,
        emailInput: null,
        passwordInput: null,
        status: {show: false, type: 'neutral', text: null},
    };

    this.getLoggedInText = this.getLoggedInText.bind(this);
    this.register        = this.register.bind(this);
    this.login           = this.login.bind(this);
    this.logout          = this.logout.bind(this);
}

componentDidMount() {
    auth().onAuthStateChanged( (user) => {
        this.setState({user: user});
        if (this.state.initializing) {
            this.setState({initializing: false});
        }
        this.props.navigation.navigate( user ? 'loggedIn' : 'loggedOut');
    });
}

async login() {
    this.setState({status: {
        show: true,
        type: 'neutral',
        text: 'Attempting to Log In',
    }});
    try {
        await auth().signInWithEmailAndPassword(this.state.emailInput, this.state.passwordInput);
        this.setState({
            status: {
                show: true,
                type: 'success',
                text: 'User successfully logged in', 
            },
        });
    } catch (e) {
        this.setState({status: {
            show: true,
            type: 'error',
            text: e.message,
        }});
    }
    this.setState({
        emailInput: null,
        passwordInput: null,
    });
}

async logout() {
    this.setState({status: {
        show: true,
        type: 'neutral',
        text: 'Logging Out',
    }});
    try {
        await auth().signOut();
        this.setState({status: {
            show: false,
            type: null,
            text: null,
        }});
    } catch (e) {
        this.setState({status: {
            show: true,
            type: 'error',
            text: e.message,
        }});
    }    
    this.setState({
        emailInput: null,
        passwordInput: null,
    });
}

processEmailInput(input) {
    this.setState({emailInput: input});
}

processPasswordInput(input) {
    this.setState({passwordInput: input});
}

async register() {
    this.setState({status: {
        show: true,
        type: 'neutral',
        text: 'Attempting to Create New User',
    }});
    try {
        await auth().createUserWithEmailAndPassword(this.state.emailInput, this.state.passwordInput);
        this.setState({status: {
            show: true,
            type: 'success',
            text: 'User successfully created',
        }});
    } catch (e) {
        this.setState({status: {
            show: true,
            type: 'error',
            text: e.message,
        }});
    }
    this.setState({
        emailInput: null,
        passwordInput: null,
    });
}

getLoggedInText() {
    const { user } = this.state;

    if (user) {
        return (
            <View>
                <Text style={styles.instructions}>
                    {`\nWelcome, ${user.email}`}
                </Text>

                <Text>{`\n`}</Text>

                <Button style={styles.registerLoginButton} onPress={ this.logout } title="Logout"/>
            </View>
        );
    }
    else {
        return (
            <View>
                <Text style={styles.instructions}>
                    {`\nNot currently logged in.`}
                </Text>

                <Text>{`\n\n`}</Text>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = { (text) => { this.processEmailInput.bind(this)(text)} }/>
            
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"
                    onChangeText = { (text) => { this.processPasswordInput.bind(this)(text)} }/>

                { /*<TouchableOpacity
                    style = {styles.submitButton}
                    onPress = { () => {} }
                >
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button style={styles.registerLoginButton} onPress={ this.register } title="Register"/>
                    <Button style={styles.registerLoginButton} onPress={ this.login } title="Login"/>
                </View>
            </View>
        );
    }
}

render() {
    if (this.state.initializing) return null;
    
    return (
        <View style={styles.container}>

        {!firebase.apps.length && (
            <Text style={styles.instructions}>
                {`\nYou currently have no Firebase apps registered, this most likely means you've not downloaded your project credentials. Visit the link below to learn more. \n\n ${firebaseCredentials}`}
            </Text>
        )}

        { this.getLoggedInText() }

        { this.state.status.show && (
            <Text style={this.state.status.type=='success'?styles.statusSuccess:this.state.status.type=='neutral'?styles.statusNeutral:this.state.status.type=='warning'?styles.statusWarning:styles.statusError}>{this.state.status.text}</Text>
        )}

        <Text>{`\n`}</Text>

        </View>
    );
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
},
welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
},
input: {
    margin: 15,
    height: 40,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: '#7a42f4',
    borderWidth: 1
},
instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
},
registerLoginButton: {
},
statusSuccess: {
    color: 'green',
},
statusNeutral: {
    color: 'black',
},
statusWarning: {
    color: 'yellow',
},
statusError: {
    color: 'red',
},
/*submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
},
submitButtonText:{
    color: 'white',
    textAlign: 'center',
},*/
});