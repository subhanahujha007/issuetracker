# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Command to run the application
CMD ["npm", "start"]
