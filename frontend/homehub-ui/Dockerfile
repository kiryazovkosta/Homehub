# Use official Node.js image
FROM node:24-alpine

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Expose Angular dev server port
EXPOSE 4200

# Start Angular development server
CMD ["ng", "serve", "--host", "0.0.0.0"]