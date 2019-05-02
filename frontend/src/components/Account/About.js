import React, { Component } from 'react'
import { aboutEditApi, about } from '../../redux/actions/updateActions'
import { connect } from 'react-redux'

class About extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggle: false,
      updateEdit: false,
      showEditBtn: false,
      currentState: ''
    }
  }

  componentDidMount() {

    this.props.about()

    this.setState({
      currentState: this.props.updates.about
    })
    
  }

  // edit from the client side
  handleEdit = (id) => {
    this.setState(prevState => ({
      // flip the state toggle and updated edit to true
      toggle: !prevState.toggle,
      updateEdit: !prevState.updateEdit
    }), () => {
      // both states are currently true

      if(!this.state.toggle) { // if this is flipped back to false
        this.props.aboutEditApi(this.state.currentState)

        // set this updateEdit back to false
        this.setState({
          updateEdit: false
        })
      }
      
    })
  }

  // the updated text
  handleUpdatedText = () => {
    this.setState({
      currentState: this.refs.editAbout.value
    })
  }

  aboutSubmit = (event) => {
    event.preventDefault();

    this.setState({
      toggle: false
    })

    this.props.aboutEditApi(this.state.currentState)
  }

  showEdit = () => {
    this.setState({
      showEditBtn: true
    })
  }

  hideEdit = () => {
    this.setState({
      showEditBtn: false
    })
  }

  render() {

    return (
      <div>
        <h2 className="mb-5" style={{fontWeight: 'bold'}}>About</h2>

        {this.state.toggle ?
            <div>
              <textarea 
                  value={this.state.currentState} 
                  onChange={this.handleUpdatedText} 
                  className="w-100"
                  ref="editAbout" />

              <br />

              <button onClick={this.aboutSubmit} className="btn btn-info pt-2 pb-2 pl-3 pr-3">Share</button>
            </div>
          : 
          <div id="savedInput" name="savedInput" onMouseOver={this.showEdit} 
              onMouseOut={this.hideEdit} style={{maxHeight: '8rem', overflowY: 'scroll', backgroundColor: '#FFF', 
              padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

              {this.props.updates.about}

              {this.state.showEditBtn ?
                <button onClick={this.handleEdit} className="btn btn-default pl-2 pr-2 pt-1 pb-1" style={{opacity: '1'}}>Edit</button>
                :
                <button className="btn btn-default pl-2 pr-2 pt-1 pb-1" style={{opacity: '0'}}>Edit</button>
              }         
          </div>
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth_state,
  updates: state.update_state
})

export default connect(mapStateToProps, { aboutEditApi, about })(About)