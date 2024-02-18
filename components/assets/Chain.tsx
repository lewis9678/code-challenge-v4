import { useAppDispatch, useAppSelector } from "@/hooks/dispatchAndSelector";
import { changeCurrentChain } from "@/store/reducer/chain";
import {
  Box,
  Button,
  ChangeChainCombobox,
  _ComboboxOption2,
} from "@interchain-ui/react";
import { useMemo } from "react";

interface ChainCompProps {
  setIsOpen: (isOpen: boolean) => void;
}

function ChainComp({ setIsOpen }: ChainCompProps) {
  const { chain, selectedChain } = useAppSelector((state) => state.chain);
  const dispatch = useAppDispatch();

  const valueItem = useMemo(
    () =>
      selectedChain
        ? {
            label: selectedChain.chain_name,
            value: selectedChain.chain_id,
            iconUrl: Object.values(selectedChain.logo_URIs || {})[0],
          }
        : undefined,
    [selectedChain]
  );

  const dropdownList: _ComboboxOption2[] = useMemo(
    () =>
      chain.map((item) => ({
        label: item.chain_name,
        value: item.chain_id,
        iconUrl: Object.values(item.logo_URIs || {})[0],
      })),
    [chain]
  );

  const chainChangeHandler = (item: _ComboboxOption2 | null) => {
    if (!item) return;
    const selectedChain = chain.find((c) => c.chain_id === item?.value);
    if (selectedChain) dispatch(changeCurrentChain(selectedChain));
  };

  const addAssetHandler = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={"$10"}
      >
        <ChangeChainCombobox
          size="md"
          valueItem={valueItem}
          appearance="bold"
          onItemSelected={chainChangeHandler}
          options={dropdownList}
          isClearable={false}
          containerProp={{
            style: {
              width: "400px",
            },
          }}
        />
        <Button disabled={!selectedChain} onClick={addAssetHandler}>
          Add Asset
        </Button>
      </Box>
    </div>
  );
}

export default ChainComp;
