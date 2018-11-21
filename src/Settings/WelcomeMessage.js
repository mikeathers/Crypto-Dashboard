import React from "react"
import { AppContext } from "../App/AppProvider";

export default () => (
  <AppContext.Consumer>
    {({ firstVisit }) => (
      firstVisit ? (
        <div>Welcome to CrytoDash, please select your favourite coins to begin.{" "}</div>
      ) : null
    )}
  </AppContext.Consumer>
)