## Introduccion a Docker

Durante la elaboración de la guía práctica, crearemos una aplicación para registrar usuarios, la cual será desarrollada en Node.js + MySQL.

El desarrollo se llevará a cabo desde el principio hasta el final, y durante esta etapa se abordarán los conceptos clave de Docker. Todo esto se realiza con el propósito de hacer que la guía sea más amena y que los conceptos se asimilen de manera práctica.

A continuación se muestran los temas a abordar:

- Requisitos.
- Configuración del proyecto.

## Requisitos.

- [Node.js + NPM](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [VSCode](https://code.visualstudio.com/) (o tu editor de preferencia)

## Configuración del proyecto.

Creamos una carpeta con el nombre que queremos asignar a nuestro proyecto, en mi caso le pondre `rest-api-express-docker`

```bash
mkdir rest-api-express-docker
```

Ingresamos al directorio.

```bash
cd rest-api-express-docker
```

Ahora es momento de inicializar nuestro proyecto. Para inicializar un proyecto en Node.js tenemos que crear un archivo llamado `package.json`

> **Note**: Si necesitas mas informacion con respecto al `package.json` puedes visitar el siguiente enlace [What is package.json?](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

```bash
npm init -y
```

En nuestro caso estaremos usando Typescript para nuestro proyecto es necesario generar un archivo adicional llamado `tsconfig.json`

```bash
tsc --init --target next
```

Llegados a este punto su directorio deberia de lucir de esta forma:

```
📦rest-api-express-docker
 ┣ 📜package.json
 ┗ 📜tsconfig.json
```

Ahora es momento de instalar las dependencias del proyecto.

```bash
npm i express mysql2 morgan
```

Ahora instalamos las DevDependencies.

```bash
npm i @types/node @types/express typescript ts-node -D
```

Ahora creamos un archivo `src/index.ts` y agreamos el siguiente contenido.

```ts
console.log('Hello world!')
```

Ahora ingresamos al archivo `package.json` y agregamos los siguientes `scripts`.

```json
{
  // ...
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "start:ts": "ts-node src/index.ts"
  }
  // ...
}
```

Agregamos el siguiente contenido al `tsconfig.json`

```bash
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

Para comprobar que todo este configurado correctamente ejecutamos los siguientes comandos.

```bash
npm run start:ts

npm run build

npm start
```

Llegados a este punto, hemos finalizado con la configuracion inicial de tu proyecto.
