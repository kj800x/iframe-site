# iframe-site
The iframe-site is a project to allow people to configure the contents of a screen without having to remote into it.

## Modules
There are three modules:
 - viewer: Containing the logic for the viewing page
 - server: Containing the logic for the websocket server
 - configurator: Containing the logic for the configuration page

## Installation
To install the project for development, you need to
 - run `npm install` in each of the modules
 - Go to the google api console (https://console.developers.google.com/apis)
   - Create a free project named something like iframe-site
   - Click on the menu on the left, go to credentials and create an API key and an OAuth 2.0 client ID. When you create the Oauth Client ID, add http://localhost:3001 and http://localhost:3000 as Authorized JavaScript origins.
   - create a `secrets.js` file in 'configurator/src/googleAuth' with
```
export const API_KEY = "YOUR API KEY HERE"
export const CLIENT_ID = "YOUR CLIENT ID HERE"
```
   - Click on the menu on the left, go to Library, and enable the Google+ API. (You may also need the People API, but I don't think so)
 
To run the project for development, all you have to do is to go into each of the three modules and run `npm start`

To deploy the project to a dedicated server, you should run `npm run build` in each of the react apps (viewer and configurator), and then deploy the built static files onto any standard static webserver. You also need to set up the websocket server to run, which we don't provide a standard way to do, but I'm checking in a systemd service file which you may find helpful. You also need to make sure that port 10050 is forwarded to your server from the internet.
