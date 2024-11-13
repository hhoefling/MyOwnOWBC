**Vorbereiten des MQTT-Servers Mosquitto auf dem Webspace.**

Ich Verwende eine VServer Account.
Dort ist ein Debian 12 Installiert.
Dort steht mir nur die Mosquitto-Version 2.0.11 zur verfügung

Sie wird installiert mit

```
sudo apt install mosquitto mosquitto-clients
```

Hier die Haupt-Konfiguration Datei: /etc/mosquitto/mosquitto.conf
```
# Place your local configuration in /etc/mosquitto/conf.d/
#
# A full description of the configuration file is at
# /usr/share/doc/mosquitto/examples/mosquitto.conf.example

pid_file /run/mosquitto/mosquitto.pid

persistence true
persistence_location /var/lib/mosquitto/

log_dest syslog
log_type information
log_type notice
log_dest file /var/log/mosquitto/mosquitto.log

include_dir /etc/mosquitto/conf.d
```

Auf dem Webspace ist let's Encrypt installiert und für meine Domain schon eingerichtet.
Im Rahmen der Webserver Pflege wird es regelmäig erneuert. 
Dieses Zertificat werde ich hier ebenfalls mitverwenden.
Zu diesem Zweck werden Zertificat Dateien vom Update-script des Webspaces nach der Erneuerung 
in /etc/mosquitto/certs übernommen. Die Dateien müssen mosquitto gehören.

Daher die Kopie aus dem letsencrypt/live Verzeichniss.

Für meine OWB-Cloud legen wir einen weiter Konfigurationsdatei an

/etc/mosquitto/conf.d/default.conf
```

listener 1883 127.0.0.1
protocol mqtt
allow_anonymous true
password_file /etc/mosquitto/passwd

listener 9001 127.0.0.1
socket_domain ipv4
allow_anonymous false
protocol websockets

listener 8883 ip4.des.webspace
protocol mqtt
socket_domain ipv4
allow_anonymous false
certfile /etc/mosquitto/certs/cert.pem
cafile /etc/mosquitto/certs/fullchain.pem
keyfile /etc/mosquitto/certs/privkey.pem
tls_version tlsv1.2

listener 8443 ip4.des.webspace
protocol websockets
socket_domain ipv4
allow_anonymous false
tls_version tlsv1.2
certfile /etc/mosquitto/certs/cert.pem
cafile /etc/mosquitto/certs/fullchain.pem
keyfile /etc/mosquitto/certs/privkey.pem
```

Nun legen wir den Benutzer an.

```
sudo mosquitto_passwd -c /etc/mosquitto/passwd mqttuser
sudo mosquitto_passwd -b /etc/mosquitto/passwd mqttuser mqttpassword
sudo /etc/init.d/mosquitto stop
sudo /etc/init.d/mosquitto start

```

Dieser Benutzername wird auch als Topic-Name verwendet. Er sollte also nur aus Buchstaben bestehen.
Die openWB Konfiguration läst auch keine andere Zeichen zu. 

Mit MQTT-Desktop kann man nun die Verbinung mit TLS aufbauen.

![mqtt1](https://github.com/hhoefling/MyOwnOWBC/assets/89247538/88885e8f-9b5c-402c-94b2-684d91b809ae)


Die ID kann frei gewählt werden, sie muss nur größer 0 sein. Das Theme ist das defaultthema (wie in openWB)

Die Anmeldung verläuft wie folgt:

Es wird mit mqttuser und mqttpassword
Der Benutzername **mqttuser** ist hier "sechseins"  
Hier sieht man schon die Daten der localen openWB im Zwei "sechseins".
Weiterhin wird hier der Benutzer angelegt. Beim Anmelden wird dieses Topic gelesen um den Benutzer zu verifizieren.

![mqtt2](https://github.com/hhoefling/MyOwnOWBC/assets/89247538/9dbf6a5c-d218-4117-b486-c3e2d03ee8d1)


Die Anmeldung verläuft dann wie folgt.

Mit <b>mqttuser</b> und <b>mqttpassword</b> wird einen TlS gesicherte Verbindung zum MQTT Server aufgebaut.
Dann wird das Topic <b>mqttuser/webparm/#</b> gelesen. Wenn dort eine ID gefunden wird ist der Benutzer angemeldet.
Dieses Anmeldeinformationen werden dann in einem Verschlüsselten Cookie dem Browser zur aufbewarung gegeben.
Die PHP-Seiten prüfen dieses Cookie bei jedem Seitenaufruf.

