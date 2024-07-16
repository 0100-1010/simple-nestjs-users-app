## Description

A simple REST API app using [NestJS](https://github.com/nestjs/nest) <img src="https://nestjs.com/img/logo-small.svg" width="20" alt="Nest Logo" />

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

## Usage example

POST <http://localhost:444/users>

Body:

```bash
{
 "username": "Test user",
 "settings": {
  "receiveNotifications": true,
  "receiveEmails": false
 }
}
```

POST <http://localhost:444/posts>

Body:

```bash
{
 "userId": "6693a61d91f0a9b9262acda1",
 "title": "Test Post",
 "contents": "Lorem ipsum dolor sit amet..."
}
```
