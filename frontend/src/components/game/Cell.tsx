import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { styled } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';

import { Cell as CellInterface, doUpdateGame, selectGame } from './gameSlice';
interface Props {
  cell: CellInterface;
}
interface StatusProps {
  active: boolean;
}
const StyledTableCell = styled(TableCell)({
  border: '1px solid rgba(224, 224, 224, 1)',
  'padding-right': '16px',
  background: (props: StatusProps) => (props.active ? 'white' : 'gray'),
});
const StyledDiv = styled('div')({
  width: '25px',
  height: '25px',
  display: 'inline-block',
  color: 'black',
});
export default function Cell(props: Props) {
  const dispatch = useDispatch();
  const { id: game_id, status } = useSelector(selectGame);
  const is_playing = ['pending', 'started'].includes(status);
  const { id, visible, flag, value } = props.cell;
  const getValue = () => {
    if (flag) return '🚩';
    if (!visible) return flag ? '🚩' : null;

    if (value === -1) return '💣';

    if (value === 0) return null;

    return value;
  };

  const handleClick = (event: React.MouseEvent<unknown>, cell_id: number) => {
    if (is_playing) dispatch(doUpdateGame({ game_id: game_id, cell_id: cell_id }));
  };
  const handleOnAuxClick = (event: React.MouseEvent<unknown>, cell_id: number) => {
    event.preventDefault();
    if (is_playing)
      dispatch(doUpdateGame({ game_id: game_id, cell_id: cell_id, flag: !flag }));
  };
  return (
    <StyledTableCell
      active={visible}
      align="center"
      size="small"
      onClick={(event) => handleClick(event, id)}
      onContextMenu={(event) => handleOnAuxClick(event, id)}
    >
      <StyledDiv>{getValue()}</StyledDiv>
    </StyledTableCell>
  );
}
