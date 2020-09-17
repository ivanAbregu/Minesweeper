import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';
import { SignInPayload, selectUser, doLogin } from './user/userSlice';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      'text-align': 'center',
      margin: 60,
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  })
);

export default function Contact() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loginInProgress } = useSelector(selectUser);
  const { register, handleSubmit } = useForm<SignInPayload>();
  const onSubmit = (data: SignInPayload) => {
    dispatch(doLogin(data));
  };
  const displayErros = () => {
    // if (signInErrors.length > 0) {
    //   return signInErrors.map((item, i) => {
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
    <Grid>
      <Box
        fontSize="h1.fontSize"
        fontWeight="fontWeightBold"
        m={1}
        className={classes.box}
      >
        Contact me
      </Box>
      <Box fontSize="h4.fontSize" m={1} className={classes.box}>
        I'd love to hear from you.
      </Box>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
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
                  rows={10}
                  rowsMax={10}
                  multiline
                  required
                  fullWidth
                  name="message"
                  label="message"
                  type="message"
                  id="message"
                  inputRef={register({ required: true })}
                  inputProps={{
                    maxLength: 500,
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
              // disabled={signInInProgress}
              disabled={true}
            >
              {loginInProgress ? 'sending...' : 'send message'}
            </Button>
          </form>
        </Paper>
      </main>
    </Grid>
  );
}
