import React, { Component } from 'react'
import loading from '../static/spinner.gif'

export default class spinner extends Component {
  render() {
    return (
      <div>
        <img src={loading} alt="loading" className='small-spinner'/>
      </div>
    )
  }
}
