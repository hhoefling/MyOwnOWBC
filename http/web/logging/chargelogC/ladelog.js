

var initialladelogread = 1;
var ConfiguredChargePoints = 0;
var gotconfiguredchargepoints = 0;
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') { 
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
/*
// var clientuid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
// var client = new Messaging.Client("web.openwb.de", 8443, clientuid);
// usern=getCookie("username");
// password=getCookie("password");
*/
function handlevar(mqttmsg, mqttpayload) {
	orgmqttmsg  = mqttmsg;
	//console.log('topic ', mqttmsg, mqttpayload)
	if( typeof usern !== 'undefined' && usern>'' )
	{
		mqttmsg  = mqttmsg.replace(usern+'/'  , '');
		//console.log('topic now ', mqttmsg, mqttpayload)
	}

	if ( mqttmsg =="openWB/system/ConfiguredChargePoints" ) {
		ConfiguredChargePoints = mqttpayload;

		if ( mqttpayload == 1 ) {
			document.getElementById("chargep1").style.display = 'block';
		}
		if ( mqttpayload == 2 ) {
			document.getElementById("chargep1").style.display = 'block';
			document.getElementById("chargep2").style.display = 'block';

		}
		if ( mqttpayload == 3 ) {
			document.getElementById("chargep1").style.display = 'block';
			document.getElementById("chargep2").style.display = 'block';
			document.getElementById("chargep3").style.display = 'block';

		}
		gotconfiguredchargepoints = 1;
	}

	else if ( mqttmsg =="openWB/system/MonthLadelogData1" ) {
		                     if (initialladelogread == 0 && (mqttpayload != "empty")) {
					                             ladelog1p = mqttpayload;
					                             ladelog1 = 1;
					                             putladelogtogether();
					                     }
		             }
	else if ( mqttmsg == "openWB/system/MonthLadelogData2" ) {
			                if (initialladelogread == 0 && (mqttpayload != "empty")) {
						                        ladelog2p = mqttpayload;
						                        ladelog2 = 1;
						                        putladelogtogether();
						                }
			        }
	else if ( mqttmsg == "openWB/system/MonthLadelogData3" ) {
			                if (initialladelogread == 0 && (mqttpayload != "empty")) {
						                        ladelog3p = mqttpayload;
						                        ladelog3 = 1;
						                        putladelogtogether();
						                }
			        }
	else if ( mqttmsg == "openWB/system/MonthLadelogData4" ) {
					
			                if (initialladelogread == 0 && (mqttpayload != "empty")) {
						                        ladelog4p = mqttpayload;
						                        ladelog4 = 1;
						                        putladelogtogether();
						                }
			        }
	else if ( mqttmsg == "openWB/system/MonthLadelogData5" ) {
			                if (initialladelogread == 0 && (mqttpayload != "empty")) {
						                        ladelog5p = mqttpayload;
						                        ladelog5 = 1;
						                        putladelogtogether();
						                }
			        }
	else if ( mqttmsg == "openWB/system/MonthLadelogData6" ) {
			                if (initialladelogread == 0 && (mqttpayload != "empty")) {
						                        ladelog6p = mqttpayload;
						                        ladelog6 = 1;
						                        putladelogtogether();
						                }
			        }
	else if ( mqttmsg == "openWB/system/MonthLadelogData7" ) {
			                if (initialladelogread == 0 && (mqttpayload != "empty")) {
						                        ladelog7p = mqttpayload;
						                        ladelog7 = 1;
						                        putladelogtogether();
						                }
			        }
	else if ( mqttmsg == "openWB/system/MonthLadelogData8" ) {
		                     if (initialladelogread == 0 && (mqttpayload != "empty")) {
					                             ladelog8p = mqttpayload;
					                             ladelog8 = 1;
					                             putladelogtogether();
					                     }
		             }
	else if ( mqttmsg == "openWB/system/MonthLadelogData9" ) {
			                if (initialladelogread == 0 && (mqttpayload != "empty")) {
						                        ladelog9p = mqttpayload;
						                        ladelog9 = 1;
						                        putladelogtogether();
						                }
			        }
	else if ( mqttmsg == "openWB/system/MonthLadelogData10" ) {
			                if (initialladelogread == 0 && (mqttpayload != "empty")) {
						                        ladelog10p = mqttpayload;
						                        ladelog10 = 1;
						                        putladelogtogether();
						                }
			        }
	else if ( mqttmsg == "openWB/system/MonthLadelogData11" ) {
			                if (initialladelogread == 0 && (mqttpayload != "empty")) {
						                        ladelog11p = mqttpayload;
						                        ladelog11 = 1;
						                        putladelogtogether();
						                }
			        }
	else if ( mqttmsg == "openWB/system/MonthLadelogData12" ) {
			                if (initialladelogread == 0 && (mqttpayload != "empty")) {
						                        ladelog12p = mqttpayload;
						                        ladelog12 = 1;
						                        putladelogtogether();
						                }
			        }
};



var thevalues = [
	[ "openWB/system/MonthLadelogData1", "#"],
	[ "openWB/system/MonthLadelogData2", "#"],
	[ "openWB/system/MonthLadelogData3", "#"],
	[ "openWB/system/MonthLadelogData4", "#"],
	[ "openWB/system/MonthLadelogData5", "#"],
	[ "openWB/system/MonthLadelogData6", "#"],
	[ "openWB/system/MonthLadelogData7", "#"],
	[ "openWB/system/MonthLadelogData8", "#"],
	[ "openWB/system/MonthLadelogData9", "#"],
	[ "openWB/system/MonthLadelogData10", "#"],
	[ "openWB/system/MonthLadelogData11", "#"],
	[ "openWB/system/MonthLadelogData12", "#"],
	[ "openWB/system/ConfiguredChargePoints", "#"],
];


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
  
// client.connect(options);
$(document).ready(function(){
	console.log('now connect', options)
	doconnect();
});



function showhideladelog() {
	        if(document.getElementById("ladelogdiv").style.display != "none") {
			                $('#hauptpage').show();
			                $('#ladelogdiv').hide();
			        } else {
					                $('#hauptpage').hide();
					                $('#ladelogdiv').show();
					                if ( graphdate == null) {
								                        var today = new Date();
								                        var dd = String(today.getDate()).padStart(2, '0');
								                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
								                        var yyyy = today.getFullYear();
								                        graphdate = yyyy + mm;
								                        cgraphdate = yyyy + "-" + mm;
								                } else {
											                        graphdate = graphdate.replace('-','').replace('-','');
											                }
					                $("#ladelogdatediv").html(graphdate);
					                document.getElementById('datePickerlog').value = cgraphdate;
			                                                                                             
		}
	};
function selectladelogclick(newdate){
	        newdate = newdate.replace('-','');
	        ladelog1=0;
	        ladelog2=0;
	        ladelog3=0;
	        ladelog4=0;
	        ladelog5=0;
	        ladelog6=0;
	        ladelog7=0;
	        ladelog8=0;
	        ladelog9=0;
	        ladelog10=0;
	        ladelog11=0;
	        ladelog12=0;
	        ladelog1p="";
	        ladelog2p="";
	        ladelog3p="";
	        ladelog4p="";
	        ladelog5p="";
	        ladelog6p="";
	        ladelog7p="";
	        ladelog8p="";
	        ladelog9p="";
	        ladelog10p="";
	        ladelog11p="";
	        ladelog12p="";
	        initialladelogread=0;
	        publish(newdate,  "openWB/set/graph/RequestMonthLadelog");
}
function putladelogtogether() {
	if ( (ladelog1 == 1) && (ladelog2 == 1) && (ladelog3 == 1) && (ladelog4 == 1) && (ladelog5 == 1) && (ladelog6 == 1) && (ladelog7 == 1) && (ladelog8 == 1) && (ladelog9 == 1) && (ladelog10 == 1) && (ladelog11 == 1) && (ladelog12 == 1) ){
		var ladelogdata = ladelog1p + "\n" 
					    + ladelog2p + "\n" 
						+ ladelog3p + "\n" 
						+ ladelog4p + "\n" 
						+ ladelog5p + "\n" 
						+ ladelog6p + "\n" 
						+ ladelog7p + "\n" 
						+ ladelog8p + "\n" 
						+ ladelog9p + "\n" 
						+ ladelog10p + "\n" 
						+ ladelog11p + "\n" 
						+ ladelog12p;
		ladelogdata = ladelogdata.replace(/^\s*[\n]/gm, '');
		initialladelogread = 1 ;
		
		function parseResult(result) {
			var resultArray = [];
			lines=result.split("\n");
			lines.forEach(function(row) {
				var rowArray = [];
				r=row.split(",");
				r.forEach(function(cell) {
					rowArray.push(cell);
				});
				if ( rowArray.length > 2 ) {
					resultArray.push(rowArray);
				}
			});
			return resultArray;
		}
		parsedlog = parseResult(ladelogdata);
		var totalkwh = "0";
		var totalkm = "0";
		if (document.getElementById('showlp1').checked){
			var showlp1 = 1;
		} else {
			var showlp1 = 0;
		}
		if (document.getElementById('showlp2').checked){
			var showlp2 = 1;
		} else {
			var showlp2 = 0;
		}
		if (document.getElementById('showlp3').checked){
			var showlp3 = 1;
		} else {
			var showlp3 = 0;
		}
		if (document.getElementById('showlp4').checked){
			var showlp4 = 1;
		} else {
			var showlp4 = 0;
		}
		if (document.getElementById('showlp5').checked){
			var showlp5 = 1;
		} else {
			var showlp5 = 0;
		}
		if (document.getElementById('showlp6').checked){
			var showlp6 = 1;
		} else {
			var showlp6 = 0;
		}
		if (document.getElementById('showlp7').checked){
			var showlp7 = 1;
		} else {
			var showlp7 = 0;
		}
		if (document.getElementById('showlp8').checked){
			var showlp8 = 1;
		} else {
			var showlp8 = 0;
		}
		if (document.getElementById('showsofort').checked){
			var showsofort = 1;
		} else {
			var showsofort = 0;
		}
		if (document.getElementById('showstandby').checked){
			var showstandby = 1;
		} else {
			var showstandby = 0;
		}
		if (document.getElementById('shownurpv').checked){
			var shownurpv = 1;
		} else {
			var shownurpv = 0;
		}
		if (document.getElementById('showminpv').checked){
			var showminpv = 1;
		} else {
			var showminpv = 0;
		}
		if (document.getElementById('shownacht').checked){
			var shownacht = 1;
		} else {
			var shownacht = 0;
		}
		if (document.getElementById('showrfid').checked){
			var showrfid = 1;
			var rfidtag = document.getElementById('rfidtag').value;
		} else {
			var showrfid = 0;
		}

		var testout = [];
		var rowcnt=0;
		parsedlog.forEach(function(row) 
		{
			rowcnt+=1;
			var cellcount=0;
			var temparr = [];
			var writelp = 0;
			var writemodus = 0;
			var writerfid = 0;
			row.forEach(function(cell) {
				cellcount+=1;
				temparr.push(cell);
				if ( cellcount == 7) {
					if (cell == 1 && showlp1 == 1) {
						writelp = 1;
					}
					if (cell == 2 && showlp2 == 1) {
						writelp = 1;
					}
					if (cell == 3 && showlp3 == 1) {
						writelp = 1;
					}
					if (cell == 4 && showlp4 == 1) {
						writelp = 1;
					}
					if (cell == 5 && showlp5 == 1) {
						writelp = 1;
					}
					if (cell == 6 && showlp6 == 1) {
						writelp = 1;
					}
					if (cell == 7 && showlp7 == 1) {
						writelp = 1;
					}
					if (cell == 8 && showlp8 == 1) {
						writelp = 1;
					}

				}
				if ( cellcount == 8) {
					if (cell == 0 && showsofort == 1) {
						writemodus = 1;
					}
					if (cell == 1 && showminpv == 1) {
						writemodus = 1;
					}
					if (cell == 2 && shownurpv == 1) {
						writemodus = 1;
					}
					if (cell == 3) {
						writemodus = 1;
					}
					if (cell == 4 && showstandby == 1) {
						writemodus = 1;
					}
					if (cell == 7 && shownacht == 1) {
						writemodus = 1;
					}
				}
				if ( cellcount == 9) {
					if (showrfid == 1) {
						if ( cell == rfidtag ) {
							writerfid = 1;
						}
					} else {
					writerfid = 1;
					}
				}
				if (row.length == 8) {
					if ( cellcount == 8 && writelp == 1 && writemodus == 1 && showrfid == 0) {
						testout.push(temparr);
					}
				}
				if ( cellcount == 9 && writelp == 1 && writemodus == 1 && writerfid == 1) {
					testout.push(temparr);
				}
			});
		});
		if ( testout.length >= 1 ) {
		var content = '<table class="table">'
					   +'<thead><tr><th scope="col">Startzeit</th>'
					   +'<th scope="col">Endzeit</th>'
					   +'<th scope="col">geladene km</th>'
					   +'<th scope="col">kWh</th>'
					   +'<th scope="col">mit kW</th>'
					   +'<th scope="col">Ladedauer</th>'
					   +'<th scope="col">Ladepunkt</th>'
					   +'<th scope="col">Lademodus</th>'
					   +'<th scope="col">RFID Tag</th>'
					   +'<th scope="col">KM</th>'
					   +'<th scope="col">Kosten</th>'
					   +'</tr></thead> <tbody>';
		var rowcount=0;
		var avgkw="0";
		
		testout.forEach(function(row) {
			rowcount+=1;
			content += "<tr>";
			var cellcount=0;
			row.forEach(function(cell) {

				cellcount+=1;
				if ( cellcount == 3 ) {
					totalkm = parseFloat(totalkm) + parseFloat(cell);
				}
				if ( cellcount == 4 ) {
					totalkwh = parseFloat(totalkwh) + parseFloat(cell);
				}
				if ( cellcount == 5 ) {
					avgkw = parseFloat(avgkw) + parseFloat(cell);
				}

				if ( cellcount == 8 ) {
					if (cell == 2) {
						content += "<td>" + "Nur PV" + "</td>" ;
					} else if (cell == 0) {
						content += "<td>" + "Sofort Laden" + "</td>" ;
					} else if (cell == 1) {
						content += "<td>" + "Min und PV" + "</td>" ;
					} else if (cell == 4) {
						content += "<td>" + "Standby" + "</td>" ;
					} else if (cell == 3) {
						content += "<td>" + "Standby" + "</td>" ;
					} else if (cell == 7) {
						content += "<td>" + "Nachtladen" + "</td>" ;
					} else {
						content += "<td>" + cell + "</td>" ;
					}
				} else {
					content += "<td>" + cell + "</td>" ;
				}
			});
			content += "</tr>";
		});
		content += '<tr><th scope="col">Startzeit</th>'
				+'<th scope="col">Endzeit</th>'
				+'<th scope="col">' + totalkm.toFixed(0) + ' geladene km</th>'
				+'<th scope="col">' + totalkwh.toFixed(2) + ' kWh </th>'
				+'<th scope="col">mit ' + (avgkw / rowcount).toFixed(2) + ' kW</th>'
				+'<th scope="col">Ladedauer</th>'
				+'<th scope="col">Ladepunkt</th>'
				+'<th scope="col">Lademodus</th>'
				+'<th scope="col">RFID Tag</th>'
				+'<th>KM</th>'
				+'<th>Kosten</th>'
				+'</tr></thead>';
		content += "</tbody></table>";
		document.getElementById("ladelogtablediv").innerHTML = content;
		} else {
			document.getElementById("ladelogtablediv").innerHTML = "Keine Ergebnisse";
		}

	}
}
function getCol(matrix, col){
	        var column = [];
	        for(var i=0; i<matrix.length; i++){
			               column.push(matrix[i][col]);
			        }
	        return column;
}


