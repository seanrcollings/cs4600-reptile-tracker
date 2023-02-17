# Reptile Tracker

## Get Started
### Install the dependencies

```bash
yarn
```

### Setup

Copy the example env file
```bash
cp .env.example .env
```
The example should be sufficient for testing the endpoints.

Create DB
```bash
yarn db:setup
```

## Development
Start the server by running:

With yarn
```bash
yarn dev
```

## Production
Build the project by running

With yarn
```bash
yarn build
```

# Testing
The included Postman collection should 
describe all the implemented endpoints.

Once you create a token for your user, it should automatically 
set it as the auth header for all subsequent requests.
