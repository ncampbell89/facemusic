import React, { Component } from 'react'
import Intro from './Intro'
import './MainPage.css'

export default class MainPage extends Component {

  render() {

    return (
      <div id="main_page">

        <div id="images">
          <div className="color_overlay h-100 w-100"></div>
          <div className="background_img"></div> 
        </div>
        <Intro />

      </div>
    )
  }
}
