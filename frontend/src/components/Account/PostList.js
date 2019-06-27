import React, { Component } from 'react'
import MainPic from '../Layout/MainPic';
import { connect } from 'react-redux';
import { otherPic } from '../../redux/actions/authActions';
import { deletePostApi, addComment, allComments, postsForNewsfeed,
  deleteComment, editComment, getAllPosts } from '../../redux/actions/updateActions'
import { Link } from 'react-router-dom'
import './PostListStyle.css'
import noPic from '../images/noPic.jpg';
import CommentsWithBtns from './CommentsWithBtns'
import CommentsWithoutBtns from './CommentsWithoutBtns'
import jwt_decode from 'jwt-decode';

const idArr = []

class PostList extends Component {
    state = {
        name: '',
        status: '',
        article: null,
        playlist: null,
        time: '',
        id: '',
        btnList: null,
        showBtn: false,
        showTrashBtn: null,
        comment: '',
        toggle: false,
        updateEdit: false,
        currentState: '',
        updatedComments: [],
        spotid: '',
        picUrl: ''
    }
    
    componentDidMount() {
      this.props.otherPic()
      this.props.allComments()
      this.props.editComment()
      
      this.setState({
        name: this.props.item.display_name,
        status: this.props.item.post,
        article: this.props.item.news,
        playlist: this.props.item.playlist,
        time: this.props.item.timestamp,
        id: this.props.userid,
        spotid: this.props.item.spotifyID,
        picUrl: this.props.item.picture
      })

      idArr.push(this.props.item._id)   
      this.props.postsForNewsfeed(this.props.item._id)
    }
 
    editButton = () => {
      this.setState({
        showBtn: true
      })
    }

    removeEditButton = () => {
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
      window.location.reload()
    }

    disappear = () => {
      this.setState({
        btnList: null
      })
    }

    commentInput = event => {
      this.setState({
        comment: event.target.value
      })        
    }

    editBtnsOver = (id) => {
      document.getElementById(id).style.opacity = '0.5'
    }

    editBtnsOut = (id) => {
      document.getElementById(id).style.opacity = '0'
    }

    deleteAction = (postID, commID) => {
      this.props.deleteComment(postID, commID)

      let location = window.location.href.split('/')
      let slug = location[location.length-1]
      window.location.reload(`/${slug}`)
    }

    editAction = (commID) => {
      this.setState(prevState => ({
        toggle: !prevState.toggle,
        updateEdit: !prevState.updateEdit
      }), () => {
        // this is the state where toggle and updateEdit are true
        if(!this.state.toggle) {
          this.serverEdit(commID, this.state.currentState)
          this.setState({          
            updateEdit: false
          })
        }
      })     
    }

    updateEdit = () => {
      this.setState({
        currentState: this.refs.updatedText.value
      }, () => {
        this.setState({
          updateEdit: false
        })
      })
    }

    serverEdit = (commID) => {
      this.props.editComment(commID, this.state.currentState)
    }

    submitComment = (event) => {
      event.preventDefault();
      this.props.addComment(this.state.comment, event.target.id);
      this.setState({
        comment: ''
      })
      this.form.reset();
    }

    updatedPost = () => {
      this.setState({
        updatedComments: this.refs.updatedComm.value
      })
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
            <b><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></b>
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
          <p style={{fontFamily: 'Century Gothic', marginTop: '10px'}}>{this.state.status}</p>
        </div>
      )  
    }

    if(this.props.item.hasOwnProperty('news')) {
      this.props.item.post = ""
    }


    let today = new Date();
    let year = today.getFullYear();

    let current = this.state.time.split('').filter(curr => {
      return curr !== ','
    }).join('');

    let currentArr = current.split(' ')
    
    let yrFromArray = currentArr[3]
    let yrResult = currentArr.filter(x => x !== yrFromArray).join(' ')  

    let theDay = currentArr.slice(2, 3)
    let dayNum = ''

    for(let i = 0; i < theDay.length; i++) {
      let char = theDay[i]

      let numStr = ''

      for(let j = 0; j < char.length; j++) {
        if(char[j].match(/[0-9]/)) {
          numStr += char[j]
        }
      }
      dayNum += numStr
    }

    let monthNum;
    switch(currentArr[1]) {
      case 'January':
        monthNum = 0
        break;

      case 'February':
        monthNum = 1
        break;

      case 'March':
        monthNum = 2
        break;

      case 'April':
        monthNum = 3
        break;

      case 'May':
        monthNum = 4 
        break;

      case 'June':
        monthNum = 5
        break;

      case 'July':
        monthNum = 6
        break;

      case 'August':
        monthNum = 7
        break;

      case 'September':
        monthNum = 8
        break;
      
      case 'October':
        monthNum = 9
        break;

      case 'November': 
        monthNum = 10
        break;

      case 'December':
        monthNum = 11
        break;

      default:
        monthNum = ''
    }

    let stampHr;
    let stampMin;
    let stampSec;

    let stampTime = currentArr.slice(-2, -1)
    for(let i = 0; i < stampTime.length; i++) {
      let char = stampTime[i]
      let splitted = char.split(':')

      for(let j = 0; j < splitted.length; j++) {
        stampHr = splitted[0]
        stampMin = splitted[1]
        stampSec = splitted[2]
      }
    }

    // compares the days between today and the timestamp
    var theTimeStamp = new Date(year, monthNum, dayNum, stampHr, stampMin, stampSec, 0)
    let diff = today - theTimeStamp;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);

    if(day < today.getDate() - 6) {
      currentArr.splice(1, 2)
      this.state.time = currentArr.join(' ')
    }

    if(this.state.time.includes(year)) {
      this.state.time = yrResult
    }

    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    let { comments } = this.props.update

    let commentsArray = comments.map((item, index) => {

      let toReturn;

      if(this.props.item._id === item.user_id) {

        if(item.name === decoded.display_name) {
          toReturn = (
            <CommentsWithBtns key={item._id} postid={this.props.item._id} comment={item} />
          )
        } else {
          toReturn = (
            <CommentsWithoutBtns key={item._id} comment={item} />
          )
        }
      }
      return toReturn

    })

    let thePic;
    let { profilePic } = this.props.user

    if(profilePic == "") {
      thePic = (
        <img src={noPic} width="30" height="30" alt=""  />
      )
    } else {
      thePic = (
        <MainPic name={this.state.name} pic={this.state.picUrl} id={this.props.item.spotifyID} />
      )
    }

    return (      
        <li key={this.props.user_id} 
            id={this.props.item._id}
            onMouseOver={this.editButton} 
            onMouseOut={this.removeEditButton}
            className="list-group-item rounded-bottom p-4 mb-3 postItem">

          {thePic}
          &ensp;

          <strong>
            <Link to={`/profile/${this.state.spotid}`}>{this.state.name}</Link>             
          </strong>

          &nbsp;
          {activity}
          &nbsp;

          <label style={{fontWeight: 'lighter', color: '#888', fontSize: 'smaller'}}>
            {this.state.time}
          </label>

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
            <ul id="del_list" onMouseOut={this.disappear} className="list-group" style={{position: 'absolute', right: '15px'}}>
              <li className="list-group-item p-3"              
                  onClick={this.deletePost.bind(this, this.props.item._id)}>Delete Post</li>
            </ul> : ""}

          <br />

          {this.props.item.news !== null ? news : null}
          {this.props.item.playlist !== null ? playlistCover : null}          
          {this.props.item.post !== null ? textPost : null}

          <ul key={this.props.item._id}>
            {commentsArray}
          </ul>

          <br />

          <ul className="list-group">{this.props.comm}</ul>

          <form onSubmit={this.submitComment} id={this.props.item._id} ref={(node) => this.form = node}>
            <input 
              onChange={this.commentInput} 
              name="comment" 
              value={this.state.comment}
              placeholder="Write comment..." 
              className="p-2 w-100" />
          </form>         

        </li>
    )
    
  }
}

const mapStateToProps = state => ({
  update: state.update_state,
  user: state.auth_state
})

export default connect(mapStateToProps, { deletePostApi, addComment, allComments, 
  postsForNewsfeed, deleteComment, editComment, getAllPosts, otherPic })(PostList)