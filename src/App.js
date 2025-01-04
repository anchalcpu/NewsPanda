import React, { Component } from 'react'
import News from './components/News'
import Navbar from './components/Navbar'
import About from './components/About'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router
  , Route,Routes
} from 'react-router-dom';


export default class App extends Component {
  pageSize=8;
  API_KEY=process.env.REACT_APP_NEWS_API_KEY;
  weather_key=process.env.REACT_APP_WEATHER_API_KEY;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({
      progress:progress
    })
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar height={3} progress={this.state.progress} color="#930000"></LoadingBar>
          <Routes>
            <Route exact path="/about" element={<About key="about"/>}></Route>
          <Route  exact path="/"  element={<News weather_key={this.weather_key} apiKey={this.API_KEY} setProgress={this.setProgress}  category="general" country="us" key="home" pagesize={this.state.pageSize} />}></Route>
          <Route exact path="/business" element={<News weather_key={this.weather_key} apiKey={this.API_KEY} setProgress={this.setProgress}  category="business" country="us" key="business" pagesize={this.state.pageSize} />}></Route>
          <Route  exact path="/entertainment"  element={<News weather_key={this.weather_key} apiKey={this.API_KEY} setProgress={this.setProgress}  category="entertainment" key="entertainment" country="us" pagesize={this.state.pageSize} />}></Route>
          <Route  exact path="/sports"  element={<News weather_key={this.weather_key} apiKey={this.API_KEY} setProgress={this.setProgress}  category="sports" country="us" key="sports" pagesize={this.state.pageSize} />}/>
          <Route  exact path="/generalhealth"   element={<News weather_key={this.weather_key} apiKey={this.API_KEY} setProgress={this.setProgress}  category="generalhealth" key="generalhealth" country="us" pagesize={this.state.pageSize} />}></Route>
          <Route  exact path="/technology" element={<News weather_key={this.weather_key} apiKey={this.API_KEY} setProgress={this.setProgress}  category="technology" country="us" key="technology" pagesize={this.state.pageSize} />}></Route>
          <Route  exact path="/science"   element={<News weather_key={this.weather_key} apiKey={this.API_KEY} setProgress={this.setProgress}  category="science" country="us" key="science" pagesize={this.state.pageSize} />}></Route>


        </Routes>
        </Router>
      </div>
      
    )
  }
}
