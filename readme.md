Run dockerized:
===

```sh
git clone https://github.com/fmb81/RTSP.git
cd RTSP
docker-compose up

grab some tea or coffee and wait...

open browser http://127.0.0.1:3000
```

Web application listens on 127.0.0.1:3000
DB:
  User: docker
  Password: docker
  DB: api
  Port: 5433

Rebuild images and run dockerized:
===

```sh
docker-compose up --build
```

Run unit tests:
===

```sh
npm i
npm test
```

Run e2e tests:
===

```sh
npm i
docker-compose up -d
npm run e2e
```