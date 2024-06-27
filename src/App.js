import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <News pageSize={9} country={'in'} category={'general/'}></News>
      </div>
    )
  }
}

