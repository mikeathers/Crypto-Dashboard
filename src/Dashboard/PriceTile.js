import React from "react"
import styled, { css } from "styled-components"
import { SelectableTile } from "../Shared/Tile"
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid"
import { AppContext } from "../App/AppProvider";

const numberFormat = (number) => {
  return +(number + "").slice(0, 7);
}
const JustifyRight = styled.div`
  justify-self: right;
`
const JustifyLeft = styled.div`
  justify-self: left;
`
const TickerPrice = styled.div`
  ${fontSizeBig}
`
const ChangePct = styled.div`
  color: green;
  ${props => props.red && css`
    color: red;
  `}
`
const PriceTileStyled = styled(SelectableTile)`
  ${props => props.compact && css`
    display: grid;
    ${fontSize3};
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    justify-items: right;
  `}

  ${props => props.currentFavourite && css`
    ${greenBoxShadow};
    pointer-events: none;  
  `}
`
const ChangePercent = ({ data }) => (
  <JustifyRight>
    <ChangePct red={data.CHANGEPCT24HOUR < 0}>
      {numberFormat(data.CHANGEPCT24HOUR)}%
    </ChangePct>
  </JustifyRight>
);

const PriceTile = ({ sym, data, currentFavourite, setCurrentFavourite }) => {
  console.log(currentFavourite)
  return (
    <PriceTileStyled currentFavourite={currentFavourite} onClick={setCurrentFavourite}>
      <CoinHeaderGridStyled>
        <div> {sym} </div>
        <ChangePercent data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>
        £{numberFormat(data.PRICE)}
      </TickerPrice>
    </PriceTileStyled>
  )
}

const PriceTileCompact = ({ sym, data, currentFavourite, setCurrentFavourite }) => (
  <PriceTileStyled compact currentFavourite={currentFavourite} onClick={setCurrentFavourite}>
    <JustifyLeft>{sym}</JustifyLeft>
    <ChangePercent data={data} />
    <div>
      £{numberFormat(data.PRICE)}
    </div>
  </PriceTileStyled>
)
export default ({ price, index }) => {

  let sym = Object.keys(price)[0];
  let data = price[sym]["GBP"];
  let TileClass = index < 5 ? PriceTile : PriceTileCompact
  return (
    <AppContext.Consumer>
      {({ currentFavourite, setCurrentFavourite }) => (
        <TileClass
          sym={sym}
          data={data}
          currentFavourite={currentFavourite === sym}
          setCurrentFavourite={() => setCurrentFavourite(sym)}
        />
      )}
    </AppContext.Consumer>

  )
}