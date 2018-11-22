import React from "react"
import styled from "styled-components"

import Page from "../Shared/Page";
import PriceGrid from "./PriceGrid";
import CoinSpotLight from "./CoinSpotLight";
import PriceChart from "./PriceChart";

const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
`

export default () => (
  <Page name="dashboard">
    <PriceGrid />
    <ChartGrid>
      <CoinSpotLight />
      <PriceChart />
    </ChartGrid>
  </Page>
)