# Introduction to Docker 🐳

During the development of this practical guide, we will create an application for user registration using Node.js + MySQL.

The development will be carried out from start to finish, and during this stage, we will cover the key concepts of Docker. All of this is done with the purpose of making the guide more engaging and ensuring that the concepts are assimilated in a practical way.

The following topics will be covered:

- Requirements.
- Project setup.
- Interacting with MySQL 🐬

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
tsc --init --target esnext
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
npm i @types/node @types/express @types/morgan typescript ts-node -D
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

## Interacting with MySQL 🐬

In order to have a MySQL container running on my computer, it is necessary to download said image. To download images we execute the following command:

```bash
docker pull mysql
```

You can enter the following link https://hub.docker.com/_/mysql to get more information about the image.

Now that we have our MySQL image downloaded, it's time to run our container. To do this, run the following command:

```bash
docker run --name mysql_container -e MYSQL_ROOT_PASSWORD=my-secret-pw -d -p 3306:3306 mysql:tag
```

- `--name`: Assign a name to the container.
- `-e`: We set an environment variable.
- `-d`: Runs the database server in the background.
- `-p`: Enable a port so we can connect to the MySQL server.

### Ingresando al contenedor.

To enter the container we do it using the following command.

```bash
docker exec -it mysql_container bash
```

Well, we are already inside the container. Now, to connect to the database we enter the following command:

```bash
mysql -u root -p
```

Enter the password, and you're done. We can now create Databases, tables, enter records, etc.

### Definicion de Esquemas.

We create a Database.

```sql
CREATE DATABASE example_db;
```

We select the DB with which we want to work.

```sql
USE example_db;
```

We create the user table.

```sql
CREATE TABLE Users (
	id INT,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50),
	gender VARCHAR(50),
	age INT
);
```

Insert records into the `Users` table.

```sql
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (1, 'Georgeta', 'Eldredge', 'geldredge0@xrea.com', 'Female', 73);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (2, 'Gothart', 'Iltchev', 'giltchev1@google.pl', 'Male', 77);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (3, 'Max', 'enzley', 'menzley2@ustream.tv', 'Female', 35);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (4, 'Eugen', 'Brownsill', 'ebrownsill3@jimdo.com', 'Male', 28);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (5, 'Andria', 'Daal', 'adaal4@sciencedirect.com', 'Female', 74);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (6, 'Hollyanne', 'Dolling', 'hdolling5@google.it', 'Female', 89);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (7, 'Chickie', 'Shipton', 'cshipton6@xing.com', 'Female', 89);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (8, 'Chick', 'Beedon', 'cbeedon7@comcast.net', 'Male', 80);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (9, 'Carmelia', 'Beasley', 'cbeasley8@newsvine.com', 'Female', 18);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES (10, 'Kelcey', 'Devas', 'kdevas9@yandex.ru', 'Non-binary', 24);
```

We perform some operations to view the records in the table, view the existing tables, and view the structure of the `Users` table.

```sql
/* View all users */
SELECT * FROM USERS;

/* View all Table */
SHOW TABLES;

/* See the structure of the table. */
DESCRIBE Users;
```
