# Introduction to Docker 🐳

During the development of this practical guide, we will create an application for user registration using `Node.js` + `MySQL`.

The development will be carried out from start to finish, and during this stage, we will cover the key concepts of **Docker**. All of this is done with the purpose of making the guide more engaging and ensuring that the concepts are assimilated in a practical way.

## Table of Contents

- [Introduction to Docker 🐳](#introduction-to-docker-)
  - [Table of Contents](#table-of-contents)
  - [What is Docker? 🐳](#what-is-docker-)
  - [Requirements 📋](#requirements-)
  - [Project setup ⚙️](#project-setup-️)
  - [MySQL Image 🐬](#mysql-image-)
    - [Interacting with the container](#interacting-with-the-container)
    - [Definition of Schemes](#definition-of-schemes)
  - [Creating image in Docker 🖼️](#creating-image-in-docker-️)
  - [Creating a container 📦](#creating-a-container-)
  - [Connecting containers 📡](#connecting-containers-)
  - [Configuring Docker Compose 🚀](#configuring-docker-compose-)
  - [Commands used ⌨️](#commands-used-️)

## What is Docker? 🐳

[Docker](https://docs.docker.com/get-started/overview/) allows developers to package their applications along with all of their dependencies in a container, ensuring that the application runs the same in any environment. This facilitates the portability and scalability of applications, since containers can run on any system that has Docker installed, regardless of its operating system or specific configuration.

## Requirements 📋

- [Node.js + NPM](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [VSCode](https://code.visualstudio.com/) (or your preferred editor)

## Project setup ⚙️

Clone project.

```bash
git clone https://github.com/thebug404/rest-api-express-docker.git
```

Enter project.

```bash
cd rest-api-express-docker
```

Install dependencies.

```bash
npm install
```

Open **VSCode**.

```bash
code .
```

We initialize all containers using Docker Compose.

> **Note**: If you want to quickly test the project I can run the command `docker compose up -d`. But if you are new to Docker, you can skip this part. Since it will be seen later.

```bash
docker compose up -d
```

Now, you have available the following http methods to interact with the Users API.

- `GET` http://localhost:8080/api/users
- `GET` http://localhost:8080/api/users/:userId
- `POST` http://localhost:8080/api/users
- `PUT` http://localhost:8080/api/users/:userId
- `PATCH` http://localhost:8080/api/users/:userId
- `DELETE` http://localhost:8080/api/users/:userId

> Enter the file `requests\users.http`, where all the available requests are preconfigured.

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
  id VARCHAR(36) PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  gender VARCHAR(50),
  age INT
);
```

Insert records into the `Users` table.

```sql
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('894cdd48-d76c-42da-a0c9-9b18f127de76', 'Huntlee', 'Barrows', 'hbarrows0@google.com.au', 'Male', 75);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('c3cf3141-f9ea-48b7-9f8e-bea5ee3e031e', 'Kile', 'Alvey', 'kalvey1@ameblo.jp', 'Male', 27);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('d461e2c9-75b8-4ee1-9887-c3423a35347d', 'Elfie', 'Dericot', 'edericot2@vistaprint.com', 'Bigender', 60);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('c26d1f64-8b06-4283-bbbc-94359b643050', 'Tamra', 'Matteucci', 'tmatteucci3@diigo.com', 'Female', 92);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('89683ac1-f7d1-462d-b94c-4096b89ac712', 'Kelli', 'Ekkel', 'kekkel4@columbia.edu', 'Female', 44);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('3765077a-c1c3-4df8-8730-0968aede4505', 'Caresse', 'Chiswell', 'cchiswell5@ebay.co.uk', 'Female', 66);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('e4642b95-a17a-4d84-934b-7e92cd124318', 'Joyous', 'Tunnicliffe', 'jtunnicliffe6@amazonaws.com', 'Agender', 81);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('c90bf72d-e15c-4744-9bc3-a3c728ea81f1', 'Walton', 'Paskin', 'wpaskin7@foxnews.com', 'Male', 74);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('430d6298-0938-4ee6-9dd8-598176a1cf6d', 'Suzy', 'Thurborn', 'sthurborn8@huffingtonpost.com', 'Female', 91);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('1fee7ec1-9947-4f13-adbe-0f02787329e7', 'Alia', 'O''Drought', 'aodrought9@accuweather.com', 'Female', 45);
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

## Creating image in Docker 🖼️

In Docker, an [image](https://docs.docker.com/get-started/#what-is-a-container-image) is a lightweight, self-contained package that contains everything needed to run an application, including code, system dependencies, libraries, environment variables, and configurations. A Docker image is created from a file called `Dockerfile`, which specifies step-by-step instructions for building the image.

Docker images are portable and can run on any supported Docker host, making it easy to consistently deploy and distribute applications across different environments. In addition, Docker images can be shared and stored on [Docker Hub](https://hub.docker.com/), allowing developers to quickly and easily share and download images.

To create an image in Docker it is necessary to add a `Dockerfile` file in the root of our project and paste the following content.

```Dockerfile
# Set the base image
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

Done, so far we have already created our first Image in Docker. Now is the time to get it running. Every time you are becoming more crack!

## Creating a container 📦

A [container](https://docs.docker.com/get-started/#what-is-a-container) is a runtime instance of a Docker image. You can think of a container as a lightweight, isolated environment that runs an application along with all of its dependencies, using operating system resources in an efficient manner.

One of the fundamental characteristics of Docker is that they are portable and consistent, which means that you can create a container in one environment and then run it in another without worrying about configuration differences or dependencies. This is because Docker containers encapsulate all necessary dependencies and configurations within the Docker image, ensuring that the application runs the same in any supported Docker environment.

![image_containers_docker](https://github.com/thebug404/rest-api-express-docker/assets/64434514/a59620e4-6265-471a-847b-739dd655bcd5)

> **TIP**: See images as `Classes` and containers as `Objects` or `Instances` of the class.

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

## Connecting containers 📡

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

## Configuring Docker Compose 🚀

[Docker Compose](https://docs.docker.com/compose/) is a tool that allows you to define and manage multiple Docker containers as a single service application. It provides a way to describe the configuration of services, networks, and volumes needed to run a multi-container application.

Docker Compose is based on a YAML file called `docker-compose.yml`, in which you can define **services**, **network configurations**, **volumes** and other options for your containers. This simplifies the task of running applications that require multiple interconnected services, such as web applications that depend on a database and other auxiliary services.

Create a `data.sql`

```sql
CREATE DATABASE example_db;

USE example_db;

CREATE TABLE Users (
  id VARCHAR(36) PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  gender VARCHAR(50),
  age INT
);

INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('894cdd48-d76c-42da-a0c9-9b18f127de76', 'Huntlee', 'Barrows', 'hbarrows0@google.com.au', 'Male', 75);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('c3cf3141-f9ea-48b7-9f8e-bea5ee3e031e', 'Kile', 'Alvey', 'kalvey1@ameblo.jp', 'Male', 27);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('d461e2c9-75b8-4ee1-9887-c3423a35347d', 'Elfie', 'Dericot', 'edericot2@vistaprint.com', 'Bigender', 60);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('c26d1f64-8b06-4283-bbbc-94359b643050', 'Tamra', 'Matteucci', 'tmatteucci3@diigo.com', 'Female', 92);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('89683ac1-f7d1-462d-b94c-4096b89ac712', 'Kelli', 'Ekkel', 'kekkel4@columbia.edu', 'Female', 44);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('3765077a-c1c3-4df8-8730-0968aede4505', 'Caresse', 'Chiswell', 'cchiswell5@ebay.co.uk', 'Female', 66);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('e4642b95-a17a-4d84-934b-7e92cd124318', 'Joyous', 'Tunnicliffe', 'jtunnicliffe6@amazonaws.com', 'Agender', 81);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('c90bf72d-e15c-4744-9bc3-a3c728ea81f1', 'Walton', 'Paskin', 'wpaskin7@foxnews.com', 'Male', 74);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('430d6298-0938-4ee6-9dd8-598176a1cf6d', 'Suzy', 'Thurborn', 'sthurborn8@huffingtonpost.com', 'Female', 91);
INSERT INTO Users (id, first_name, last_name, email, gender, age) VALUES ('1fee7ec1-9947-4f13-adbe-0f02787329e7', 'Alia', 'O''Drought', 'aodrought9@accuweather.com', 'Female', 45);
```

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
      - ./data.sql:/docker-entrypoint-initdb.d/data.sql
    networks:
      - mynetwork
# Define a network.
networks:
  mynetwork:
```

- `./data.sql:/docker-entrypoint-initdb.d/data.sql`: The line `./data.sql:/docker-entrypoint-initdb.d/data.sql` mounts the `./data.sql` file from your host system to the `/docker-entrypoint-initdb.d` directory inside the container, which allows you to provide a database initialization script to be executed when the container starts.

With this file we have optimized all the steps to create, run and interconnect both containers.

To execute this process we do it as follows.

```bash
docker compose up -d
```

And that's it, with these steps we already have everything configured.

## Commands used ⌨️

Download a third-party image.

```bash
docker pull <image_name>
```

Shows a table of downloaded images.

```bash
docker images
```

Shows the containers.

```bash
# In running
docker ps

# Running and detained
docker ps -a
```

Build a docker image.

```bash
docker build -t <name_container> .
```

Create a docker container.

```bash
docker run <addtional_options> <image_name>
```

> **TIP**: The last parameter must be the name of the image, otherwise you will get an error.

> **TIP**: To find out what parameters to pass when creating a container, visit the official repository image. For example, the official [MySQL](https://hub.docker.com/_/mysql) repo.

Enter a container.

```bash
docker exec -it <container_name> <terminal>

# Using bash
docker exec -it container_mysql bash

# Using sh
docker exec -it container_mysql sh
```

> **TIP**: `<terminal>` it can be `bash`, `sh` or others.

Create a docker network.

```bash
docker network create <network_name>
```

> **NOTE**: By default, the network created is of the bridge type. If you want to know other types of networks visit [Networking Overview](https://docs.docker.com/network/)

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
docker compose exec service_name bash
```

Stop the services defined in your `docker-compose.yml` file without removing the containers.

```bash
docker compose stop
```

Stops and removes the services defined in your `docker-compose.yml` file, including associated **containers**, **volumes**, and **networks**.

```bash
docker compose down
```
