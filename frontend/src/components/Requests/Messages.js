import React, { Component } from 'react'
import './requests.css'
import MessageList from './MessageList'
import { allmessages, messagesapi } from '../../redux/actions/messageActions'
import { connect } from 'react-redux'

class Messages extends Component {
  state = {
    message: ''
  }

  componentDidMount() {
      this.props.allmessages()
  }

  messageInput = event => {
      this.setState({
          [event.target.name] : event.target.value
      })
  }

  messageList = event => {
      event.preventDefault()
      this.messageInput(event)
      this.props.messagesapi(this.state)
  }

  render() {
    let { messageArray, 
          name, errorAll, 
          errorCreate, 
          errorMessageAll, 
          errorMessageCreate } = this.props.messages

    let messageBox = messageArray.map(item => {
      return (
        <MessageList key={item._id} msg={item.message} name={name} />
      )     
    })

    return (
      <div className="container mt-5 mb-5">
        <h2 className="mb-5" style={{fontWeight: 'bold'}}>Messages</h2>

        <h3>{errorAll ? errorMessageAll : ''}</h3>

        <ul>
          {messageBox}
        </ul>

        <form style={{display: 'flex', justifyContent: 'center'}} 
            onSubmit={this.messageList} 
            ref={(node) => this.form = node}>

            {errorCreate ? 
              <div 
                className="alert alert-danger w-100" 
                style={{padding: '10px', marginTop: '1em', marginBottom: '1em'}}>
                {errorMessageCreate}
              </div>
              :
              <input 
                name="message" 
                className="w-100" 
                placeholder="Write Message" 
                onChange={this.messageInput}
                style={{padding: '10px', marginTop: '1em', marginBottom: '1em'}} 
              />
            }

        </form>
        
        <button onClick={this.messageList} className="btn btn-success" style={{padding: '0.5em'}}>Send</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  messages: state.msg_state
})

export default connect(mapStateToProps, { allmessages, messagesapi })(Messages)
