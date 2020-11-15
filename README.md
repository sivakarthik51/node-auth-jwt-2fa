# Node Authentication with JWT and 2FA
This is a template Repository for authentication with Node using Mongo DB as a store. JWT token can be used for the authentication to API as well as  Web Application. The two factor authentication has to be configured on an authenticator App.

## Running the code

### Setup Database
Create a `.env` file in the root directory with parameters `DB_CONNECT` pointing to MongoDB instance and `TOKEN_SECRET` as the secret to be used for JWT  

### Node
Install Dependancies  `npm install`
Run the Code in developer mode `npm run start-dev` 
Run Code in Production `npm run start`

## Technology used
* JSON Web Token
* Mongo DB
* speakeasy (for 2FA) 