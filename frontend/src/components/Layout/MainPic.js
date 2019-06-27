import React, { Component } from 'react'
import { profilePic, otherPic, profilePicUrls } from '../../redux/actions/authActions';
import { connect } from 'react-redux';

class MainPic extends Component {
  
    state = {
        url: ''
    }

    componentDidMount() {
      this.props.profilePicUrls(this.props)
      this.props.otherPic(this.props.id)
    }
    
  render() {
    return (
      <img src={this.props.pic} width="30" height="30" className="mainPic" alt="" />
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth_state
})

export default connect(mapStateToProps, { profilePic, otherPic, profilePicUrls })(MainPic)
