import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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

    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '50%',
    },
    cardImg: {
      paddingTop: '100%',
      backgroundSize: '70%',
    },
    cardContent: {
      flexGrow: 1,
    },
  })
);

export default function About() {
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
        ABOUT ME
      </Box>
      <Box fontSize="h4.fontSize" m={1} className={classes.box}>
        Hi there! I am a Fullstack developer specialized in Django and React.
      </Box>
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item md={12}>
            <Card className={classes.card}>
              <CardMedia className={classes.cardMedia} image="img/f1.jpg" />
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box fontSize="h4.fontSize" m={1} className={classes.box}>
        I've always had a passion for technology and product development - even before
        becoming a developer. I use my experience to be more than just a coder,
        connecting business requirements with modern technology.
      </Box>
      <Box fontSize="h4.fontSize" m={1} className={classes.box}>
        I have 8+ years in IT, 4+ years of development experience building fullstack
        products from scratch, developing and integrating APIs, working with a variety
        of databases and clould platforms.
      </Box>
      <Box fontSize="h4.fontSize" m={1} className={classes.box}>
        Below you'll find a list of some of my skills:
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/html.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                HTML
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/css.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                CSS
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/js.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                JavaScript
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/ts.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                TypeScript
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/react.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                React
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/redux.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Redux
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/saga.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Redux-Saga
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/mui.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Material-UI
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/md.svg" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Ant Design
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/python.svg" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Python
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/django.jpg" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Django
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/drf.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Django Rest Framework
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/celery.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Celery
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/docker.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Docker
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/postgresql.svg" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                PostgreSQL
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/mongo.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                MongoDB
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/redis.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Redis
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/gunicorn.svg" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Gunicorn
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/nginx.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Nginx
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/aws.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Amazon Web Services
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/digitalocean.svg" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Digital Ocean
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/git.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                GitHub
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/gira.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Gira and Confluence
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardMedia className={classes.cardImg} image="img/jn.png" />
            <CardContent className={classes.cardContent}>
              <Typography align="center" gutterBottom variant="h5" component="h5">
                Jenkins
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
