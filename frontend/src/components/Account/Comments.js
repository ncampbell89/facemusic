import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, allComments, deleteComment, editComment } from '../../redux/actions/updateActions';
import Tooltip from '@material-ui/core/Tooltip';
import MainPic from '../Layout/MainPic'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

const FontAwesome = require('react-fontawesome');

class CommentsWithBtns extends Component {
    state = {
        comment: '',
        toggle: null,
        updateEdit: null,
        currentState: ''
    }

    componentDidMount() { 
        this.setState({
            currentState: this.props.comment
        })     
        // this.props.allComments()
    }

    async renderComments() {
      try {
        this.props.allComments()
      }
      catch(err) {
        console.log(JSON.stringify(err))
      }
    }



    deleteAction = (postID, commID) => {
      this.props.deleteComment(postID, commID)

      let location = window.location.href.split('/')
      let slug = location[location.length-1]
      window.location.reload(`/${slug}`)
    }

    editBtnsOver = (id) => {
        document.getElementById(id).style.opacity = '0.5'
    }

    editBtnsOut = (id) => {
        document.getElementById(id).style.opacity = '0'
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

    updateEdit = (id) => {
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

    render() {
      const theme = createMuiTheme({
        typography: {
            useNextVariants: true,
        },
        overrides: {
          MuiTooltip: {
            tooltip: {
              fontSize: "0.8em"
            }
          }
        }
      });

      const token = localStorage.getItem('jwtToken')
      const decoded = jwt_decode(token)

      var toReturn;
      let { _id, user_id, name, theUser, post, picture } = this.props.comment

      if(this.props.item._id === item.user_id) {

        if(item.name === decoded.display_name) {
          toReturn = (  
            // <CommentsWithBtns key={this.props.item._id} comment={item} />
            <li key={item._id} className="list-group-item p-3 mt-3"         
            onMouseOver={this.editBtnsOver.bind(this, item._id)}
            onMouseOut={this.editBtnsOut.bind(this, item._id)}>
    
              <MainPic name={item.name} pic={item.picture} id={item.theUser} />
              &ensp;
              <Link to={`/profile/${item.theUser}`}><b>{item.name}</b></Link>
              &ensp;            
              
              {this.state.toggle ? 
              <input 
                type="text"
                ref="updatedText"
                value={this.state.currentState}
                onChange={this.updateEdit.bind(this, item._id)} /> 
                : item.post}
    
              <span style={{float: 'right', opacity: '0'}} id={item._id}>
                  <MuiThemeProvider theme={theme}>
                    {this.state.toggle ?
                      <Tooltip title="Save" placement="top">
                          <FontAwesome 
                          name="check"
                          className="fas fa-check-circle" 
                          style={{fontSize: '1.5em'}} 
                          onClick={this.editAction.bind(this, item._id)}
                          />
                      </Tooltip> :
    
                      <Tooltip title="Edit" placement="top">
                          <FontAwesome 
                          name="edit"
                          disabled={this.state.updateEdit} 
                          className="fal fa-pencil-alt" 
                          style={{fontSize: '1.5em'}}
                          onClick={this.editAction.bind(this, item._id)}
                          />
                      </Tooltip>
                    }                   
                  </MuiThemeProvider>
                  
                  &emsp;
    
                  <MuiThemeProvider theme={theme}>
                      <Tooltip title="Delete" placement="top">
                          <FontAwesome 
                          name="delete"
                          className="fal fa-trash-alt" 
                          style={{fontSize: '1.5em'}}
                          id={item._id} 
                          onClick={this.deleteAction.bind(this, item._id)}
                          />
                      </Tooltip>
                  </MuiThemeProvider>           
              </span>
            </li>
          )
        } else {
          toReturn = (  
            <li key={item._id} className="list-group-item p-3 mt-3">
                <MainPic name={item.name} pic={item.picture} id={item.theUser} />
                &ensp;
                <Link to={`/profile/${item.theUser}`}><b>{item.name}</b></Link>
                &ensp;
                
                {this.state.toggle ? 
                <input 
                type="text"
                ref="updatedText"
                value={this.state.currentState}
                onChange={this.updateEdit.bind(this, item._id)} /> 
                : item.post}
            </li>
          )
        }

      }

    }

    const mapStateToProps = (state) => ({
        update: state.update_state
    })
    
    export default connect(mapStateToProps, { addComment, allComments, deleteComment, editComment })(CommentsWithBtns)
    