import React from "react"
import styled from "styled-components"
import { Tile } from "../Shared/Tile"
import CoinImage from "../Shared/CoinImage"
import { AppContext } from "../App/AppProvider";

const SpotlightName = styled.h2`
  text-align: center;
`

export default () => (
  <AppContext.Consumer>
    {({ currentFavourite, coinList }) => (
      <Tile>
        <SpotlightName>{coinList[currentFavourite].CoinName}</SpotlightName>
        <CoinImage spotlight coin={coinList[currentFavourite]} />
      </Tile>
    )}
  </AppContext.Consumer>
)