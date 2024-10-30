---
title: Meow - Hack The Box
published: 2024-09-03
description: 'En este write-up, utilizaremos Nmap para escanear puertos e identificar puertos abiertos y servicios, enfocándonos en Telnet en el puerto 23. Enumeraremos, utilizaremos credenciales débiles y descargaremos la flag'
image: 'https://old-blog-yw4rf.vercel.app/_astro/meow-6.BpHm5Bkn_2aKIJ.webp'
tags: [HackTheBox, Machine]
category: 'WriteUp'
draft: false 
---

## Introducción

En este write-up, utilizaremos Nmap para escanear puertos e identificar puertos abiertos y servicios, enfocándonos en Telnet en el puerto 23. Enumeraremos, utilizaremos credenciales débiles y descargaremos la flag.


```
Platform: Hack The Box
Level: Very Easy
```

![Meow pwned yw4rf](https://old-blog-yw4rf.vercel.app/_astro/meow-6.BpHm5Bkn_2aKIJ.webp)


## Enumeración
```
target: 10.129.48.113  
```
<br>

Inicialmente, usamos el comando `Ping`. Este utiliza el **ICMP (Protocolo de Mensajes de Control de Internet)**. Específicamente, `Ping` envía un mensaje de "solicitud de eco" ICMP a una `dirección IP` y espera recibir un mensaje de "respuesta de eco" en respuesta. Este proceso nos permite verificar si una máquina en la red es accesible y medir el tiempo que tarda en recibir una respuesta (conocido como latencia).

`ping -c 1 10.129.48.113`

![Comando Ping](https://old-blog-yw4rf.vercel.app/_astro/meow-1.DiLmyByw_ZauPr8.webp)

Dado que el paquete fue recibido de la computadora objetivo, podemos confirmar que está operativa.

A continuación, se realiza un escaneo con Nmap (Network Mapper) para enumerar todos los puertos TCP abiertos en la máquina objetivo en detalle.

![Comando Nmap](https://old-blog-yw4rf.vercel.app/_astro/meow-2.BrnQL7Ta_Z23Tv0v.webp)

`sudo nmap -p- --open -sV --min-rate 5000 -n -Pn -vvv 10.129.48.113 -oG meow-scan`


```
- Nmap: Herramienta de escaneo de redes.

- -p-: Indica a Nmap que escanee todos los puertos disponibles, del 1 al 65535.

- --open: Filtra los resultados de Nmap para mostrar solo los puertos abiertos.

- -sV: Habilita la detección de servicios. Nmap intentará identificar las versiones que se ejecutan en los puertos abiertos.

- --min-rate 5000: Establece una tasa mínima de 5000 paquetes por segundo para acelerar el escaneo.

- -n: Evita la resolución DNS. Nmap no intentará convertir direcciones IP en nombres de dominio, lo que puede hacer que el escaneo sea más rápido.

- -Pn: Desactiva el descubrimiento inicial de hosts ("ping scan") y trata a todos los hosts como si estuvieran activos.

- 10.129.48.113: Especifica la dirección IP del objetivo a escanear.

- -Og meow-scan: Indica que los resultados del escaneo deben guardarse en un formato "grepable" (fácil de filtrar o buscar con comandos como grep). El archivo resultante se llamará meow-scan.
```
<br>

Podemos ver que encontró que el `puerto 23/tcp` está abierto, indicando que el servicio es `Telnet` con la versión `Linux telnetd`.

`PORT   STATE  SERVICE REASON           VERSION 23/tcp open   telnet? syn-ack ttl 63   Linux telnetd`

## Telnet

Con una búsqueda rápida en `Google`, podemos ver que `Telnet` es un protocolo de red que nos permite acceder a otra máquina para administrarla de forma remota como si estuviéramos sentados frente a ella. Generalmente utiliza el puerto 23 y el protocolo TCP para la transmisión de datos.

Una de las desventajas más significativas de Telnet es que no cifra los datos transmitidos, incluidas las credenciales (nombre de usuario y contraseña), lo que hace que las comunicaciones sean vulnerables a ataques de "hombre en el medio" y otras formas de espionaje.

Usando el comando `Telnet` y especificando la `dirección IP` objetivo, podemos iniciar sesión en la máquina y utilizar credenciales débiles.

![Acceso Telnet](https://old-blog-yw4rf.vercel.app/_astro/meow-3.B7VrxIpI_241Kx2.webp)

Después de probar varios nombres de usuario, como `admin` y `administrator`, se nos concedió acceso sin contraseña utilizando el nombre de usuario `root`.

`Meow login: root`

![Root telnet](https://old-blog-yw4rf.vercel.app/_astro/meow-4.CKPXuNlI_Z23PiPz.webp)

Una vez que hemos obtenido acceso como root en la máquina objetivo, tenemos control total sobre ella.

Con el comando `ls`, revisamos el contenido del directorio actual, donde vemos el archivo `flag.txt`, que es el paso final para completar la máquina. Usando el comando `cat flag.txt`, visualizamos el contenido del archivo y obtenemos la flag.

![Flag capturada máquina Meow](https://old-blog-yw4rf.vercel.app/_astro/meow-5.3Fo_wjEw_UlXa0.webp)

<br>

Una vez que hemos capturado la flag, **hemos completado la máquina Fawn**.
![Meow pwnd yw4rf](https://old-blog-yw4rf.vercel.app/_astro/meow-7.B07hYUuM_2fgeRo.webp)

<br>
