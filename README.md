# Introduction to Docker 🐳

During the development of this practical guide, we will create an application for user registration using Node.js + MySQL.

The development will be carried out from start to finish, and during this stage, we will cover the key concepts of Docker. All of this is done with the purpose of making the guide more engaging and ensuring that the concepts are assimilated in a practical way.

The following topics will be covered:

- Requirements.
- Project setup.

## Requirements.

- [Node.js + NPM](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [VSCode](https://code.visualstudio.com/) (or your preferred editor)

## Project setup.

Create a folder with the desired name for your project. In my case, I will name it `rest-api-express-docker`.

```bash
mkdir rest-api-express-docker
```

Navigate into the directory.

```bash
cd rest-api-express-docker
```

Now it's time to initialize our project. To initialize a Node.js project, we need to create a file called `package.json`.

> **Note**: If you need more information about `package.json` you can visit the following link: [What is package.json?](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

```bash
npm init -y
```

In our case, we will be using [TypeScript](https://www.typescriptlang.org/) for our project, so it's necessary to generate an additional file called `tsconfig.json`

```bash
tsc --init --target next
```

At this point, your directory should look like this:

```
📦rest-api-express-docker
 ┣ 📜package.json
 ┗ 📜tsconfig.json
```

Now it's time to install the project dependencies.

```bash
npm i express mysql2 morgan
```

Next, install the [DevDependencies](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file).

```bash
npm i @types/node @types/express typescript ts-node -D
```

Create a file `src/index.ts` and add the following content.

```ts
console.log('Hello world!')
```

Open the `package.json` file and add the following `scripts`.

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

Add the following content to `tsconfig.json`

```bash
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

To verify that everything is set up correctly, execute the following commands.

```bash
npm run start:ts

npm run build

npm start
```

At this point, we have completed the initial configuration of your project.
