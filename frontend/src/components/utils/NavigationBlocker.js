import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'

export class Navigation extends Component {
  static propTypes = {
    prop: PropTypes
  }

  navigationBlocker = (props) => {
    if(props.navigationBlocked) {
        window.onbeforeunload = () => true
    } else {
        window.onbeforeunload = null
    }
  }

  render() {
      console.log(navigationBlocker)
    return (
      <div>
        <Prompt
            when={props.navigationBlocked}
            message="Are you sure you want to leave?"
        />
      </div>
    )
  }
}

navigationBlocker.propTypes = {
    navigationBlocked: PropTypes.bool.isRequired
}

export default Navigation
