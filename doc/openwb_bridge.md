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

