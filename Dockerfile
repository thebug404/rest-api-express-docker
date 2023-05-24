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