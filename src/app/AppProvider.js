import React from "react"
import cc from "cryptocompare"
import _ from "lodash"

export const AppContext = React.createContext();
const MAX_FAVOURITES = 10;

export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: "dashboard",
      favourites: ["BTC", "ETH", "XMR", "DOGE"],
      filteredCoins: "",
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavourites: this.isInFavourites,
      confirmFavourites: this.confirmFavourites,
      setFilteredCoins: this.setFilteredCoins,
    }
  }

  componentDidMount() {
    this.fetchCoins()
    this.fetchPrices();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList })
  }

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    console.log(prices)
    this.setState({ prices })
  }

  prices = async () => {
    let returnData = [];
    for (const fav of this.state.favourites) {
      try {
        let priceData = await cc.priceFull(fav, "GBP");
        returnData.push(priceData);
      } catch (e) {
        console.warn("Fetch price error: ", e)
      }
    }
    return returnData;
  }

  addCoin = (key) => {
    let favourites = [...this.state.favourites];
    if (favourites.length < MAX_FAVOURITES) {
      favourites.push(key)
      this.setState({ favourites })
    }
  }

  removeCoin = (key) => {
    let favourites = [...this.state.favourites];
    this.setState({ favourites: _.pull(favourites, key) })
  }

  isInFavourites = (key) => _.includes(this.state.favourites, key)

  confirmFavourites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard"
    }, () => {
      this.fetchPrices()
    })
    localStorage.setItem("cryptoDash", JSON.stringify({
      favourites: this.state.favourites
    }))
  }

  savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return {
        page: "settings",
        firstVisit: true
      }
    }
    let { favourites } = cryptoDashData;
    return {
      favourites
    }
  }

  setPage = (page) => this.setState({ page })

  setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins })


  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }

}