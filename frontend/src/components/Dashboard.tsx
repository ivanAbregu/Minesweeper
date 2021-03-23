import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(12, 10, 0),
    },
    django: {
      color: theme.palette.primary.main,
  },
  react: {
    color: '#61dafb',
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.content}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h1"  align='center' gutterBottom>
              Iván Abregú
            </Typography>
            <Typography component="h1" variant="h2"  align='center' gutterBottom>
              <a className={classes.django}>Django</a>
              <a> + </a>
              <a className={classes.react}>React.js</a>
            </Typography>
            <Typography component="h1" variant="h2"  align='center' gutterBottom>
              Full Stack Developer
            </Typography>
          </Container>
        </div>

      </main>
    </React.Fragment>
  );
}
