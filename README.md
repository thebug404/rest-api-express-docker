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
npm i express mysql2 morgan dotenv
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

## MySQL Image 🐬

In order to have a MySQL container running on my computer, it is necessary to download said image. To download images we execute the following command:

```bash
docker pull mysql
```

You can enter the following link https://hub.docker.com/_/mysql to get more information about the image.

Now that we have our MySQL image downloaded, it's time to run our container. To do this, run the following command:

```bash
docker run --name mysql_container -e MYSQL_ROOT_PASSWORD=mysqlpw -d -p 3306:3306 mysql
```

- `--name`: Assign a name to the container.
- `-e`: We set an environment variable.
- `-d`: Runs the database server in the background.
- `-p`: Enable a port so we can connect to the MySQL server.

### Interacting with the container

To enter the container we do it using the following command.

```bash
docker exec -it mysql_container bash
```

Well, we are already inside the container. Now, to connect to the database we enter the following command:

```bash
mysql -u root -p
```

Enter the password, and you're done. We can now create Databases, tables, enter records, etc.

### Definition of Schemes

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

## Creando una imagen en Docker

Image building is fairly easy in Docker, just define a `Dockerfile` and specify the instructions to build the image.

To create an image in Docker it is necessary to add a `Dockerfile` file in the root of our project and paste the following content.

```Dockerfile
# set the base image
FROM node:18

# Set the working directory to the image
WORKDIR /usr/src/app

# Copy the file package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port the server is running on
EXPOSE 8080

# Set the container startup command
CMD ["npm", "start"]
```

Ok, now it's time to create our image.

```bash
docker build -t rest-api-express-docker .
```

- `-t`: Add a label to our image.

> **Note**: This action can take several minutes.

Now if we execute the following command, we can see that our image is already in our Docker image list.

```bash
docker images
```

To create a container in docker we do it as follows.

```bash
docker run --name container_express_docker -d -p 8080:8080 \
-e PORT=8080 \
-e MYSQL_HOST=localhost \
-e MYSQL_PORT=3306 \
-e MYSQL_USER=root \
-e MYSQL_PASSWORD=mysqlpw \
-e MYSQL_DATABASE=example_db \
rest-api-express-docker
```

When you try to access the path http://localhost:8080/api/users in your application, it may cause an error or an execution interruption. This occurs because the container hosting your application is unaware of the MySQL container host, which prevents a successful connection between them from being established.

To solve this problem, you can use the concept of networks in Docker.

## Connecting containers

A [network in Docker](https://docs.docker.com/network/) is an isolated environment that enables communication between containers. By putting both containers on the same network, they will be able to interact with each other.

By connecting the containers to the same network, the application container will be able to communicate with the MySQL container using the container name or service name (if you are using Docker Compose) instead of using localhost or IP addresses.

This will allow the application to successfully access the MySQL container over the network, solving the connection problem.

Create a Docker network:

```bash
docker network create mynetwork
```

Remove all created containers.

```bash
docker rm -f $(docker ps -aq)
```

Run the MySQL container connected to the created network:

```bash
docker run --name mysql_container --network mynetwork -e MYSQL_ROOT_PASSWORD=mysqlpw -d -p 3306:3306 mysql
```

> **Note**: You need to go into the `mysql_container` container and create the database, tables and insert the data again.

Run the Express server container connected to the same network:

```bash
docker run --name container_express_docker \
--network mynetwork \
-d \
-p 8080:8080 \
-e PORT=8080 \
-e MYSQL_HOST=mysql_container \
-e MYSQL_PORT=3306 \
-e MYSQL_USER=root \
-e MYSQL_PASSWORD=mysqlpw \
-e MYSQL_DATABASE=example_db \
rest-api-express-docker
```

In this example, we have created a custom network called `mynetwork` using the `docker network create` command. Then, when running the containers, we use the `--network` option to connect them to the `mynetwork` network. Also, we have set `MYSQL_HOST=container_mysql` on the Express server container so that it connects to the MySQL container using the container name as the host.

As you can see, the process of configuring to be able to connect both containers is quite a tedious process, since we have to execute several commands to make this possible. That is why Docker offers us a way to optimize this whole process through `Docker Compose`.

## Configuring Docker Compose

[Docker Compose](https://docs.docker.com/compose/) is a tool that allows you to define and manage multiple Docker containers as a single service application. It provides a way to describe the configuration of services, networks, and volumes needed to run a multi-container application.

Docker Compose is based on a YAML file called `docker-compose.yml`, in which you can define **services**, **network configurations**, **volumes** and other options for your containers. This simplifies the task of running applications that require multiple interconnected services, such as web applications that depend on a database and other auxiliary services.

Create a `docker-compose.yml` file in the root of the project and add the following content.

```yml
version: '3'
services:
  # First service: Node.js server.
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 8080:8080
    environment:
      - PORT=8080
      - MYSQL_HOST=db
      - MYSQL_PORT=3306
      - MYSQL_USER=root
      - MYSQL_PASSWORD=mysqlpw
      - MYSQL_DATABASE=example_db
    depends_on:
      - db
    networks:
      - mynetwork
  # Second service: MySQL server.
  db:
    image: mysql:latest
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: mysqlpw
    volumes:
      - ./data:/var/lib/mysql
    networks:
      - mynetwork
# Define a network.
networks:
  mynetwork:
```

With this file we have optimized all the steps to create, run and interconnect both containers.

To execute this process we do it as follows.

```bash
docker compose up -d
```

> **Note**: It is necessary to create the database, tables and the insertion of records.

And that's it, with these steps we already have everything configured.

## Highlights

Delete all containers.

```bash
docker rm -f $(docker ps -aq)
```

Stop all containers.

```bash
docker stop $(docker ps -aq)
```

Remove all images.

```bash
docker rmi $(docker images -a -q)
```

Interact with a service made with Docker compose.

```bash
docker-compose exec service_name bash
```
