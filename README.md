# MyOwnOWBC  (***Work in Progress***)
**Eine einfache selbstgehostetet Version der openWB-Cloud. (1.9,x)**


Hier entsteht eine einfache Version der 1.9'er openWB-Cloud.
Die Firma openWB stellt die öffentliche Cloud für die 1.9'er Version
der openWB-Software am 1.10.2024 ein.

Ich habe daher entschieden das ich mir eine eigene Cloud einrichten werde.
Hierzu werde ich die lokalen Theme der openWB-1.9'er an die verwendung in der Cloud anpasen.

Voraussetzungen:
- openWB Wallbox mit einer 1.9'er Version (oder mit meiner openWB-Lite)
- Web Account mit der möglichkeit einen Mosquitto Broker einzurichten.
- Webserver mit Php >=7.3

Da meine Cloud nur für einen Benutzer gedacht ist, entfällt einen Benutzerverwaltung.
Das benötigte User-Konto wird von Hand einmalig auf dem Mqtt Broker eingerichtet.
Der Zugang zur Cloud geht nur über HTTPS und auch die Mqtt-Verbindung wird über einen 
TLS verbindung erfolgen.

Weiterhin soll die gleiche Website auch für die  localen Benutzung im Heimnetzt verwendet werden.
Hierzu einfach auf dem Raspberry Pi der openWB installieren. Hierzu ist allerdings ein Root-zugriff
auf den openWB-Raspi erforderlich.
Das erleichte die Entwicklung da diese dann lokal erfolgen kann. In die öffentlichkeit kommen dann nur
Release Versionen.  Auch ist es möglich mehrere Versionen paralell zu verwenden.

Zuerst wird es, wie auch bei der orignal Cloud, nur ein Thema geben (als Standart und Dark).

So wird es aussehen:

![MyCloud](https://github.com/hhoefling/MyCloud-1.9/assets/89247538/0fe8a1da-4487-4aa0-aed3-59ff53dc73d5)


**Installation:**

-  [MQTT-Server ](doc/mqtt.md) Vorbereiten des MQTT-Servers Mosquitto auf dem Webspace. 
-  [MQTT-Brücke ](doc/openwb_bridge.md) Vorbereiten der heimischen Wallbox.



