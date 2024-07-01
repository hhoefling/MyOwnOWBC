**Vorbereiten des MQTT-Servers Mosquitto auf dem Webspace.**

Ich Verwende eine VServer Account.
Dort ist ein altes Debian 9 Installiert.
Dort steht mir nur die Mosquitto-Version 1.4.10 zur verfügung

Sie wird installiert mit

```
sudo apt install mosquitto mosquitto-clients
```

Hier die Haupt-Konfiguration Datei: /etc/mosquitto/mosquitto.conf
```
pid_file /var/run/mosquitto.pid

persistence true
persistence_location /var/lib/mosquitto/

log_dest syslog
log_type information
log_type notice
log_dest file /var/log/mosquitto/mosquitto.log

# listener 1883 127.0.0.1

include_dir /etc/mosquitto/conf.d
```



Auf dem Webspace ist let's Encrypt installiert und für meine Domain schon eingerichtet.
Im Rahmen der Webserver Pflege wird es regelmäig erneuert. 

Dieses Zertificat werde ich hier ebenfalls mitverwenden.

Für meine OWB-Cloud legen wir einen weiter Konfigurationsdatei an

/etc/mosquitto/conf.d/default.conf
```
allow_anonymous false
password_file /etc/mosquitto/passwd

listener 1883 127.0.0.1
protocol mqtt

#listener 9001
#protocol websockets

listener 8883 IP4.des.Servers
protocol mqtt
allow_anonymous false
certfile /etc/letsencrypt/live/DOMAIN/cert.pem
cafile /etc/letsencrypt/live/DOMAIN/fullchain.pem
keyfile /etc/letsencrypt/live/DOMAIN/privkey.pem
#tls_version tlsv1

listener 8443 ip4.des.Servers
protocol websockets
allow_anonymous false
#tls_version tlsv1
certfile /etc/letsencrypt/live/DOMAIN/cert.pem
cafile /etc/letsencrypt/live/DOMAIN/fullchain.pem
keyfile /etc/letsencrypt/live/DOMAIN/privkey.pem

```
Hierbei ist DOMAIN und ip4.des.Servers entprechend zu ersetzen.



