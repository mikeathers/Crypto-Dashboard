import React from "react"
import styled, { css } from "styled-components"
import { AppContext } from "../App/AppProvider"
import { Tile, SelectableTile } from "../Shared/Tile"
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`
const getLowerSectionCoins = (coinList, filteredCoins) => {

  return filteredCoins ? Object.keys(filteredCoins) : Object.keys(coinList).slice(0, 100)
}

const getCoinsToDisplay = (coinList, topSection, favourites, filteredCoins) => {
  return topSection ? favourites : getLowerSectionCoins(coinList, filteredCoins)
}
export default ({ topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList, favourites, filteredCoins }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection, favourites, filteredCoins).map((coinKey, key) => (
            <CoinTile key={key} topSection={topSection} coinKey={coinKey} />
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  )
}