import React,{Component} from 'react'
import ReactECharts from 'echarts-for-react'; 

export default class Pie extends Component{

  getOption = () => {
    return {
      title: {
        text: '用戶訪問來源(餅狀圖)',
        subtext: '統計',
        left: 'center'
      },
      tooltip: {
          trigger: 'item'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
      },
      series: [
        {
          name: '訪問來源',
          type: 'pie',
          radius: '50%',
          data: [
              {value: 1048, name: '搜索引擎'},
              {value: 735, name: '直接訪問'},
              {value: 580, name: '郵件營銷'},
              {value: 484, name: '聯盟廣告'},
              {value: 300, name: '視頻廣告'}
          ],
          emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
        }
      ]
    }
  }

  render(){

    return (
      <div style={{height:'100%'}}>
        <ReactECharts
          option={this.getOption()}
          style={{ height: '100%', width: '100%',paddingTop:'2%' }}
        />
      </div>
    )
  }
}