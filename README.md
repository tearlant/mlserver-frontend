# Frontend app for MLServer Demo


If necessary:
```
openssl req -x509 -newkey rsa:4096 -keyout localhost-key.pem -out localhost.pem -days 365 -nodes
openssl pkcs12 -export -out certificate.pfx -inkey localhost-key.pem -in localhost.pem
```

If running locally with HTTPS:
```
HTTPS=true
SSL_CRT_FILE=./localhost.pem
SSL_KEY_FILE=./localhost-key.pem
react-scripts start --server
```

Or, with a single file:
`$env:HTTPS = "true";  $env:SSL_CRT_FILE = "./localhost.pem"; $env:SSL_KEY_FILE = "./localhost-key.pem";  react-scripts start --server`

To Dockerize:
```
 docker build --no-cache --build-arg HTTPS=true --build-arg SSL_CRT_FILE=<localhost.pem> --build-arg SSL_KEY_FILE=<localhost-key.pem> --build-arg REACT_APP_API_ROOT=https://localhost:5556 --build-arg PUBLIC_URL=<server base, e.g. https://tearlant.com/plugandpl-ai> -t ml-server-frontend-prod --progress=plain .
 
 docker save -o container.tar ml-server-frontend-prod
 ```