import React from "react"
import highchartsConfig from "./HighchartsConfig"
import highchartsTheme from "./HighchartsTheme"
import ReactHighcharts from "react-highcharts"
import { AppContext } from "../App/AppProvider";
import { Tile } from "../Shared/Tile";
import ChartSelect from "./ChartSelect";

ReactHighcharts.Highcharts.setOptions(highchartsTheme)

export default () => (
  <AppContext.Consumer>
    {({ historical, changeChartSelect }) => (
      <Tile>
        <ChartSelect
          defaultValue={"months"}
          onChange={e => changeChartSelect(e.target.value)}
        >
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </ChartSelect>
        {historical ?
          <ReactHighcharts config={highchartsConfig(historical)} />
          : <div> Loading Historical Data </div>
        }
      </Tile>
    )}
  </AppContext.Consumer>
)