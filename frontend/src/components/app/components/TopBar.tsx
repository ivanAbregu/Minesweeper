import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import LinkButton from './LinkButton';

import { useSelector, useDispatch } from 'react-redux';

import {
  selectUser,
  doSignOut,
} from '../../user/userSlice'; 

export default function TopBar() {
  const dispatch = useDispatch();
  const {authenticated} = useSelector(selectUser);
  return (
    <React.Fragment>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Container>
            <LinkButton path="/" label="home" />
            <LinkButton path="/what-i-do" label="what i do" />
            <LinkButton path="/portfolio" label="portfolio" />
            <LinkButton path="/about" label="about" />
            <LinkButton path="/game" label="mineweeper" />
            <LinkButton path="/contact" label="contact" />
          </Container>
          {authenticated && <Button onClick={(event) => dispatch(doSignOut())}>LogOut</Button>}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
