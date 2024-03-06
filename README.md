# Frontend app for MLServer Demo


If necessary:
```
openssl req -x509 -newkey rsa:4096 -keyout localhost-key.pem -out localhost.pem -days 365 -nodes
openssl pkcs12 -export -out certificate.pfx -inkey localhost-key.pem -in localhost.pem
```

```
HTTPS=true
SSL_CRT_FILE=./localhost.pem
SSL_KEY_FILE=./localhost-key.pem
react-scripts start --server
```

`$env:HTTPS = "true";  $env:SSL_CRT_FILE = "./localhost.pem"; $env:SSL_KEY_FILE = "./localhost-key.pem";  react-scripts start --server`