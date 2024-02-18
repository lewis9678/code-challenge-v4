import { useAppDispatch } from "@/hooks/dispatchAndSelector";
import { updateAvailableAssets } from "@/store/reducer/assets";
import { assets, chains } from "chain-registry";
import { useEffect, useState } from "react";

import styled from "@emotion/styled";
import ChainComp from "@/components/assets/Chain";
import { updateChain } from "@/store/reducer/chain";
import AssetListComp from "@/components/assets/AssetList";
import AddAssetModal from "@/components/assets/AddAssetModal";

function AssetsPage() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const res = assets.find((a) => a.chain_name === "osmosis");
    if (res) dispatch(updateAvailableAssets(res.assets));
    dispatch(updateChain(chains.slice(0, 30)));
  }, []);

  return (
    <Container>
      <Title>Chain</Title>
      <ChainComp setIsOpen={setOpen} />
      <AssetListComp />
      <AddAssetModal isOpen={open} setIsOpen={setOpen} />
    </Container>
  );
}

export default AssetsPage;

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-weight: 600;
  margin-bottom: 20px;
`;
