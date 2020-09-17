import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { RootState } from '../../source/store';

// -- Interfaces

export enum StatusChoices {
  NONE,
  INPROGRESS,
  SUCCESS,
  FAILED,
}
export interface Cell {
  id: number;
  row: number;
  column: number;
  visible: boolean;
  value: number;
  flag: boolean;
}

interface GameInterface {
  id:number;
  status: string;
  row_size: number;
  column_size: number;
  cells: Cell[];
  getGameInProgress: boolean;
}

export interface GameUpdatePayload {
  game_id: number;
  cell_id: number;
  flag?: boolean;
}

const initialState: GameInterface = {
  id:0,
  status: '',
  row_size: 0,
  column_size: 0,
  cells: [],
  getGameInProgress: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    doGetGame: (state) => {
      state.getGameInProgress = true;
    },
    doneGetGame: (state, action: PayloadAction<GameInterface>) => {
      state.id = action.payload.id;
      state.status = action.payload.status;
      state.row_size = action.payload.row_size;
      state.column_size = action.payload.column_size;
      state.cells = action.payload.cells;
      state.getGameInProgress = false;
    },
    doUpdateGame: (state, action: PayloadAction<GameUpdatePayload>) => {
      // state.getGameInProgress = true;
    },
    doneUpdateGame: (state, action: PayloadAction<GameInterface>) => {
      state.id = action.payload.id;
      state.status = action.payload.status;
      state.row_size = action.payload.row_size;
      state.column_size = action.payload.column_size;
      state.cells = action.payload.cells;
      state.getGameInProgress = false;
    },
  },
});

// -- Actions

export const {
  doGetGame,
  doneGetGame,
  doUpdateGame,
  doneUpdateGame,
} = gameSlice.actions;

// -- Selectors

export const selectGame = (state: RootState) => state.game;
export default gameSlice.reducer;
