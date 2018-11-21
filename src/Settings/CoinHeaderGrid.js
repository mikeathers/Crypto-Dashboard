import React from "react"
import styled from "styled-components"
import { DeleteableTile } from "../Shared/Tile";

export const CoinHeaderGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`
export const CoinSymbol = styled.div`
  justify-self: right; 
`

const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${DeleteableTile}:hover & {
    display: block;
    color: red;
  }
`

export default ({ name, symbol, topSection }) => (
  <CoinHeaderGridStyled>
    <div>{name}</div>
    {topSection ? (
      <DeleteIcon>x</DeleteIcon>
    ) : <CoinSymbol>{symbol}</CoinSymbol>}

  </CoinHeaderGridStyled>
)