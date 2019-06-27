import React, { Component } from 'react'
import { allFriends, allusersapi, profilePage } from '../../redux/actions/authActions'
import { profilePage2 } from '../../redux/actions/genresActions'
import { aboutEditApi } from '../../redux/actions/updateActions'
import { connect } from 'react-redux'
import Collection from './Collection/Collection';
import Posts from './Posts';
import About from './About';
import Friends from './Friends';

class FriendsProfile extends Component {
  // constructor(props) {
  //   super(props)
  //   this.friendsProfile = this.friendsProfile.bind(this)
  // }

  state = {
    id: null
  }

  componentDidMount() {
    this.props.allusersapi() 
    // this.props.profilePage()
    // this.props.profilePage2()
  }

  friendsProfile = id => {
    console.log(id)   
    // this.props.profilePage(id)
    // this.props.profilePage2(id)
  }

  // async friendsProfile (id) {
  //   try {
  //     await Promise.all([this.props.profilePage(id), this.props.profilePage2(id)])
  //   }
  //   catch(error) {
  //     console.log(JSON.stringify(error))
  //   }
  // }

  render() {

    return (
      <div className="container mt-5">
        <About />
        <Friends friend={this.friendsProfile} />
        <Collection />
        <Posts />
      </div>
    )

  }

}

const mapStateToProps = state => ({
  user: state.auth_state,
  updates: state.update_state
})

export default connect(mapStateToProps, { allFriends, allusersapi, profilePage, profilePage2, aboutEditApi })(FriendsProfile)
