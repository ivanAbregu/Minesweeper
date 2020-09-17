import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      'text-align': 'center',
      margin: 30,
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%',
    },
    cardContent: {
      flexGrow: 1,
    },
    djangoColor: {
      marginTop: 10,
      color: theme.palette.primary.main,
    },
    reactColor: {
      marginTop: 10,
      color: '#61dafb',
    },
  })
);

export default function Porfolio() {
  const classes = useStyles();
  const api_docs_url = `${process.env.REACT_APP_API_BASE_URL}/api/docs/`;

  return (
    <Grid>
      <Box
        fontSize="h2.fontSize"
        fontWeight="fontWeightBold"
        m={1}
        className={classes.box}
      >
        Porfolio
      </Box>
      <Box fontSize="h4.fontSize" m={1} className={classes.box}>
        I created the current website you are looking at to show you what I can do with
        Django and React.
      </Box>
      <Box fontSize="h4.fontSize" m={1} className={classes.box}>
        On MINEWEEPER Page you will be able to play the MINEWEEPER game.
      </Box>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={3} sm={3} md={6}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  align="center"
                  variant="h5"
                  component="h2"
                  className={classes.djangoColor}
                >
                  Mineweeper BackEnd
                </Typography>
                <Typography>
                  The game logic was created on Django and storage in an PostgreSQL
                  database. Each game is created and asociated per user. Also I created
                  some API REST, you can check the documentation{' '}
                  <Link color="secondary" href={api_docs_url}>
                    here
                  </Link>
                  .
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h3"
                  className={classes.djangoColor}
                >
                  Relevant technologies:
                </Typography>
                <Typography color="textSecondary">
                  <ul>
                    <li>
                      <Link color="secondary" href="https://www.docker.com/">
                        Docker
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://docs.docker.com/compose/">
                        Docker Compose
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://docs.python.org/3/">
                        Python 3.8
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://python-poetry.org/">
                        Poetry
                      </Link>
                    </li>
                    <li>
                      <Link
                        color="secondary"
                        href="https://docs.djangoproject.com/en/3.1/releases/3.0/"
                      >
                        Django 3.0
                      </Link>
                    </li>
                    <li>
                      <Link
                        color="secondary"
                        href="https://www.django-rest-framework.org/"
                      >
                        Django REST Framework
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://www.postgresql.org/">
                        PostgreSQL
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://gunicorn.org/">
                        Gunicorn
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://www.nginx.com/">
                        Nginx
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://github.com/psf/black">
                        Black
                      </Link>
                    </li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={3} sm={3} md={6}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  align="center"
                  variant="h5"
                  component="h2"
                  className={classes.reactColor}
                >
                  Mineweeper FrontEnd
                </Typography>
                <Typography>
                  This web application was created with React Hooks and TypeScript,
                  consuming the backend web services asynchronously with Redux-Sagas and
                  using Redux as state-management.
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h3"
                  className={classes.reactColor}
                >
                  Relevant technologies:
                </Typography>
                <Typography color="textSecondary">
                  <ul>
                    <li>
                      <Link color="secondary" href="https://reactjs.org/">
                        React.js
                      </Link>
                    </li>
                    <li>
                      <Link
                        color="secondary"
                        href="https://reactjs.org/docs/hooks-overview.html"
                      >
                        React Hooks
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://www.typescriptlang.org/">
                        TypeScript{' '}
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://material-ui.com/">
                        MATERIAL-UI
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://redux.js.org/">
                        Redux
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://redux-saga.js.org/">
                        Redux-Saga
                      </Link>
                    </li>
                    <li>
                      <Link color="secondary" href="https://reactrouter.com/">
                        React Router
                      </Link>
                    </li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box fontSize="h4.fontSize" m={1} className={classes.box}>
          Check the code here:{' '}
          <Link color="secondary" href="https://github.com/ivanAbregu/Minesweeper">
            https://github.com/ivanAbregu/Minesweeper
          </Link>
        </Box>
      </Container>
    </Grid>
  );
}
