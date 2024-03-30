# Use official Node.js image as base for building
FROM node:14-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Intermediate stage ends here
# Start the new stage for serving the built files
FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only the built files from the previous stage
COPY --from=build /usr/src/app/build ./build

# Expose port 3000 for HTTPS
EXPOSE 3000

# Set environment variables
ARG HTTPS
ARG SSL_CRT_FILE
ARG SSL_KEY_FILE
ENV HTTPS=${HTTPS}
ENV SSL_CRT_FILE=${SSL_CRT_FILE}
ENV SSL_KEY_FILE=${SSL_KEY_FILE}
ENV REACT_APP_API_ROOT=https://www.tearlant.com/mlserver/

# Copy SSL certificate files
COPY ${SSL_CRT_FILE} /etc/ssl/certs/server.crt
COPY ${SSL_KEY_FILE} /etc/ssl/private/server.key

# Install serve to serve the built files
RUN npm install -g serve

# Command to serve the built files over HTTPS
CMD ["serve", "-s", "build", "--ssl-cert", "/etc/ssl/certs/server.crt", "--ssl-key", "/etc/ssl/private/server.key"]
