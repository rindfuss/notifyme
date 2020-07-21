import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, FlatList, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import notifications from '@react-native-firebase/messaging';
import { firebase } from '@react-native-firebase/messaging';
import axios from 'axios';

export default class SalesScreen extends Component {

constructor(props) {
    super(props);

    this.state = {
    	numRows: 0,
    	list: [],
    	status: { text: 'Test status' },
    	customer: null,
    	salesDate: null,
    	productID: null,
    	amount: null,
    }

    this.addSale = this.addSale.bind(this);
    this.getData = this.getData.bind(this);
    this.processInput = this.processInput.bind(this);
    this.setupMessaging = this.setupMessaging.bind(this);

    this.firestoreUnsubscribe = null;
    this.messagingUnsubscribe = null;
    this.notificationUnsubscribe = null;
}

async setupMessaging() {
	const granted = await messaging().requestPermission();
 console.log("granted: " + granted);
	if (granted) {
    	await this.registerAppWithFCM();
    	messaging().subscribeToTopic('bigSales');
    	const messagingUnsubscribe = messaging().onMessage(async remoteMessage => {
console.log("message: ", remoteMessage.data);
      		this.setState({status: {text: remoteMessage.data.message}});
      		console.log('FCM Message Data:', remoteMessage.data);
			setTimeout( () => {
				this.setState({status: {text: 'status message'}})
			}, 5000);

  		});
console.log("messagingUnsubscribe", messagingUnsubscribe);

    	const notificationUnsubscribe = notifications().onNotification(async notification => {
console.log("notification: ", notification);
      		this.setState({status: {text: 'received notification'}});
  		});
console.log("notificationUnsubscribe", notificationUnsubscribe);


  	}
}

async registerAppWithFCM() {
  await messaging().registerForRemoteNotifications();
}

componentDidMount() {
	this.setupMessaging();

 	this.getData();
}

componentWillUnmount() {
	//this.messagingUnsubscribe();
	//this.notificationUnsubscribe();
}

addSale() {
	const newSale = {
		amount: this.state.amount,
		customer: this.state.customer,
		'product code': this.state.productID,
		salesDate: this.state.salesDate,
	};
	
	firestore().collection('sales').add(newSale).then( ref => { console.log('Added doc ID: ', ref.id)});

	if (this.state.amount > 100) {
		axios.get('https://notifyme.calmss.com/sendMessage.php');
		messaging().sendMessage({
			data: {
				msgText: "New sale > $100",
			}	
		}).then( ()=> {console.log("send message promise resolved");} );
    }
}

async getData() {
	this.firestoreUnsubscribe = firestore()
  	.collection('sales')
  	.onSnapshot((querySnapshot) => {
		this.setState({
			numRows: querySnapshot.size,
			list: querySnapshot.docs,
		});
  	});
}

processInput(inputType, text) {
	let error = false;

	
	switch(inputType) {
		case 'customer':
		case 'salesDate':
		case 'productID':
		case 'amount':
			const stateObject = {};
			stateObject[inputType] = text;
			this.setState(stateObject);
			break;
		default:
			this.setState({status: {text: 'Invalid input type'}});
			error = true;
	}
}

render() {
    return (
        <View style={styles.container}>

        	<Text style={styles.heading}>Add New Sale</Text>
        	<View style={styles.addSaleInputContainer}>
	            <TextInput style = {styles.input}
	                underlineColorAndroid = "transparent"
	                placeholder = "Name"
	                placeholderTextColor = "#9a73ef"
	                autoCapitalize = "none"
	                onChangeText = { (text) => { this.processInput('customer', text)} }
	            />
	            <TextInput style = {styles.input}
	                underlineColorAndroid = "transparent"
	                placeholder = "Date"
	                placeholderTextColor = "#9a73ef"
	                autoCapitalize = "none"
	                onChangeText = { (text) => { this.processInput('salesDate', text)} }
	            />
	            <TextInput style = {styles.input}
	                underlineColorAndroid = "transparent"
	                placeholder = "Product"
	                placeholderTextColor = "#9a73ef"
	                autoCapitalize = "none"
	                onChangeText = { (text) => { this.processInput('productID', text)} }
	            />
	            <TextInput style = {styles.input}
	                underlineColorAndroid = "transparent"
	                placeholder = "Amount"
	                placeholderTextColor = "#9a73ef"
	                autoCapitalize = "none"
	                onChangeText = { (text) => { this.processInput('amount', text)} }
	            />
	        </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button style={styles.button} onPress={ this.addSale } title="Add Sale"/>
            </View>

            <Text>{this.state.status.text}</Text>

        	<Text>{`\n`}</Text>
        	
        	<Text style={styles.heading}>Existing Sales{`\n`}</Text>
        	<FlatList
        		style={styles.list}
        		data={this.state.list}
        		renderItem={ ({item}) => <Text style={styles.listItem}>{`${item.data().customer} (${item.data().salesDate}): ${item.data()['product code']} $${item.data().amount}`}</Text>}
        	/>
        </View>
    );
}
}

const styles = StyleSheet.create({
	addSaleInputContainer: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	button: {

	},
	container: {
	    flex: 1,
	    marginTop: 30,
	    justifyContent: 'flex-start',
	    alignItems: 'center',
	    backgroundColor: '#F5FCFF',
	},
	heading: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	input: {
		flex: 1,
		flexWrap: 'wrap',
	    margin: 2,
	    height: 40,
	    paddingLeft: 5,
	    paddingRight: 5,
	    borderColor: '#7a42f4',
	    borderWidth: 1,
	},
	list: {
		marginTop: 0,
		paddingTop: 0,
	},
	listItem: {
		paddingTop: 10,
		paddingBottom: 10,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: 'darkgray',
		borderBottomColor: 'darkgray',
	},
});