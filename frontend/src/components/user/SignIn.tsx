import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link as Mlink } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';

import { useSelector, useDispatch } from 'react-redux';
import { SignInPayload, selectUser, doLogin } from './userSlice';
import { useForm } from 'react-hook-form';
import { Redirect, Link } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Mlink color="inherit" href="https://github.com/ivanAbregu/Minesweeper">
        Ivan Abregu
      </Mlink>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: 'white',
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loginError, authenticated, loginInProgress } = useSelector(selectUser);

  const { register, handleSubmit } = useForm<SignInPayload>();
  const onSubmit = (data: SignInPayload) => {
    dispatch(doLogin(data));
  };
  const displayErros = () => {
    if (loginError) return <Alert severity="error">{loginError}</Alert>;
    // if (loginError.length > 0) {
    //   return loginError.map((item, i) => {
    //     return (
    //       <Alert key={i} severity="error">
    //         {item}
    //       </Alert>
    //     );
    //   });
    // }
    return <></>;
  };
  return (
    <Container component="main" maxWidth="xs">
      {authenticated && <Redirect to={{ pathname: '/' }} />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({ required: true })}
                inputProps={{
                  maxLength: 100,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({ required: true })}
                inputProps={{
                  maxLength: 100,
                }}
              />
            </Grid>
          </Grid>
          {displayErros()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loginInProgress}
          >
            {loginInProgress ? 'processing...' : 'sign In'}
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" className={classes.link}>
                <Typography> Don't have an account? Sign Up</Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
