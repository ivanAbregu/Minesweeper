# minesweeper-API
API test
Designed and implemented a RESTful API for the game minesweeper.
Also Designed a Frontend projects with React.js to consume the api and play.

## Relevant Technologies:
* Docker
* Docker Compose
* Django
* Django REST framework
* JWT
* Rest Auth
* Postgresql
* React.js
* React Hooks
* Gunicorn
* Nginx

## Run on local machine
Run the next command to run the projects on your local machine.

* docker-compose up

* Then you could consume the api on http://0.0.0.0:8000
Also you could play on the react implementation http://0.0.0.0:3000

## Features:
* When a cell with no adjacent mines is revealed, all adjacent squares will be revealed (and repeat)
* Ability to 'flag' a cell with a question mark or red flag
* Detect when game is over
* Persistence
* Ability to start a new game and preserve/resume the old ones
* Ability to select the game parameters: number of rows, columns, and mines
* Ability to support multiple users/accounts
