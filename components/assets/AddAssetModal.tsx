import { useAppDispatch, useAppSelector } from "@/hooks/dispatchAndSelector";
import { addAssetByChainId } from "@/store/reducer/assets";
import styled from "@emotion/styled";
import {
  BasicModal,
  Box,
  Button,
  ChangeChainCombobox,
  _ComboboxOption2,
} from "@interchain-ui/react";
import { useMemo, useState } from "react";

interface AddAssetModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function AddAssetModal({ isOpen, setIsOpen }: AddAssetModalProps) {
  const [selectedAsset, setSelectedAsset] = useState<
    _ComboboxOption2 | undefined
  >(undefined);
  const { assetList, selectedChain } = useAppSelector((state) => ({
    assetList: state.assets.availableAssets,
    selectedChain: state.chain.selectedChain,
  }));
  const dispatch = useAppDispatch();

  const dropdownList: _ComboboxOption2[] = useMemo(
    () =>
      assetList.map((item) => ({
        label: item.name,
        value: item.symbol,
        iconUrl: Object.values(item.logo_URIs || {})[0],
      })),
    [assetList]
  );

  const closeHandler = () => {
    setIsOpen(false);
    setSelectedAsset(undefined);
  };

  const assetChangeHandler = (item: _ComboboxOption2 | null) => {
    if (!item) return;
    setSelectedAsset(item);
  };

  const submit = () => {
    dispatch(
      addAssetByChainId({
        chainId: selectedChain?.chain_id || "",
        assetId: selectedAsset?.value || "",
      })
    );
    closeHandler();
  };

  return (
    <BasicModal isOpen={isOpen} onClose={closeHandler} title="Add Asset">
      <Content>
        <ChangeChainCombobox
          size="md"
          valueItem={selectedAsset}
          appearance="bold"
          onItemSelected={assetChangeHandler}
          options={dropdownList}
          isClearable={false}
        />
        <Box mt={"$30"} display={"flex"} justifyContent={"center"}>
          <Button disabled={!selectedAsset} onClick={submit}>
            Add Asset
          </Button>
        </Box>
      </Content>
    </BasicModal>
  );
}

export default AddAssetModal;

const Content = styled.div`
  width: 400px;
  height: 500px;
  padding: 40px 20px;
  box-sizing: border-box;
`;
