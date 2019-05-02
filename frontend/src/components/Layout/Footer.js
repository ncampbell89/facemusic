import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'

export class Footer extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>         
        <Navbar bg="light" expand="lg" className="nav-block">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#support">Support</Nav.Link>
                    <Nav.Link href="#faq">FAQ</Nav.Link>
                    <Nav.Link href="#settings">Settings</Nav.Link>
                </Nav>
            </Navbar.Collapse>   
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
