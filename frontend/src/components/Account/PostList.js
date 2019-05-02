import React, { Component } from 'react'
import MainPic from '../Layout/MainPic';
import { connect } from 'react-redux'
import { deletePostApi } from '../../redux/actions/updateActions'
import { Link } from 'react-router-dom'
import './PostListStyle.css'

class PostList extends Component {
    state = {
        name: '',
        status: '',
        article: null,
        playlist: null,
        time: '',
        id: '',
        btnList: null,
        showBtn: false
    }
    
    componentDidMount() {
      
      this.setState({
        name: this.props.item.display_name,
        status: this.props.item.post,
        article: this.props.item.news,
        playlist: this.props.item.playlist,
        time: this.props.item.timestamp,
        id: this.props.userid
      })
    }

    editButton = (id) => {
      this.setState({
        showBtn: true
      })
    }

    removeEditButton = (id) => {
      this.setState({
        showBtn: false
      })
    }

    toggleMenu = () => {
      this.setState({
        btnList: !this.state.btnList
      })
    }

    deletePost = (id) => {
      this.props.deletePostApi(id)
    }
    
  render() {
    
    let activity;

    let article = Object.assign([], this.state.article)  
    let date = new Date(article.publishedAt)
    let news;   
    if(this.state.article) {
      news = (
        <div className="listed_item" style={{fontFamily: 'sans-serif'}}>
          <img src={article.urlToImage} style={{margin: '2em', width: '95%'}} alt="" /> 
          <h3 className="mb-3">
            <b><Link to={article.url} target="_blank" rel="noopener noreferrer">{article.title}</Link></b>
          </h3>
          <h4 className="mb-3">{article.description}</h4>
          <p>
            {article.author}&nbsp;
            {date.toLocaleDateString()}
          </p>
          <p>{article.content}</p>
        </div>
      )
      activity = (
        <label>shared an article</label>
      )
    }

    let playlist = Object.assign([], this.state.playlist)
    let playlistCover;
    if(this.state.playlist) {
      playlistCover = (
        <div className="listed_item">
          <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            <img src={playlist.images[0].url} className="m-4" style={{width: '400px', height: '400px'}} alt="" />
          </a>
        </div>
      )

      activity = (
        <label>shared a playlist</label>
      )
    }

    let textPost;
    if(this.state.status) {
      textPost = (
        <div className="listed_item">
          <p style={{fontFamily: 'sans-serif'}}>{this.state.status}</p>
        </div>
      )  
    }

    if(this.props.item.hasOwnProperty('news')) {
      this.props.item.post = ""
    }

    return (   
      <div>     
        <li key={this.props.id} 
            onMouseOver={this.editButton} 
            onMouseOut={this.removeEditButton}
            className="list-group-item rounded-bottom p-4 postItem">

          <MainPic /> &ensp;

          <strong>
            <Link to={`/profile/${this.state.id}`}>{this.state.name}</Link>             
          </strong>
          &nbsp;
          {activity}

          {this.state.showBtn ? 
              <button 
                className="btn btn-default pl-3 pr-3 pt-2 pb-2 editBtn" 
                onMouseOver={this.editButton.bind(this, this.props.item._id)} 
                onClick={this.toggleMenu}
                style={{position: 'absolute', right: '15px', opacity: '1'}}>
                <i className="fas fa-ellipsis-v"></i>
              </button>  :
              <button 
                className="btn btn-default pl-3 pr-3 pt-2 pb-2 editBtn" 
                onMouseOver={this.editButton.bind(this, this.props.item._id)} 
                onClick={this.toggleMenu}
                style={{position: 'absolute', right: '15px', opacity: '0'}}>
                <i className="fas fa-ellipsis-v"></i>
              </button>
          }

          {this.state.btnList ? 
            <ul className="list-group" style={{position: 'absolute', right: '15px'}}>
              <li className="list-group-item p-3" 
                  onClick={this.deletePost.bind(this, this.props.item._id)}>Delete Post</li>
            </ul> : ""}

          <br />

          {this.props.item.news !== null ? news : null}
          {this.props.item.playlist !== null ? playlistCover : null}          
          {this.props.item.post !== null ? textPost : null}

        </li>

        <br />
      </div>
    )
    
  }
}

const mapStateToProps = state => ({
  update: state.update_state
})

export default connect(mapStateToProps, { deletePostApi })(PostList)