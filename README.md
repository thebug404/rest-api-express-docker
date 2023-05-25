# Introduction to Docker 🐳

During the development of this practical guide, we will create an application for user registration using Node.js + MySQL.

The development will be carried out from start to finish, and during this stage, we will cover the key concepts of Docker. All of this is done with the purpose of making the guide more engaging and ensuring that the concepts are assimilated in a practical way.

## Table of Contents

- [Introduction to Docker 🐳](#introduction-to-docker-)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Project setup](#project-setup)
  - [MySQL Image 🐬](#mysql-image-)
    - [Interacting with the container](#interacting-with-the-container)
    - [Definition of Schemes](#definition-of-schemes)
  - [Creating image in Docker](#creating-image-in-docker)
  - [Creating a container](#creating-a-container)
  - [Connecting containers](#connecting-containers)
  - [Configuring Docker Compose](#configuring-docker-compose)
  - [Useful commands](#useful-commands)

## Requirements

- [Node.js + NPM](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [VSCode](https://code.visualstudio.com/) (or your preferred editor)

## Project setup

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
- `POST` http://localhost:8080/api/users

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

## Creating image in Docker

In Docker, an [image] is a lightweight, self-contained package that contains everything needed to run an application, including code, system dependencies, libraries, environment variables, and configurations. A Docker image is created from a file called `Dockerfile`, which specifies step-by-step instructions for building the image.

Docker images are portable and can run on any supported Docker host, making it easy to consistently deploy and distribute applications across different environments. In addition, Docker images can be shared and stored on [Docker Hub](https://hub.docker.com/), allowing developers to quickly and easily share and download images.

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

Done, so far we have already created our first Image in Docker. Now is the time to get it running. Every time you are becoming more crack!

## Creating a container

A [container](https://docs.docker.com/get-started/#what-is-a-container) is a runtime instance of a Docker image. You can think of a container as a lightweight, isolated environment that runs an application along with all of its dependencies, using operating system resources in an efficient manner.

One of the fundamental characteristics of Docker is that they are portable and consistent, which means that you can create a container in one environment and then run it in another without worrying about configuration differences or dependencies. This is because Docker containers encapsulate all necessary dependencies and configurations within the Docker image, ensuring that the application runs the same in any supported Docker environment.

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

Create a `data.sql`

```sql
CREATE DATABASE example_db;

USE example_db;

create table Users (
	id INT,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50),
	gender VARCHAR(50),
	age INT
);

insert into Users (id, first_name, last_name, email, gender, age) values (1, 'Madison', 'Spight', 'mspight0@stanford.edu', 'Male', 57);
insert into Users (id, first_name, last_name, email, gender, age) values (2, 'Yoshiko', 'Bussy', 'ybussy1@weibo.com', 'Female', 27);
insert into Users (id, first_name, last_name, email, gender, age) values (3, 'Brandy', 'Philson', 'bphilson2@ihg.com', 'Male', 69);
insert into Users (id, first_name, last_name, email, gender, age) values (4, 'Jaquenette', 'Bohlens', 'jbohlens3@yelp.com', 'Female', 59);
insert into Users (id, first_name, last_name, email, gender, age) values (5, 'Gray', 'Lewcock', 'glewcock4@moonfruit.com', 'Male', 81);
insert into Users (id, first_name, last_name, email, gender, age) values (6, 'Peterus', 'Devall', 'pdevall5@ehow.com', 'Male', 23);
insert into Users (id, first_name, last_name, email, gender, age) values (7, 'Farly', 'Bolsteridge', 'fbolsteridge6@opera.com', 'Male', 73);
insert into Users (id, first_name, last_name, email, gender, age) values (8, 'Zonda', 'Aucott', 'zaucott7@columbia.edu', 'Female', 99);
insert into Users (id, first_name, last_name, email, gender, age) values (9, 'Waylon', 'Oxbury', 'woxbury8@forbes.com', 'Male', 50);
insert into Users (id, first_name, last_name, email, gender, age) values (10, 'Faunie', 'Moreing', 'fmoreing9@google.it', 'Female', 80);
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

## Useful commands

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
