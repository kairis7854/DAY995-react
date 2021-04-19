import React,{Component} from 'react'
import ReactECharts from 'echarts-for-react'; 

export default class Pie extends Component{

  getOption = () => {
    return {
      legend: {},
      tooltip: {},
      dataset: {
          source: [
              ['年度','2020','2021'],
              ['筆電', 43.3, 85.8, 93.7,91.2],
              ['手機', 83.1, 73.4, 55.1,66.2],
              ['螢幕', 86.4, 65.2, 82.5,70.3],
              ['顯卡', 72.4, 53.9, 39.1,62.1]
          ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
          {type: 'bar'},
          {type: 'bar'},
      ]
    }
  }

  render(){

    return (
      <div style={{height:'100%',textAlign:'center',fontSize:20}}>
        年銷售對照
        <ReactECharts
          option={this.getOption()}
          style={{ height: '80%', width: '100%',paddingTop:'2%' }}
        />
      </div>
    )
  }
}