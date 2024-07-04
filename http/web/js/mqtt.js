
var retries = 0;
var timeOfLastMqttMessage = 0;
//var usern='';
//var passwd='';

//Connect Options
var isSSL = location.protocol == 'https:'
    if(isSSL) P=MOSQPORTSSL;
      	 else P=MOSQPORT ;
    
var options = {
 	ports: [ P ],
 	hosts: [ MOSQSERVER ],
	userName: usern,
	password: passwd,
	timeout: 5,
	useSSL: isSSL,
	//Gets Called if the connection could not be established
	onFailure: function (message) {
		console.log("onFailure");
		console.log(message);
		setTimeout(function() { client.connect(options); }, 5000);
	}
};

var clientuid = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5);
var client = new Messaging.Client(MOSQSERVER, P, clientuid);

//Gets  called if the websocket/mqtt connection gets disconnected for any reason
client.onConnectionLost = function (responseObject) {
	client.connect(options);
}

client.onMessageArrived = function (message) {

	orgmqttmsg  = message.destinationName;
    mqttmsg = message.destinationName;
	//console.log('topic ', mqttmsg, message.payloadString);
	if( typeof usern !== 'undefined' && usern>'' )
	{
		mqttmsg  = mqttmsg.replace(usern+'/'  , '');
		//console.log('topic now ', mqttmsg, message.payloadString);
	}
	handlevar(mqttmsg, message.payloadString);
};



function doconnect(){
	console.log('usern:', usern, passwd);
	console.log('doconnect', options)
	client.connect(options);
	//timeOfLastMqttMessage = Date.now();
}


//Creates a new Messaging.Message Object and sends it
function publish(payload, topic) 
{
	if( usern>'' )
	   topic = usern + '/' + topic;
	var message = new Messaging.Message(payload);
	message.destinationName = topic;
	message.qos = 2;
	message.retained = true;
	console.log('MQTTPublish '+ topic + ' ' + payload);
	client.send(message);
//	var message = new Messaging.Message("local client uid: " + clientuid + " sent: " + topic);
//	message.destinationName = "openWB/set/system/topicSender";
//	message.qos = 2;
//	message.retained = true;
//	client.send(message);
}


/*

options.onSuccess = function () {
	console.log("mqtt onSuccess...");
	retries = 0;
	console.log('onConnectSucess subscribe ' , thevalues.length, ' values')
	thevalues.forEach((topic) => {
		if( usern>'')
			{ 
				// console.log('Subscripe ', usern + '/' + topic[0])
				client.subscribe( usern + '/' + topic[0], {qos: 0});
			} else {
				// console.log('Subscripe ', topic[0])
				client.subscribe( topic[0], {qos: 0});
			};  
		});
	};
 
*/
