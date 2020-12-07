# MVP - Learning Dashboard

An app to organize your online learning

## Setup

### Dependencies

Run `npm install` on the root folder to install dependencies related to Express.

`cd client` and run `npm install` to install dependencies related to React.

### Database Prep

Create a database in MySQL.

Create an `.env` file in the project directory and add

```
DB_NAME=YOUR_DATABASE
DB_PASS=YOUR_PASSWORD
```

Run `npm run migrate` in the project directory to create the tables.
Run `npm run seed` in the project directory to add seed data to the tables.

### Development

- Run `npm start` in the project directory to start the Express server on port 5000.
- `cd client` and run `npm start` to start the client server in development mode with hot reloading in port 3000.
- Client is configured so all API calls will be proxied to port 5000.

## Database Schema

![Database Schema](/database_schema.png)

## API Routes Plan

![API Routes Plan](/api_routes.png)

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
