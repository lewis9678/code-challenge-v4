import { useAppSelector } from "@/hooks/dispatchAndSelector";
import styled from "@emotion/styled";
import { AssetList, AssetListItemProps } from "@interchain-ui/react";
import { useMemo } from "react";

function AssetListComp() {
  const { assetSet, selectedChain } = useAppSelector((state) => ({
    assetSet: state.assets.occupiedAssets,
    selectedChain: state.chain.selectedChain,
  }));

  const assetList: AssetListItemProps[] = useMemo(() => {
    const list = assetSet[selectedChain?.chain_id || ""] || [];
    return list.map((asset) => ({
      isOtherChains: false,
      imgSrc: Object.values(asset.logo_URIs || {})[0],
      symbol: asset.symbol,
      name: asset.name,
      tokenAmount: "100",
      tokenAmountPrice: "20",
      showDeposit: false,
      showWithdraw: false,
    }));
  }, [assetSet, selectedChain]);

  return (
    <Container>
      <ScrollBox>
        <AssetList needChainSpace list={assetList} />
      </ScrollBox>
    </Container>
  );
}

export default AssetListComp;

const Container = styled.div`
  width: 100%;
  margin: 50px 0 20px;
  padding: 20px;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
`;

const ScrollBox = styled.div`
  width: 100%;
  height: calc(100vh - 35vh);
  overflow-y: scroll;
`;
