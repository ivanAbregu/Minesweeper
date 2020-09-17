import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      'text-align': 'center',
      color: 'white',
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
  })
);

export default function WhatIDo() {
  const classes = useStyles();
  return (
    <Grid>
      <Box
        fontSize="h2.fontSize"
        fontWeight="fontWeightBold"
        m={1}
        className={classes.box}
      >
        WHAT I DO
      </Box>
      <Box fontSize="h4.fontSize" m={1} className={classes.box}>
        Things I'm skilled at and passionate about.
      </Box>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random/800x600/?backend"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Back-End Development
                </Typography>
                <Typography>
                  Fast and engaging Back-End apps with Django that bring your ideas to
                  life.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random/800x600/?web,frontend,design"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Front-End Development
                </Typography>
                <Typography>
                  Fast, responsive and engaging Front-End apps with React.js that bring
                  your ideas to life.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random/800x600?connect,services,code"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  API Integration & Development
                </Typography>
                <Typography>
                  REST and SOAP API integration. REST API development with Django Rest
                  Framework.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random/800x600?db,database,arquitecture"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Database Design
                </Typography>
                <Typography>
                  Database architectures in PostgreSQL, MySQL, Oracle and MongoDB,
                  always aiming for performance, scale and stability.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random/800x600?cloud,sky"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Cloud Integration
                </Typography>
                <Typography>
                  Deployment of Django apps, ReactJS apps and databases to leading cloud
                  platforms such as Amazon AWS, Digital Ocean.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random/800x600?money,payment"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Payment Gateway Integration
                </Typography>
                <Typography>
                  Integration with the most popular Payment Gateways such as Stripe and
                  Paypal.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
