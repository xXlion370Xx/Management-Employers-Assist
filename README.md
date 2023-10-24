# ConfeccionesLYZNODEJS
# Proyecto de Registro de Llegadas y Salidas de Empleados

## Descripción

Este proyecto se basa en tener un registro de las entradas y salidas de los empleados en una empresa, para no tener un registro fisico en hoja de papel y así tener un mayor control de los mismos.

## Características Destacadas

- **Seguimiento en Tiempo Real**: Nuestra aplicación permite a los empleados registrar sus llegadas y salidas de manera rápida y precisa, en tiempo real.

- **Historial Detallado**: Se genera un historial completo y detallado de las horas de trabajo de cada empleado, lo que facilita la gestión de nóminas y la toma de decisiones basadas en datos.

- **Interfaz Amigable**: Nuestro diseño intuitivo garantiza que tanto empleados como gerentes puedan utilizar la aplicación sin dificultades.

## Beneficios

- **Ahorro de Tiempo y Recursos**: Reduzca la carga de trabajo administrativo al automatizar el seguimiento de las horas laborales.

- **Precisión y Transparencia**: Elimine los errores humanos y garantice la precisión en el registro de horas.

- **Mejora de la Productividad**: Con información en tiempo real, se pueden tomar decisiones para mejorar la eficiencia laboral.

## Tecnología Utilizada

- **Lenguaje de Programación**: Utilizamos Node JS con Express para desarrollar la aplicación, aprovechando su documentación y amplio soporte.

- **Base de Datos**: Hemos implementado una base de datos MySQL para almacenar los registros de horas.

- **Interfaz de Usuario**: La interfaz de usuario está diseñada con HTML, CSS y JavaScript para garantizar una experiencia fluida.

# Instrucciones para Ejecutar el Proyecto

Sigue estos pasos para ejecutar el proyecto de manera local:

1. **Crea un archivo de configuración `.env`**: 

    - Crea un archivo llamado `.env` en la raíz del proyecto.
    - Agrega las siguientes variables de entorno al archivo `.env`:

    ```plaintext
    DB_NAME = 'nombre de la base de datos'
    DB_PASSWORD =
    DB_USER = root
    DB_HOST = localhost
    JWT_SECRET = "Clave para el Json Web Token"
    SER_PORT = 3000
    ```

    Asegúrate de llenar los valores de las variables con la información correcta, como el nombre de la base de datos y la clave para el JSON Web Token.

2. **Instala las dependencias con npm**:

    Abre una terminal en la ubicación del proyecto y ejecuta el siguiente comando para instalar las dependencias del proyecto:

    ```bash
    npm install
    ```

    Esto asegurará que todas las bibliotecas y módulos necesarios estén disponibles.

3. **Inicia el servidor de desarrollo**:

    Para ejecutar el proyecto en modo de desarrollo, utiliza el siguiente comando:

    ```bash
    npm run start-dev
    ```

    Esto iniciará el servidor en el puerto especificado (por defecto, el puerto 3000).

4. **Accede al proyecto en tu navegador**:

    Una vez que el servidor de desarrollo esté en funcionamiento, abre tu navegador web y accede al proyecto a través de la siguiente dirección:

    ```
    http://localhost:3000
    ```

    Asegúrate de utilizar el puerto correcto si has modificado la configuración en el archivo `.env`.

¡Listo! Ahora deberías tener el proyecto en funcionamiento en tu entorno local. Si necesitas realizar ajustes adicionales o configuraciones específicas, puedes dejar un mensaje.
