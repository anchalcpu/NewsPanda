import React, { Component } from 'react'
import dayImg  from '../static/weather.jpg'
import nightImg  from '../static/night.png'


export default class Weather extends Component {
  
    state = {
        lat: undefined,
        lon: undefined,
        city: undefined,
        country:undefined,
        temperatureC: undefined,
        is_day:undefined
      }
    constructor(props){
      super();
      }
    getPosition = () => {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      }
      getWeather = async (latitude, longitude) => {
        console.log(latitude,longitude)

        const api_call = await
        fetch(`https://api.weatherapi.com/v1/current.json?q=${latitude},${longitude}&key=${this.props.weather_key}&units=metric`);
        const data = await api_call.json();
        console.log('data is: ', data);  
        this.setState({
            lat: latitude,
            lon: longitude,
            city: data.location.region,
            temperatureC: data.current.temp_c,
            country: data.location.country,
            is_day: data.current.is_day
         })
      }

      async componentDidMount() {
        this.getPosition()
        .then((position) => {
           this.getWeather(position.coords.latitude,     
           position.coords.longitude)
         })
         .catch((err) => console.log(err.message));
     }
     
  render() {
    return (
      <>
   <div className=" row rounded shadow justify-content-end my-2" style={{ backgroundColor: 'white',
     position: 'relative' ,width:160}}>
    <div className='col-md-3 mx-1 my-2 '>
        <img src={!this.state.is_day?nightImg:dayImg}  alt="..." className="align-self-center mr-3 wimage" />
    </div>
    <div className="col-md-8  text-center">
        <p className='my-2 text-secondary'>{this.state.city} ,{this.state.country}</p>
        <h5>{this.state.temperatureC} &deg;</h5>
    </div>
</div>


      </>
    )
  }
}
