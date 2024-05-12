---
title: Enumeracion con Nmap
published: 2024-05-05
description: 'Lista de comandos, scripts y parametros para enumeracion con Nmap'
image: ''
tags: [nmap]
category: 'Reconocimiento'
draft: false 
---

# Enumeracion con Nmap
Comandos de enumeracion con Nmap, la mayoria de estos comandos estan preparados para CTF's.
```bash
nmap -sn 10.10.10.0/24 # Escaneo de hosts activos
sudo nmap -sU <IP> # Escaneo de puertos por UDP
sudo nmap <IP> -p- --open -sS --min-rate 5000 -n -Pn -vvv -oG allports # Escaneo general de puertos abiertos
sudo nmap <IP> -p<Puertos> -sV -sC -oN scan # Escaneo de puertos en especifico
```
*Este uso del min-rate esta pensado para CTF, en entornos reales es mejor bajar la velocidad en este proceso.*

## Evasion de IDR/IPS y Firewall

En algunos casos puede que exista un IDS/IPS activo que pueda afectar nuestro proceso de enumeracion, para esto utilizamos el parametro *-D RND:X* para que *Nmap* coloque una diferente direccion IP en el *Header* del paquete enviado.
```bash
sudo nmap <IP> -p- -sS -Pn -n -D RND:<X> 
# Ejemplo 
sudo nmap 10.10.10.15 -p- -sS -Pn -n -D RND:5
```

Otro parametro recomendado pero mas en tema de **Firewall** es el cambiar el puerto de salida que utilizamos en Nmap:
```bash
--source-port <Puerto>
# Ejemplo
--source-port 56
```
Podemos obtener informacion con **ncat** sobre algun servicio que este corriendo la maquina si este se encuentra filtrado y lo pudimos identificar utilizando el parametro *--source-port*
Para conectarnos a un puerto filtrado en el caso de haber cambiado el puerto de salida de Nmap utilizaremos este puerto para obtener información de este mismo.
```bash
ncat -nv --source-port (Puerto local) (IP victima) (Puerto victima) 
# Ejemplo:
ncat -nv --source-port 56 10.10.10.5 9000
```

### Otros parametros utiles en la evasion
```bash
--disable-arp-ping # Deshabilitar ARP ping scan
--spoof-mac # Cambiar la MAC por ejemplo Vmware
--ttl # Establecer un TTL diferente
--data-length # Variar el length de los paquetes enviados
```

## Parametros extra
```bash
--packet-trace # Obtener la traza de los paquetes
--reason # Obtener la razón del estado del puerto
-sN # TCP Null Scan
-sF # TCP FIN Scan
```

## Scripts utiles
```bash
sudo nmap --script dns-zone-transfer.nse --script-args dns-zone-transfer.domain=<URL> # Obtener los DNS servers via Zone Transfer (tambien se puede realizar con dig o nslookup)
sudo nmap <Web-Port> --script=http-enum <URL> # Enumeracion de sitio web simple con Nmap (recomendado utilizar herramientas como FFUF o Feroxbuster)
sudo nmap --script=smb-enum-shares <IP> # Enumerar los directorios de smb, tambien se puede hacer con CrackMapExec o NetExec
```
---
*Esta lista se va a ir actualizando con el paso del tiempo.*
