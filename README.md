# HSL-Backend-APP

## Welcome to HSl Backend Application.

Frontend: [Frontend Repository](https://github.com/Ahmad-Imam/HSL-Frontend-APP)

## Backend Information

The project is hosted in Heroku and it is containerized using Docker. The backend is developed in NodeJS using one journey dataset and station dataset given in the [exercise github](https://github.com/solita/dev-academy-2023-exercise)

## Backend Instructions

1. Clone the project
2. Install node and npm in your local machine
3. run - npm install
4. run - npm start
5. You can change the port number in index.js file by changing the value of port. Remember the port number for frontend.
6. The backend is also hosted in Heroku so no need to run locally for FrontEnd.

## Docker Instructions

1. Install docker on your computer
2. Open docker desktop
3. run docker build . -t appName in the root directory of the project
4. run docker run appName

## Backend Features

1. 6 different endpoints

2. GET / shows all the journey included in the 2021-05.csv file. For clarification 2021-05.csv is the first csv file about journey information given in the exercise github (https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv).

3. POST /JourneyListByPage shows 1000 journeys based on the pageNumber in request body. The data is validated before sending as a response. Journeys that lasted for less than ten seconds and Journeys that covered distances shorter than 10 meters are not sent.

4. POST /StationList shows all the station information included in the Helsingin_ja_Espoon_kaupunkipyöräasemat_avoin.csv file. It is the dataset about station information given in the exercise github. (https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv). Data is validated before sending as a response.

5. POST /NewJourney creates new journey entry sent from frontend and writes them to the 2021-05.csv file. A sample valid journey information in request body looks like this:

{
"departureDate": "2014-05-31T23:57:25",
"returnDate": "2016-06-22T13:17:21+0000",
"departureId": "10",
"departureName": "Dname",
"returnId": "10",
"returnName": "Rname",
"coverDistance": "10",
"duration": "100"
}

6. POST /NewStation creates new station entry sent from frontend and writes them to the Helsingin_ja_Espoon_kaupunkipyöräasemat_avoin.csv file. A sample valid journey information in request body looks like this:

{
"fid": "1",
"id": "1",
"nimi": "sample nimi",
"namn": "sample namn",
"name": "sample name",
"osoite": "sample osoite",
"address": "sample address",
"kaupunki": "sample kaupunki",
"stad": "sample stad",
"operaatto": "sample operaatto",
"kapasiteet": "sample kapasiteet",
"x": "1.1",
"y": "1.1"
} 7. POST /FilterJourney is used for filtering journey information based on a selected station in the FrontEnd. A sample valid request body looks like this:
{
"nimi": "Teljäntie"
}

## Backend Testing

- run npm test
- - Testing framework: Mocha,Chai.

The tests are mainly written for all the journey/station endpoints to see if they return a valid response. Returns response status 400 if invalid data found in request body of those endpoints. Returns 200 for success.

## Application Information

The application consists of a separate frontend and backend repository.

- Technology: Frontend: Flutter, Backend: NodeJS, Docker, Heroku

- The frontend is designed as a mobile application and contains an apk in the repository to install. Unfortunately it is not possible to run the application in ios device as I do not have access to an iphone but incase of ios it will use the same codebase by using the power of cross-platform development in flutter.

- The backend is written in NodeJs and it needs the installation of npm and node to run the backend. The backend is containerized and it is also hosted in Heroku.

## Application Features

- Users can view all the journey information from the first dataset given in the exercise github. Scroll to bottom to see more journeys as they are loaded.

- Users can view all the station information from the dataset given in the exercise github. Scroll top to bottom to see all the stations. All of them are in a pagination.

- Click on one station from the list to see information about a specific station which includes location on the map, station name, address, total number of journeys starting from the station, total number of journeys ending at the station, the average distance of a journey starting from the station, the average distance of a journey ending at the station.

- Add new journey information by filling up the information required.

- Add new station information by filling up the information required.
