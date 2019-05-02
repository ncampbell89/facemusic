import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onSuccessapi, allusersapi, userIdAndName } from '../../redux/actions/authActions';
import { getAllPosts } from '../../redux/actions/updateActions';
import PostList from './PostList';
// import { Link } from 'react-router-dom'

class NewsFeed extends Component {
  state = {
    search: ''
  }

  componentDidMount() {
    this.props.getAllPosts()
  }

  searchInput = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  searchSubmit = (obj, resultStr) => { 
    this.props.allusersapi(obj, resultStr)
  }

  render() {

    let { user_id } = this.props.user
    let { posts } = this.props.update

    let allPosts = posts.map((item, index) => {
      return (
        <PostList key={item._id} userid={user_id} item={item} />
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

export default connect(mapStateToProps, { onSuccessapi, allusersapi, getAllPosts, userIdAndName })(NewsFeed)
