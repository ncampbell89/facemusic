import React, { Component } from 'react'
import noPic from '../images/noPic.jpg';

export default class MainPic extends Component {
    state = {
        url: ''
    }
    
  render() {
    return (
        <img src={noPic} width="30" height="30" className="mainPic" alt="" /> 
    )
  }
}
