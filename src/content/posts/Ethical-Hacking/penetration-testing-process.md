---
title: The Penetration Testing Process
published: 2024-10-07
description: 'El pentesting, o pruebas de penetración, es una práctica fundamental en ciberseguridad que simula ataques a sistemas y redes para identificar vulnerabilidades. Este post explora las etapas del proceso, las herramientas utilizadas y la importancia de los resultados para mejorar la seguridad de las organizaciones.'
image: '../../../assets/Ethical-Hacking/pentest-process.png'
tags: [EthicalHacking, Cybersecurity]
category: 'Cybersecurity'
draft: false 
---

# Introducción

El pentesting, o pruebas de penetración, es una práctica fundamental en ciberseguridad que simula ataques a sistemas y redes para identificar vulnerabilidades. Este post explora las etapas del proceso, las herramientas utilizadas y la importancia de los resultados para mejorar la seguridad de las organizaciones.

![Penetration Testing Process Yw4rf Schema](../../../assets/Ethical-Hacking/pentest-process.png)

# 1. Reconnaissance (Reconocimiento)

Esta etapa implica la recopilación de información sobre el sistema, red o aplicación objetivo antes de intentar realizar un ataque. El objetivo de la fase de reconocimiento es crear un perfil detallado del objetivo, identificar debilidades y preparar el terreno para las siguientes fases del pentesting. Se puede dividir en dos subfases: 

- **Reconocimiento pasivo**: Aquí se recopila información sin interactuar directamente con el objetivo. Esto puede incluir: Investigación de dominios, Análisis de redes sociales, Escaneo de información pública, etc.

  - **Reconocimiento activo**: En esta etapa, se interactúa directamente con el objetivo para recopilar más información. Esto puede incluir: Escaneo de redes, Enumeración de usuarios, grupos y servicios, Pruebas de vulnerabilidades, etc.

# 2. Scanning (Escaneo)

La fase de escaneo en el pentesting es una etapa en la que se utilizan diversas técnicas y herramientas para identificar dispositivos, servicios, y posibles vulnerabilidades en el objetivo. Se puede dividir en varias subfases: 

- **Escaneo de puertos**: Se utilizan herramientas como Nmap para identificar puertos abiertos en el sistema objetivo. Esto ayuda a determinar qué servicios están corriendo y qué protocolos están disponibles.
    
 - **Identificación de servicios**: Una vez que se conocen los puertos abiertos, se busca identificar los servicios y versiones específicas que están ejecutándose. Esto es importante para evaluar posibles vulnerabilidades asociadas a esos servicios.
    
-  **Enumeración**: En esta etapa, se profundiza en la recopilación de información específica sobre el sistema, como usuarios, grupos, recursos compartidos y configuraciones. Herramientas como Netcat o enum4linux se utilizan comúnmente para esta tarea.
    
 - **Escaneo de vulnerabilidades**: Se emplean herramientas automatizadas (como Nessus, OpenVAS o Qualys) para buscar vulnerabilidades conocidas en los servicios y sistemas identificados. Esto puede incluir comprobaciones de configuraciones inseguras, software desactualizado o exposiciones de seguridad.
    
 - **Mapeo de la red**: En algunos casos, se realiza un mapeo de la red para entender mejor la topología y las relaciones entre los dispositivos. Esto puede ayudar a identificar puntos de entrada adicionales o vulnerabilidades en la red.

# 4. Enumeration (Enumeración)

La enumeración es una fase que se centra en obtener información detallada y específica sobre el objetivo. En esta etapa, se busca identificar recursos, usuarios, configuraciones y cualquier otro dato que pueda ser útil para explotar vulnerabilidades. Los objetivos de está fase son la Identificación de usuarios y grupos, recopilación de recursos compartidos, detección de servicios y aplicaciones, obtención de información de configuraciones, etc. 

#### Algunas técnicas de Enumeración: 

- **Protocolos de red**: Utilizar protocolos como SNMP (Simple Network Management Protocol) o LDAP (Lightweight Directory Access Protocol) para obtener información adicional sobre dispositivos y usuarios.
    
- **Herramientas**: Se emplean herramientas como:
    - **Netcat**: Para escaneos de red y conexiones.
    - **Enum4linux**: Para obtener información de sistemas Windows.
    - **Nessus** o **OpenVAS**: Para buscar vulnerabilidades y configuraciones inseguras.

- **Escaneo de DNS**: Utilizar herramientas como `dig` o `nslookup` para obtener información sobre registros DNS, lo que puede revelar subdominios y otros recursos.

# 4. Exploitation (Explotación)

La fase de "Explotación" en el pentesting es donde se llevan a cabo los ataques reales para explotar las vulnerabilidades identificadas en las fases anteriores (reconocimiento, escaneo y enumeración). El objetivo es obtener acceso a sistemas, aplicaciones o redes. El objetivo de ganar acceso es Explotar vulnerabilidades, Escalar privilegios, tener acceso a Datos sensibles, etc.

#### Algunas técnicas de Explotación: 

- **Exploits de Aplicaciones Web**: Utilizar herramientas como Burp Suite o OWASP ZAP para realizar ataques a aplicaciones web, buscando vulnerabilidades como XSS (Cross-Site Scripting), CSRF (Cross-Site Request Forgery) y otras.
    
- **Ataques de Fuerza Bruta**: Probar múltiples combinaciones de contraseñas para acceder a cuentas, especialmente en sistemas con autenticación débil.
    
- **Ingeniería Social**: En algunos casos, los pentesters pueden usar técnicas de ingeniería social para obtener credenciales o acceso físico a un sistema.
    
- **Uso de Shells**: Implementar una shell inversa o una conexión de acceso remoto (como Metasploit) para controlar el sistema comprometido.

# 5.  Post-Exploitation (Post-Explotación)

La fase se refiere a las técnicas utilizadas para mantener el acceso a un sistema comprometido, incluso después de que se hayan cerrado las vulnerabilidades que permitieron la entrada inicial. Esta fase es crucial para demostrar cómo un atacante podría mantener un control continuo sobre un sistema y qué riesgos esto representa para una organización. Los objetivos de está fase son:  Mantener el acceso, Elevar privilegios, Movimiento lateral, Recopilación de información, Evasión de detección, Preparación para la exfiltración (Extraer datos de manera sigilosa y efectiva), borrar huellas, etc.

#### Técnicas de Persistencia:

 - **Creación de Cuentas de Usuario**: Añadir cuentas con privilegios a los sistemas, que el atacante puede utilizar para acceder posteriormente.
    
 - **Uso de Malware o Backdoors**: Instalar software malicioso que permita el acceso remoto al sistema, incluso después de un reinicio.
    
 - **Modificación de Servicios**: Configurar servicios en el sistema para que se inicien automáticamente, permitiendo el acceso cada vez que el sistema se reinicie.
    
 - **Programación de Tareas**: Utilizar tareas programadas para ejecutar scripts o comandos maliciosos a intervalos regulares.
    
-  **Explotación de Vulnerabilidades de Software**: Dejar atrás exploits que pueden ser activados en el futuro si el sistema se ve comprometido nuevamente.

#### Tipos de Escalada de Privilegios: 

1. **Escalada de Privilegios Vertical**: Implica pasar de un nivel de acceso más bajo (por ejemplo, un usuario normal) a uno más alto (por ejemplo, administrador o root).
    
2. **Escalada de Privilegios Horizontal**: Implica obtener acceso a cuentas o recursos que son iguales en nivel, pero que normalmente no están disponibles para el usuario actual.

#### Técnicas de Escalada de Privilegios:

- **Explotación de Vulnerabilidades**: Utilizar vulnerabilidades en el sistema operativo, aplicaciones o configuraciones de seguridad que permitan un acceso no autorizado a privilegios más altos. Esto puede incluir:
    - **Desbordamientos de búfer**.
    - **Inyecciones** de código.
    
- **Acceso a Credenciales**: Obtener credenciales de usuarios con privilegios más altos mediante técnicas como:
    - **Mimikatz**: Para extraer contraseñas y hashes de la memoria de sistemas Windows.
    - **Sistemas de gestión de contraseñas** mal configurados.
    
- **Configuraciones Incorrectas**: Identificar configuraciones de seguridad débiles, como permisos excesivos en archivos y directorios, que pueden ser explotados para obtener acceso.
    
- **Explotación de Políticas de Seguridad**: Aprovechar políticas de seguridad mal configuradas, como políticas de contraseñas débiles o cuentas de servicio con privilegios innecesarios.

#### Técnicas de Movimiento Lateral: 

- **Protocolo SMB (Server Message Block)**: Utilizar SMB para acceder a recursos compartidos en sistemas Windows. Esto puede incluir la explotación de credenciales almacenadas o el uso de herramientas como PsExec.
    
 - **Pass-the-Hash**: Este ataque permite a un atacante usar el hash de una contraseña en lugar de la contraseña en sí, para autenticarse en otros sistemas sin necesidad de conocer la contraseña real.
    
-  **RDP (Remote Desktop Protocol)**: Utilizar RDP para conectarse a otros sistemas en la red, a menudo aprovechando credenciales comprometidas.
    
 - **Exploits de Vulnerabilidades**: Utilizar vulnerabilidades específicas en aplicaciones o servicios de red para saltar de un sistema a otro.
    
-  **Herramientas de Post-Explotación**: Usar herramientas como Mimikatz para extraer credenciales de memoria y facilitar el acceso a otros sistemas.

#### Técnicas Comunes de Extracción de Datos

- **Acceso a Bases de Datos**: Utilizar credenciales comprometidas o vulnerabilidades en aplicaciones para acceder y extraer información de bases de datos. Esto puede incluir:
    - **Inyecciones SQL**: Para obtener datos directamente de las bases de datos.

- **Exploración de Archivos**: Navegar por el sistema de archivos en busca de archivos sensibles, como documentos, hojas de cálculo, o archivos de configuración. Esto puede incluir:
    - **Búsqueda de archivos específicos**: Como `*.sql`, `*.conf`, `*.csv`, etc.

- **Recopilación de Credenciales**: Extraer información de acceso de sistemas o aplicaciones para facilitar un acceso posterior o para comprometer otras cuentas.
    
- **Monitoreo de Tráfico de Red**: En algunos casos, se puede utilizar la captura de tráfico para recolectar datos que están siendo transmitidos a través de la red.

#### Técnicas comunes de Covering Tracks (Encubrimiento de huellas):

- **Borrado de Logs**: Eliminar o modificar registros de actividad en sistemas y aplicaciones para ocultar la presencia del atacante.

- **Uso de Herramientas de Evasión**: Emplear software que oculta la actividad del atacante o se disfraza como tráfico legítimo.

- **Modificación de Timestamps**: Alterar las marcas de tiempo en los logs para que las actividades parezcan realizadas en otros momentos.

- **Túneles y Proxies**: Usar proxies o redes privadas virtuales (VPN) para ocultar la dirección IP original y la ubicación.

- **Instalación de Rootkits**: Utilizar rootkits para obtener control sobre un sistema y ocultar la presencia de otros malware o actividades.

- **Cambio de Nombres de Archivos**: Renombrar o mover archivos que podrían ser incriminatorios o sospechosos.

# 6. Reporting (Informe)

La fase de **reporting** (informes) en el pentesting es crucial, ya que implica documentar todos los hallazgos, metodologías y recomendaciones de seguridad en un formato comprensible para el cliente. Un buen informe no solo resume el trabajo realizado, sino que también proporciona información valiosa que ayuda a la organización a mejorar su postura de seguridad. Los objetivos del informe son Documentar hallazgos, Proporcionar recomendaciones, etc.

#### Estructura Común de un Informe de Pentesting

1. **Resumen Ejecutivo**:
    
    - Breve descripción del alcance del pentesting.
    - Resumen de los hallazgos críticos y recomendaciones.
    - Enfoque en el impacto potencial en el negocio.
2. **Metodología**:
    
    - Descripción de las fases del pentesting realizadas (reconocimiento, escaneo, explotación, etc.).
    - Herramientas y técnicas utilizadas.
3. **Hallazgos Detallados**:
    
    - Vulnerabilidades identificadas con descripciones técnicas.
    - Evidencias (como capturas de pantalla o registros) que respaldan los hallazgos.
    - Clasificación de vulnerabilidades (alta, media, baja) según el riesgo que representan.
4. **Recomendaciones**:
    
    - Pasos prácticos para mitigar cada vulnerabilidad.
    - Sugerencias para mejoras generales en la seguridad.
    - Prioridades para la implementación de las recomendaciones.
5. **Conclusiones**:
    
    - Resumen de la situación de seguridad del cliente.
    - Consideraciones finales sobre la importancia de las medidas correctivas.bb

<br>
<br>

> **Disclaimer:** La información presentada en este post es únicamente con fines educativos y de divulgación. No me hago responsable del uso que se le dé a esta información ni de cualquier consecuencia derivada de su aplicación. Se recomienda encarecidamente seguir las normativas y directrices legales pertinentes en el ámbito de la ciberseguridad.
