istrav.dev
========

## Production
```bash
# firewall
$ sudo ufw allow 8888/tcp
$ sudo ufw reload

# start
$ PORT=8888 pm2 start server/dist/main.js -i 1 --update-env --name="istrav.dev"

# stop
$ pm2 stop server/dist/main.js --name="istrav.dev"

# logs
$ pm2 logs istrav.dev

# delete
$ pm2 delete istrav.dev

# list
$ pm2 status

# Generate Startup Script
$ pm2 startup

# Freeze your process list across server restart
$ pm2 save

# Remove Startup Script
$ pm2 unstartup

# after a code change
$ pm2 reload all
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
