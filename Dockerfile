# Stage 1: Build React app
FROM node:14-alpine AS build
WORKDIR /usr/src/app

# Set environment variables
ARG HTTPS
ARG SSL_CRT_FILE
ARG SSL_KEY_FILE
ARG REACT_APP_API_ROOT
ENV HTTPS=${HTTPS}
ENV SSL_CRT_FILE=${SSL_CRT_FILE}
ENV SSL_KEY_FILE=${SSL_KEY_FILE}
ENV REACT_APP_API_ROOT=${REACT_APP_API_ROOT}

# Print out the value of REACT_APP_API_ROOT to verify it
RUN echo "REACT_APP_API_ROOT: ${REACT_APP_API_ROOT}"

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve React app with Nginx
FROM nginx:alpine

ARG HTTPS
ARG SSL_CRT_FILE
ARG SSL_KEY_FILE
ARG REACT_APP_API_ROOT
ENV HTTPS=${HTTPS}
ENV SSL_CRT_FILE=${SSL_CRT_FILE}
ENV SSL_KEY_FILE=${SSL_KEY_FILE}
ENV REACT_APP_API_ROOT=${REACT_APP_API_ROOT}

# Print out the value of REACT_APP_API_ROOT to verify it
RUN echo "REACT_APP_API_ROOT: ${REACT_APP_API_ROOT}"

# Copy SSL certificate files
COPY ${SSL_CRT_FILE} /etc/nginx/certs/server.crt
COPY ${SSL_KEY_FILE} /etc/nginx/certs/server.key

# Copy built React app including static assets
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy Nginx configuration file with HTTPS settings
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
