---
title: Fawn - Hack The Box
published: 2024-09-04
description: 'En este write-up, usaremos Nmap para identificar puertos abiertos y servicios, enfocándonos en FTP en el puerto 21. Vamos a enumerar el servicio FTP, explotaremos el inicio de sesión anónimo y descargaremos la flag.'
image: 'https://old-blog-yw4rf.vercel.app/_astro/0-Fawn.C4-iV88g_1C3oOI.webp'
tags: [HackTheBox, Machine]
category: 'WriteUp'
draft: false 
---

## Introduction 

In this walkthrough, we'll use Nmap for port scanning to identify open ports and services, focusing on FTP on port 21. We'll enumerate the FTP service, exploit anonymous login, and download the flag.

![Fawn Pwnd yw4rf](https://old-blog-yw4rf.vercel.app/_astro/0-Fawn.C4-iV88g_1C3oOI.webp)

```
Platform: Hack The Box
Level: Very Easy 
```


![Fawn machine complete yw4rf](https://old-blog-yw4rf.vercel.app/_astro/1-Fawn.DLpEjN8C_G0HJ.webp)

## Enumeration
```
target: 10.129.97.198  
```
<br>

First, we use the command `ping -c 1 10.129.97.198` to check connectivity. 

![Fawn hackthebox yw4rf](https://old-blog-yw4rf.vercel.app/_astro/2-Fawn.PGV5Jxm1_11kC0P.webp)

Since we are connected, we begin with the **Port scanning using the Nmap tool**, hoping to find open ports and running services:

![Fawn hackthebox yw4rf](https://old-blog-yw4rf.vercel.app/_astro/4-Fawn.CCEa5hgk_27PCOd.webp)

As you may notice, at the end of the Nmap command, I wrote `-oG fawn-scan`, which saves the scan results in **"grepable" format (grepable output)**. This format is simpler and more compact than the standard output, allowing us to easily **extract specific information**. Here, we run it using the **cat** command. We can see that the status is **"Up"** along with information about the ports and their versions.

![Fawn hackthebox yw4rf](https://old-blog-yw4rf.vercel.app/_astro/3-Fawn.aJfQzRP5_Z1M5RyJ.webp)
`21/open/tcp//ftp/vsftpd 3.0.3/` We can conclude that the only open port is **21**, which runs the **FTP** protocol, and its version is **vsftpd 3.0.3**.
## FTP Enumeration
To gather more information about port 21, we’ll perform a scan specifically on this port using the Nmap flag `-sCV`.
![Fawn hackthebox yw4rf](https://old-blog-yw4rf.vercel.app/_astro/4-Fawn.CCEa5hgk_27PCOd.webp)
We see that it says `ftp-anon: Anonymous FTP login allowed`, there is a file named `flag.txt`, and we are on a `UNIX` operating system.
   ```
Anonymous FTP: This is a method that allows entry into an FTP server without needing to authenticate with an account and password. Users connect to the server using the username "anonymous" (or "ftp" in some cases) and any password. 
```


We connect to the FTP server using the FTP client on the target. For the username, we use **Anonymous**, and for the password, in this case, nothing (press enter). **We successfully connect to the target FTP server**.

![Fawn hackthebox yw4rf](https://old-blog-yw4rf.vercel.app/_astro/5-Fawn.BrKbKp9X_HBYUr.webp)

## Exploitation phase

We use the `ls` command to list files or directories.

![Fawn hackthebox yw4rf](https://old-blog-yw4rf.vercel.app/_astro/6-Fawn.CmthWryW_Z7O9BR.webp)

Once we find the `flag.txt` file, we can download it to our local machine. After downloading it, we can exit.

![Fawn hackthebox yw4rf](https://old-blog-yw4rf.vercel.app/_astro/7-Fawn.CnCjtEd7_Z1tjlSM.webp)

We go to the directory where the `flag.txt` file was downloaded, and we can open it with the command `cat {filename}`.

![Fawn hackthebox yw4rf](https://old-blog-yw4rf.vercel.app/_astro/8-Fawn.DQ8lG24Z_ZeNucU.webp)

<br>

Once we have captured the flag, **we have completed the Fawn machine**.

![Fawn hackthebox yw4rf](https://old-blog-yw4rf.vercel.app/_astro/9-Fawn.wlCfeGrM_Z1FsOTV.webp)

<br>