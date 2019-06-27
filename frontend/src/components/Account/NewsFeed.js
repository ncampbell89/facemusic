import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onSuccessapi, allusersapi, checkIfUserLoggedIn, otherPic } from '../../redux/actions/authActions';
import { getAllPosts, postsForNewsfeed, allComments } from '../../redux/actions/updateActions';
import PostList from './PostList';
// import { Link } from 'react-router-dom'

class NewsFeed extends Component {
  state = {
    search: ''
  }

  componentDidMount() {
    this.props.postsForNewsfeed()
    this.props.otherPic() 
  }

  searchInput = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  searchSubmit = (obj, resultStr) => { 
    this.props.allusersapi(obj, resultStr)
  }

  friendsProfile = (id) => { 
    this.props.postlist(id)
  }

  render() {

    let { postsForNewsfeed } = this.props.update

    let allPosts = postsForNewsfeed.map((item, index) => {
      console.log(item)
      return (
        <PostList key={item._id} item={item} profile={this.friendsProfile.bind(this, item.spotifyID)} />
      )
    })

    return (
      <div className="container mt-5 mb-5">
        {allPosts.length === 0 ? 
          <div>
              <h1>No Posts Yet</h1><br />
              <h4>Add some articles from the news page, share playlists, 
                or tell us what's on your mind :&#41;</h4>
          </div> :
          <ul className="list-group">
            {allPosts}
          </ul> 
        }       
      </div>
    )
  }
  
}

const mapStateToProps = (state) => ({
  user: state.auth_state,
  update: state.update_state
})

export default connect(mapStateToProps, { onSuccessapi, allusersapi, getAllPosts, 
  postsForNewsfeed, checkIfUserLoggedIn, otherPic, allComments })(NewsFeed)
