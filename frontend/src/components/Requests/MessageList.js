import React, { Component } from 'react';

export default class MessageList extends Component {
    state = {
        message: ''
    }

    componentDidMount() {
        this.setState({
            message: this.props.msg
        })
    }

  render() {
    return (
      <li className="list-group-item"
          style={{
            padding: '10px', 
            paddingLeft: '15px'
        }}
      >

      <b><a href="/profile">{this.props.name}</a></b>  
     
      <br />

      <p>{this.state.message}</p>
    </li>
    )
  }
}
