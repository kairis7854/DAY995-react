import axios from 'axios'

//獲取天氣
export const reqWeather = async()=> {
  let res = await axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-A51857CD-196A-466A-9BA1-1F8324410397&format=JSON&elementName=Wx`)
  const {value}= res.data.records.locations[0].location[5].weatherElement[0].time[0].elementValue[0]
  return value
}

