import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Confetti from 'react-confetti';

import { useSelector, useDispatch } from 'react-redux';
import { selectGame, doGetGame } from './gameSlice';

import Cell from './Cell';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      height: '700px',
      textAlign: 'center',
    },
    tableContainer: {
      height: '700px',
      backgroundColor: 'gray',
    },
    container: {
      marginTop: 10,
    },
    containerCI: {
      backgroundColor: 'gray',
      'margin-block-start': '35%',
    },
    containerButtonGroup: {
      marginTop: theme.spacing(3),
      textAlign: 'center',
      width: '100%',
    },
    box: {
      'text-align': 'center',
      color: 'white',
      margin: 2,
      height: '80px',
    },
  })
);

export default function SimpleTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { status, cells, row_size, column_size, getGameInProgress } = useSelector(
    selectGame
  );
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });
  useEffect(() => {
    if (status == '') dispatch(doGetGame());
  }, []);

  function handleOnClick(size: number) {
    switch (size) {
      case 1:
        dispatch(doGetGame());
        break;
      case 2:
        dispatch(doGetGame());
        break;
      case 3:
        dispatch(doGetGame());
        break;
      default:
        dispatch(doGetGame());
        break;
    }
  }

  function getCell(row: number, col: number) {
    let cell = cells.find((cell) => cell.row === row && cell.column === col);
    if (cell === undefined) return <></>;
    return <Cell cell={cell} />;
  }

  function getRow(row: number) {
    let result = [];
    for (let col = 0; col < column_size; col++) {
      result.push(getCell(row, col));
    }
    return result;
  }
  function success() {
    let text = '';
    if (status == 'win'){
      text = 'You Win!';
    }else if(status == 'lost')
      text = 'You Lost :(';

    return <Box
          fontSize="h2.fontSize"
          fontWeight="fontWeightBold"
          m={1}
          className={classes.box}
        >
          {text}
          {status == 'win' && <Confetti width={width} height={height} numberOfPieces={450} />}
        </Box>
  }

  function renderBoard() {
    if (getGameInProgress)
      return (
        <Container className={classes.containerCI}>
          <CircularProgress />
        </Container>
      );
    let result = [];
    for (let row = 0; row < row_size; row++) {
      result.push(<TableRow key={row}>{getRow(row)}</TableRow>);
    }
    return result;
  }

  return (
    <Container component="main" maxWidth="md" className={classes.container}>
      {success()}
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableBody>{renderBoard()}</TableBody>
        </Table>
      </TableContainer>
      <Container className={classes.containerButtonGroup}>
        <Button
          variant="contained"
          color="primary"
          disabled={getGameInProgress}
          onClick={() => handleOnClick(1)}
        >
          Restart
        </Button>
        {/* <ButtonGroup variant="contained" color="primary">
          <Button disabled={getGameInProgress} onClick={() => handleOnClick(1)}>
            easy
          </Button>
          <Button disabled={getGameInProgress} onClick={() => handleOnClick(2)}>
            medium
          </Button>
          <Button disabled={getGameInProgress} onClick={() => handleOnClick(3)}>
            hard
          </Button>
        </ButtonGroup> */}
      </Container>
    </Container>
  );
}
