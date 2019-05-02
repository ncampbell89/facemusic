import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { allPicturesApi } from '../../redux/actions/updateActions'
import { connect } from 'react-redux'

class DeletePic extends Component {
    componentDidMount() {
        this.props.allPicturesApi()
        console.log(this.props)
    }

    deleteAcct = () => {
        confirmAlert({
            title: 'Deleting Picture',
            message: 'Are you sure you want to remove your picture?',
            buttons: [
              {
                label: 'Delete',
                onClick: () => {
                    this.props.deleteaccount(this.state)
                    window.location.href = "/"
                }
              },
              {
                label: 'Leave it'
              }
            ]
        });
    }

  render() {
    console.log(this.props)
    return (
      <div>
        Delete
      </div>
    )
  }
}

const mapStateToProps = state => ({
    update: state.update_state
})

export default connect(mapStateToProps, { allPicturesApi })(DeletePic)
