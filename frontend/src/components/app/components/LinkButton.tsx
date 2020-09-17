import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  path: string;
  label: string;
}

interface ButtonProps {
  match?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: (props: ButtonProps) => {
        if (props.match) return theme.palette.text.primary;
        return theme.palette.text.secondary;
      },
    },
  })
);

export default function LinkButton({ path, label }: Props) {
  const history = useHistory();
  let match = useRouteMatch({
    path: path,
    exact: true,
  });
  const classes = useStyles({'match':match});


  return (
    <Button className={classes.button}  onClick={() => history.push(path)}>
      {label}
    </Button>
  );
}
