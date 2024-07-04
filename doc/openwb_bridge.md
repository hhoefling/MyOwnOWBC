**MQTT-Brücke**

Die Daten der openWB / openWB-Lite werden mit einer MQTT-Brücke ins Internet
gespigelt. Die Weboberfläche greift also auf den öffentlichen MQTT Server zu und nicht auf den MQTT Server der Wahlbox Zuhause.
In der Heimischen openWB muss also eine sogennante MQTT-Brücke eingerichtet werden.

Hier die benötigen Einstellungen unter  home.ip/openWB/web/settings/mqtt.php
```
Brücke  = An
Name der Brücke = Beliebig
Adresse = domainname:8883
Benutzer = mqttuser
password = mqttpasswd
Entferntes Präfix = mqttuser
MQTT Protokoll = v3.1.1
TLS = TLS v1.2
Brücke signaliesieren = An
Alle Status Daten = An
Datenserien = An
Fernkonfig = Aus
```

Wenn diese Brücke aktive ist sollte man dies auf beiden Seiten mit Netstat sehen können.

Zuhause:
```
root@pi67:~# netstat -nap | grep 8883
tcp        0      0 192.168.xxx.xxx:54620    178.xxx.xxx.xxx:8883     ESTABLISHED 28146/mosquitto
root@pi67:~#
```
Wobei 178.xxx.xxx.xx die IP4 Adresse des Webspaces ist und 192.168.xxx.xxx die Lokale IP Adresse der Wallbox im Heimnetz.

In eine Shell des Webpaces dann im Gegenzug:

Webspace:
```
root@xxxx.de:~# netstat -nap | grep 8883
tcp        0      0 178.xxx.xxx.xxx:8883     0.0.0.0:*               LISTEN      32443/mosquitto
tcp        0      0 178.xxx.xxx.xxx:8883     91.xx.xx.xx:53800       ESTABLISHED 32443/mosquitto
tcp        0      0 178.xxx.xxx.xxx:8883     91.xx.xx.xx:58048       ESTABLISHED 32443/mosquitto
```

Wobei hier dann 91.xx.xx.xx die Dynamische IP Adresse des Heimischen DSL-Routers ist.


Mit dem MQTT-Explorer kann man dies ebenfalls prüfen.

Hier  nochmal die Konfigurationdatei die von openWB erzeugt wurde.
Es wurden einige Zeilen ergänzt damit auch die Grafik-Auswahl mit zur Cloud übernommen wird.

File: /etc/mosquitto/conf.d/99-bridge-cloud.conf

```
# bridge to domaim:8883
#

# Just a name of subsequently configured the bridge.
connection cloud

# The host name or IP address and port number of the remote MQTT server.
address domain:8883


###################################################################
## Below choose what to share (bridge to) the remote MQTT server ##
#################################################################### export global data to remote
topic openWB/global/# out 2 "" mqttuser/

# export global data to remote
topic openWB/system/# out 2 "" mqttuser/

# export all EVU data to remote
topic openWB/evu/# out 2 "" mqttuser/

# export all charge point data to remote
topic openWB/lp/# out 2 "" mqttuser/

# export all charge point data to remote
topic openWB/housebattery/# out 2 "" mqttuser/

# export all Verbraucher data to remote
topic openWB/Verbraucher/# out 2 "" mqttuser/

# export all charge point data to remote
topic openWB/pv/# out 2 "" mqttuser/

# ---- Addition start ---
# Leider klappt openWB/graph/bool# hier nicht. Daher "ausgeschrieben"
topic openWB/graph/boolDisplayLp1  out 2 "" mqttuser/
topic openWB/graph/boolDisplayLp2  out 2 "" mqttuser/
topic openWB/graph/boolDisplayLp3  out 2 "" mqttuser/
topic openWB/graph/boolDisplayLpAll  out 2 "" mqttuser/
topic openWB/graph/boolDisplayLp1Soc  out 2 "" mqttuser/
topic openWB/graph/boolDisplayLp2Soc  out 2 "" mqttuser/
topic openWB/graph/boolDisplayEvu  out 2 "" mqttuser/
topic openWB/graph/boolDisplayLoad1 out 2 "" mqttuser/
topic openWB/graph/boolDisplayLoad2 out 2 "" mqttuser/
topic openWB/graph/boolDisplayPv out 2 "" mqttuser/
topic openWB/graph/boolDisplaySpeicher out 2 "" mqttuser/
topic openWB/graph/boolDisplaySpeicherSoc out 2 "" mqttuser/
topic openWB/graph/boolDisplayShD1 out 2 "" mqttuser/
topic openWB/graph/boolDisplayShD2 out 2 "" mqttuser/
topic openWB/graph/boolDisplayShD3 out 2 "" mqttuser/
topic openWB/graph/boolDisplayShD4 out 2 "" mqttuser/
topic openWB/graph/boolDisplayShD5 out 2 "" mqttuser/
topic openWB/graph/boolDisplayShD6 out 2 "" mqttuser/
topic openWB/graph/boolDisplayShD7 out 2 "" mqttuser/
topic openWB/graph/boolDisplayShD8 out 2 "" mqttuser/
topic openWB/graph/boolDisplayShD9 out 2 "" mqttuser/
topic openWB/graph/boolDisplayHouseConsumption out 2 "" mqttuser/
topic openWB/graph/boolDisplayLegend out 2 "" mqttuser/
topic openWB/graph/boolDisplayLiveGraph out 2 "" mqttuser/
# ---- Addition end ---

# export global data to remote
topic openWB/config/get/# out 2 "" mqttuser/
topic openWB/SmartHome/# out 2 "" mqttuser/

# Allow write Access for request for Graphs and selection of Date
topic openWB/set/graph/# both 2 "" mqttuser/

##################################################################################################
## Below choose what to subscribe on  the remote MQTT server in order to receive setting data   ##
## You may comment everything in order to not allow any MQTT remote configuration of the openWB ##
##################################################################################################

##############################
## Remote server settings   ##
##############################

# Client ID that appears in local MQTT server's log data.
# Setting it might simplify debugging.
local_clientid bridgeClientcloud

# User name to for logging in to the remote MQTT server.
remote_username mqttuser

# Password for logging in to the remote MQTT server.
remote_password mqttpasswd

# Client ID that appears in remote MQTT server's log data.
# Setting it might simplify debugging.
# Commenting uses a random ID and thus gives more privacy.
remote_clientid owb67cloud-75188

# MQTT protocol to use - ideally leave at latest version (mqttv311).
# Only change if remote doesn't support mqtt protocol version 3.11.
bridge_protocol_version mqttv311

# TLS version to use for transport encryption to the remote MQTT server.
# Use at least tlsv1.2. Comment to disable encryption (NOT RECOMMENDED).
bridge_tls_version tlsv1.2

# Verify TLS remote host name (false).
# Only change if you know what you're doing!
bridge_insecure false

# Indicate to remote that we're a bridge. Only compatible with remote Mosquitto brokers.
# Only change if you know what you're doing!
try_private true

# How often a "ping" is sent to the remote server to indicate that we're still alive and keep firewalls open.
keepalive_interval 63

# Path to a directory with the certificate for verifying TLS connections.
# The default will work for official certificates (including LetsEncrypt ones).
# Don't change unless you're using self-signed certificates.
bridge_capath /etc/ssl/certs

###################################################################
## don't change below unless you _really_ know what you're doing ##
###################################################################

# Automatically connect to the remote MQTT server.
# There a restart_timeout parameter which defaults to jitters with a base of 5 seconds and a cap of 30 second
s so the
# local side doesn't get overloaded trying to reconnect to a non-available remote.
start_type automatic

notifications false
cleansession false
```

Hierbei auch wieder *mqttuser* *mqttpasswd* und *domain* entsprechend anpassen.
