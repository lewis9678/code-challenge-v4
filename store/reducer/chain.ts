import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chain } from "@chain-registry/types";

interface ChainProps {
  chain: Chain[];
  selectedChain: Chain | null;
}

const init_state: ChainProps = {
  chain: [],
  selectedChain: null,
};

export const ChainSlice = createSlice({
  name: "chain",
  initialState: init_state,
  reducers: {
    updateChain: (state: ChainProps, action: PayloadAction<Chain[]>) => {
      state.chain = action.payload;
    },
    changeCurrentChain: (state: ChainProps, action: PayloadAction<Chain>) => {
      state.selectedChain = action.payload;
    },
  },
});

export const { updateChain, changeCurrentChain } = ChainSlice.actions;

export default ChainSlice.reducer;
