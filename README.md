# minesweeper
Designed and implemented a RESTful API for the game minesweeper.
Also Designed a Frontend projects with React.js to consume the api and play.

## Relevant Technologies:
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/) 
* [Python 3.8](https://docs.python.org/3/)
* [Poetry](https://python-poetry.org/)
* [Django 3.0](https://docs.djangoproject.com/en/3.1/releases/3.0/)
* [Django REST framework](https://www.django-rest-framework.org/)
* [Black](https://github.com/psf/black)
* [PostgreSQL](https://www.postgresql.org/)
* [React.js](https://reactjs.org/)
* [React Hooks](https://reactjs.org/docs/hooks-overview.html)
* [reactrouter](https://reactrouter.com/)
* [Material UI](https://material-ui.com/)
* [Redux](https://redux.js.org/)
* [Redux-saga](https://redux-saga.js.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Gunicorn](https://gunicorn.org/)
* [Nginx](https://www.nginx.com/)

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