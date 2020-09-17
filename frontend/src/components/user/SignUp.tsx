import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { Alert } from '@material-ui/lab';

import { useSelector, useDispatch } from 'react-redux';

import { SignUpPayload, selectUser, doSignUp } from './userSlice';
import { Redirect, Link } from 'react-router-dom';

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
    width: '100%',
    marginTop: theme.spacing(3),
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: 'white',
  },
}));

export function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { signUpErrors, authenticated, signUpInProgress } = useSelector(selectUser);
  const { register, handleSubmit } = useForm<SignUpPayload>();
  const onSubmit = (data: SignUpPayload) => {
    dispatch(doSignUp(data));
  };
  const displayErros = () => {
    if (signUpErrors.length > 0) {
      return signUpErrors.map((item, i) => {
        return (
          <Alert key={i} severity="error">
            {item}
          </Alert>
        );
      });
    }
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
          Sign up
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
                name="password1"
                label="Password"
                type="password"
                id="password1"
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
                name="password2"
                label="Password"
                type="password"
                id="password2"
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
            disabled={signUpInProgress}
          >
            {signUpInProgress ? 'processing...' : 'sign up'}
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signin" className={classes.link}>
                <Typography>Already have an account? Sign in</Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
