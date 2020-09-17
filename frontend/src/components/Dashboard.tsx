import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      'text-align': 'center',
      margin: 60,
    },
    django: {
      color: theme.palette.primary.main,
      marginRight: '60px',
    },
    react: {
      color: '#61dafb',
      marginBottom: 50,
      marginLeft: '60px',
    },
  })
);

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Grid>
      <Box
        fontSize="h1.fontSize"
        fontWeight="fontWeightBold"
        m={1}
        className={classes.box}
      >
        Iván Abregú
      </Box>
      <Box fontSize="h1.fontSize" m={1} className={classes.box}>
        Full Stack
      </Box>
      <Box
        className={classes.box}
        fontSize="h1.fontSize"
        fontWeight="fontWeightBold"
        m={1}
      >
        <a className={classes.django}>Django</a>
        <a>+</a>
        <a className={classes.react}>React JS</a>
      </Box>
      <Box fontSize="h1.fontSize" m={1} className={classes.box}>
        Developer
      </Box>
    </Grid>
  );
}
