## Server side

### Install dependencies
```bash
cd ./server
npm install
```

### .env file
Copy the .env.sample as .env and fill up the environment variable for your personal mongodb connecttion url.

### Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a bunch of starter data for your database. 

You can run tests with "REST Client" extension. You should update the ids in the requests, see comments there.


### Nothing on Frontend yet