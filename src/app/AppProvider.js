import React from "react"
import cc from "cryptocompare"
import _ from "lodash"
import moment from "moment"

export const AppContext = React.createContext();

const MAX_FAVOURITES = 10;
const TIME_UNITS = 10;

export class AppProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: "dashboard",
      favourites: ["BTC", "ETH", "XMR", "DOGE"],
      timeInterval: "months",
      filteredCoins: "",
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavourites: this.isInFavourites,
      confirmFavourites: this.confirmFavourites,
      setFilteredCoins: this.setFilteredCoins,
      setCurrentFavourite: this.setCurrentFavourite,
      changeChartSelect: this.changeChartSelect,
    }
  }

  componentDidMount() {
    this.fetchCoins()
    this.fetchPrices();
    this.fetchHistorical();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList })
  }

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    this.setState({ prices })
  }
  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let results = await this.historical();
    let historical = [
      {
        name: this.state.currentFavourite,
        data: results.map((ticker, index) => [
          moment().subtract({ [this.state.timeInterval]: TIME_UNITS - index }).valueOf(),
          ticker.GBP
        ])
      }
    ]
    this.setState({ historical })
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

  historical = () => {
    let promises = []
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(this.state.currentFavourite, ["GBP"], moment().subtract({ [this.state.timeInterval]: units }).toDate()
        )
      )
    }
    return Promise.all(promises);
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
    let currentFavourite = this.state.favourites[0]
    this.setState({
      firstVisit: false,
      page: "dashboard",
      currentFavourite,
      prices: null,
      historical: null,
    }, () => {
      this.fetchPrices()
      this.historical()
    })
    localStorage.setItem("cryptoDash", JSON.stringify({
      favourites: this.state.favourites,
      currentFavourite,
    }))
  }

  setCurrentFavourite = (sym) => {
    this.setState({ currentFavourite: sym, historical: null }, this.fetchHistorical)
    localStorage.setItem("cryptoDash", JSON.stringify({
      ...JSON.parse(localStorage.getItem("cryptoDash")),
      currentFavourite: sym
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
    let { favourites, currentFavourite } = cryptoDashData;
    return {
      favourites,
      currentFavourite
    }
  }

  setPage = (page) => this.setState({ page })

  setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins })

  changeChartSelect = (value) => {
    console.log(value)
    this.setState({ timeInterval: value, historical: null }, this.fetchHistorical)
  }


  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }

}