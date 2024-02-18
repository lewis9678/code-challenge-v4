import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Asset } from "@chain-registry/types";

interface AssetsProps {
  availableAssets: Asset[];
  occupiedAssets: { [key: string]: Asset[] };
}

const init_state: AssetsProps = {
  availableAssets: [],
  occupiedAssets: {},
};

export const AssetsSlice = createSlice({
  name: "assets",
  initialState: init_state,
  reducers: {
    updateAvailableAssets: (state, action: PayloadAction<Asset[]>) => {
      state.availableAssets = action.payload;
    },
    addAssetByChainId: (
      state,
      action: PayloadAction<{ chainId: string; assetId: string }>
    ) => {
      const { availableAssets } = state;
      const { chainId, assetId } = action.payload;
      const selectedAssetIndex = availableAssets.findIndex(
        (a) => a.symbol === assetId
      );

      if (selectedAssetIndex === undefined) return;
      const asset = availableAssets.splice(selectedAssetIndex, 1)[0];

      if (!state.occupiedAssets[chainId]) {
        state.occupiedAssets[chainId] = [];
      }
      state.occupiedAssets[chainId].push(asset);
    },
  },
});

export const { updateAvailableAssets, addAssetByChainId } = AssetsSlice.actions;

export default AssetsSlice.reducer;
