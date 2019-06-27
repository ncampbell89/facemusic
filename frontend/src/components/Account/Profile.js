import React, { Component } from 'react'
import { allFriends, allusersapi, profilePage } from '../../redux/actions/authActions'
import { profilePage2 } from '../../redux/actions/genresActions'
import { aboutEditApi } from '../../redux/actions/updateActions'
import { connect } from 'react-redux'
import Collection from './Collection/Collection';
import Posts from './Posts';
import About from './About';
import Friends from './Friends';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.friendsProfile = this.friendsProfile.bind(this)
  }

  componentDidMount() {
    this.props.allusersapi() 
  }

  async friendsProfile (id) {
    try {
      await Promise.all([this.props.profilePage(id), this.props.profilePage2(id)])
    }
    catch(error) {
      console.log(JSON.stringify(error))
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <About about={this.friendsProfile} />
        <Friends friends={this.friendsProfile} />
        <Collection genres={this.friendsProfile} />
        <Posts posts={this.friendsProfile} />
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.auth_state
})

export default connect(mapStateToProps, { allFriends, allusersapi, profilePage, profilePage2, aboutEditApi })(Profile)
