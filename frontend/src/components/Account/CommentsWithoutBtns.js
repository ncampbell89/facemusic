import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, allComments, deleteComment, editComment } from '../../redux/actions/updateActions';
import MainPic from '../Layout/MainPic'
import { Link } from 'react-router-dom'

class CommentsWithoutBtns extends Component {
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
    }

    async renderComments() {
      try {
        this.props.allComments()
      }
      catch(err) {
        console.log(JSON.stringify(err))
      }
    }

    editBtnsOver = (id) => {
        document.getElementById(id).style.opacity = '0.5'
    }

    editBtnsOut = (id) => {
        document.getElementById(id).style.opacity = '0'
    }

    render() {

      let { _id, name, theUser, post, picture } = this.props.comment

      return (
        <li key={_id} className="list-group-item p-3 mt-3">
            <MainPic name={name} pic={picture} id={theUser} />
            &ensp;
            <Link to={`/profile/${theUser}`}><b>{name}</b></Link>
            &ensp;
            
            {this.state.toggle ? 
            <input 
            type="text"
            ref="updatedText"
            value={this.state.currentState}
            onChange={this.updateEdit.bind(this, _id)} /> 
            : post}
        </li>
      )

    }
}

const mapStateToProps = (state) => ({
    update: state.update_state
})

export default connect(mapStateToProps, { addComment, allComments, deleteComment, editComment })(CommentsWithoutBtns)
