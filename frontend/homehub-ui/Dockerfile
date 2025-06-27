# Use official Node.js 22 image as base
FROM node:24-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose Angular dev server port
EXPOSE 4200

# Start Angular app on 0.0.0.0 so it's accessible outside container
CMD ["npm", "start"]