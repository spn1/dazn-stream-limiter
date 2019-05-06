# Web Stream Limiter

Node JS application to limit the number of streams a user can have active at any one time.

### Installation and Startup

 - Clone the repository
 - Run `npm install`
 - Run `npm start` to startup the application

### Usage

Running `npm start` will start the express app on localhost and the port you defined in the .env file (added to the repo for your convenience): [http://localhost:3000](http://localhost:3000). This exposes the endpoint `/stream-count/:userId`. Query this endpoint with a user id to receive a json object detailing whether that user has reached their stream limit, or if any error occurred server side.

For Example:

 - [userId=1](http://localhost:3000/stream-count/1) has 0 streams active, so this would return `limitReached=false`, indicating that they have not reached their stream limit and can open more streams.
 - [userId=2](http://localhost:3000/stream-count/2) has 3 streams active, so this would return `limitReached=true`, indicating that they have reached their stream limit and cannot open any more streams.
 - [userId=6](http://localhost:3000/stream-count/6) is not a valid user id, and so would return `limitReached=true`, indicating that a stream cannot be opened for whoever is requesting it. Something must have gone wrong, since this user does not exists, so we do not want to allow extra streams in this instance.

### Improvements

 - In a live application, I would expect the user data source to be a database, however since this was outside the scope of this task, I created a static data file which provides user data: `/src/data/users.js`
 
 - I could not fully complete the unit tests I wanted to write, specifically regarding what would happen if the user service could not get any data regarding the users (e.g. if a database connection could not be established).
 
 ### Scaleability
 
 To add scaleability to this application, I would:
 
 - Have multiple instances of the app running, and have each instance handle different requests in turn. This could be done using a Load Balancer
 
 Additionaly, async / await functions are used where possible to prevent blocking code from reducing performance.
 
