
# LawnShop Starting Repo
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).


## Use the Template for This Repository (Don't Clone)

- Don't Fork or Clone. Instead, click the `Use this Template` button, and make a copy to your personal account. Make the project `PUBLIC`!


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `lawnshop` and create a `user` table:

Use the create table script in the database.sql to set up the database, there are example of insert into statments provided in the script which will help in setting up the application for first time use. Due the nature of this project working with data which has defined start and end dates as well as geographic data sample data to include addresses and dates will need to be configured in order to view features in the application. 

If you would like to name your database something else, you will need to change `lawnshop` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  REACT_APP_GOOGLE_API_KEY=yourgoogleapikey
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## funcationality and purpose 

The goal of lawnshop is to provide a site for garage sale shoppers and hosters to advertise current sales as well as 
item they would like to feature at these sales, and for shoppers to be able to search there local area to find the percise location and times of these garage sales. There will be future advancements to application which will utilize the google routing api to take sales selected by the user and provide the best driving route to them via gps directions sent to their phone. There will also be GIS feature class overlays provided to add map layers to show stats which will be benificial for 
those shoppers trying to narrow down their search to the best possible areas. 

## Technical difficults while devoloping 

Building this app using google api's limited some of the funtionality intially desired. With more funding this app could be 
built using the arcgis js api to provide better map functionality as well as routing services in an all in one setup. 

The intial build of the this applicaiton did not geocode address as they were registred by the user, but instead would geocode all address provided by the database queries each time the applicaiton was loaded. this had to be changed due to excessive request made to the google geocoding api, and in a few short mins generated over 4 dollars worth of api charges. 

Googles routing api does not seem to provide best route calculations but instead provides routing to address which are next in the selected list provided to the services. This is not the disired output, and development was placed on hold. Using GIS tech and the least cost path method would result in a betters solution to this. QGIS could be used as a free alternative but ESRI would be recommend to additional intergration to app functionality.

## how to use

login / register for your account. ( account set will create entires in the database with names and address, as well as geocode your address for lat long values to be used in the base map of the application)

home page - the home page is a map view centered on your addresses location, you will be able to see all sales in your current area from this view. 
--by selection a sale you will add that sales to an array or sales you would like to visit, these values can be removed by the delete function next to their values. when selected the sales will show as selected in text on the main map. there is also a generate route function which at this moment is currently not configured but will in later iterations generate gps routes to all selected sales. 

--add sales
in the header there is a link to add sales. this page is where all new sales can be entered by the user. Required for sales is a start date and end date, will error out if the end is before the start date. once submitted a card will appear with that new sale, and a button to edit or add items. when clicked a module will open on the page, you can add items, descriptions and prices for any items you would like to feature. from this page you can also edit these items with edit item button, and edit dates by changing the values and hitting submit edits. 
