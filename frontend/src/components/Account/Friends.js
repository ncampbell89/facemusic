import React, { Component } from 'react'
import { allFriends, allusersapi } from '../../redux/actions/authActions'
import { Link } from 'react-router-dom'
import MainPic from '../Layout/MainPic'
import { connect } from 'react-redux'
import './Friends.css'

class Friends extends Component {
  state = {
    friendsArr: []
  }

  componentDidMount() {
    this.props.allFriends()

    this.props.allusersapi()
    
    // this.setState({
    //   friendsArr: this.props.user.friends
    // })
  }

  friendsProfile = (id) => { 
    this.props.friends(id)
  }

  render() {
    let { friends, allUsers } = this.props.user

    let friendList;
    
    if(friends !== undefined) {

      if(friends.length > 0) {
        friendList = (
          friends.map((friend, index) => {
            for(let i = 0; i < allUsers.length; i++) {
              if(allUsers[i].name === friend.name) {
                friend.spotifyID = allUsers[i].spotifyID
              }
            }
            return (
              <li key={index} className="p-3">
                <MainPic />&ensp; 
                    <Link to={`/profile/${friend.spotifyID}`} 
                      onClick={this.friendsProfile.bind(this, friend.spotifyID)}>
                      <b>{friend.name}</b>
                    </Link>
              </li>
            )
          })
        )
      }

      if(friends.length === 0) {
        friendList = (
          <p>This user has no friends. Help him or her by introducing yourself!</p>
        )
      }

    }

    console.log(friendList)

    return (
      <div style={{margin: '3rem 0'}}>
        <h2 className="mb-5" style={{fontWeight: 'bold'}}>Friends</h2>
          <div style={{maxHeight: '17rem', overflowY: 'scroll', backgroundColor: '#FFF', padding: '1rem'}}> 
            <ul className="friend-container" style={{listStyleType: 'none'}}>{friendList}</ul> 
          </div>
      </div> 
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth_state
})

export default connect(mapStateToProps, { allFriends, allusersapi })(Friends)
