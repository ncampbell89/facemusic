import React, { Component } from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { allFriendRequestsApi, allPendingRequestsApi, 
  friendsApi, declinedApi, cancelRequestApi } from '../../redux/actions/authActions'
import { connect } from 'react-redux'
// import io from "socket.io-client"
import './requests.css'

// var socket;

class FriendRequests extends Component {

  componentDidMount() {
    this.props.allFriendRequestsApi()
    this.props.allPendingRequestsApi()
  }

  acceptedRequest = (id, name) => {
    this.props.friendsApi(id, name)
    this.props.allFriendRequestsApi(id)
  }

  declinedRequest = (id) => {
    this.props.declinedApi(id)
  }

  cancelRequest = (id) => {
    this.props.cancelRequestApi(id)
  }

  render() {
    console.log(this.props)
    let { friendRequests, pendingRequests } = this.props.user

    let friendList = friendRequests.map((item, index) => {
      return (
        <ListGroup.Item key={index}>
          <p>
            <strong><a href="#">{item.name}</a></strong>&thinsp;
            wants to be your friend!
          </p>

          <div style={{display: 'flex'}}>
              <Button 
                className="btn btn-success" 
                onClick={this.acceptedRequest.bind(this, item._id, item.name)}
              >
              Accept
              </Button>

              &ensp;

              <Button className="btn btn-danger"
              onClick={this.declinedRequest.bind(this, item._id)}
              >
              Decline
              </Button>
          </div>
        </ListGroup.Item>
      )
    })

    let pendingList = pendingRequests.map((item, index) => {
      return (
        <ListGroup.Item key={item._id}>
          <p>
            Awaiting request:&thinsp;
            <strong><a href="#">{item.name}</a></strong>
          </p>
          <div style={{display: 'flex'}}>
              <Button className="btn btn-primary">Send Message</Button>&ensp;
              <Button 
                className="btn btn-danger"
                onClick={this.cancelRequest.bind(this, item._id)}>Cancel Request</Button>
          </div>
        </ListGroup.Item>
      )
    })

    return (
      <div>
        <div className="col-lg-6">
          <h2 className="mb-5" style={{fontWeight: 'bold'}}>Friend Requests</h2>
            {
              friendRequests.length == 0 ?
              <p>No friend requests</p> :                           
              <ListGroup>{friendList}</ListGroup>                        
            }
        </div>

        <div className="col-lg-6">
          <h2 className="mb-5" style={{fontWeight: 'bold'}}>Pending Requests</h2>
            {
              pendingRequests.length == 0 ?
              <p>No pending requests</p> :              
              <ListGroup>{pendingList}</ListGroup>
            }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth_state
})

export default connect(mapStateToProps, 
  { allFriendRequestsApi, allPendingRequestsApi, friendsApi, 
    declinedApi, cancelRequestApi })(FriendRequests)

