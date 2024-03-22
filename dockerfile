# Use official Node.js image as base
FROM node:14-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose port 5000 (or whichever port your application runs on)
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
