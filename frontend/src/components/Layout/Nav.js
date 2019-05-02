import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { logoutapi, checkIfUserLoggedIn, deleteaccount, userIdAndName } from '../../redux/actions/authActions'
import { getallgenresapi } from '../../redux/actions/genresActions';

import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import MainPic from './MainPic';

import './Nav.css'


class Navclass extends Component {
    state = {}

    componentDidMount() {
        let token = localStorage.getItem('jwtToken')
  
        if(token) {
            // call the function checkIfUserLoggedIn 
            let decoded = jwt_decode(token)
            this.props.checkIfUserLoggedIn(decoded)
            this.props.userIdAndName()
        }          
    }

    handleInput = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
  

    handleLogout = (event) => {

        event.preventDefault();
        this.props.logoutapi(this.state);   
        //Since the history object does not exist in our app at the moment
        //What in Javascript can help me reload the browser?
        window.location.href = "/"

    }

    deleteAcct = () => {
        confirmAlert({
            title: 'Is this goodbye?',
            message: 'Deleting your account cannot be undone',
            buttons: [
              {
                label: 'Yes, remove me',
                onClick: () => {
                    this.props.deleteaccount(this.state)
                    window.location.href = "/"
                }
              },
              {
                label: 'Nope, changed my mind'
              }
            ]
        });
    }


  render() {
    let { logError, logMessage, name, user_id } = this.props.user
    const token = localStorage.getItem('jwtToken')

    return (
        <div>
            <Navbar bg="dark" expand="lg" style={{borderRadius: '0'}}>
                <Navbar.Brand href="/" style={{display: 'flex'}}>
                    <div className="nav_title">FaceMusic | </div>  
                    <div className="nav_subtitle">Where harmony brings people together</div>
                </Navbar.Brand>
    
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
                <Navbar.Collapse id="basic-navbar-nav">
    
                    <Nav className="mr-auto" style={{float: 'right'}}> 
    
                        {token ?                                               
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Link to="/newsfeed" className="mr-4 text-right">Home</Link>
                                <Link to="/genrelist" href="/genrelist" className="mr-4 text-right">Genres / Moods</Link>
                                <Link to="/news" className="mr-4 text-right">News</Link>  
                                <Link to="/search" className="mr-4">Search</Link> 
    
                                <MainPic />                     
    
                                <NavDropdown title={name} id="basic-nav-dropdown" className="mr-4">
                                    <NavDropdown.Item href={`/profile/${user_id}`}>Profile</NavDropdown.Item>
    
                                    <NavDropdown.Item href="/pictures">Photo Gallery</NavDropdown.Item>
    
                                    <NavDropdown.Item href="/requests">Friend/Pending<br />Requests</NavDropdown.Item>
    
                                    <NavDropdown.Item href="/messages">Messages</NavDropdown.Item>                                                                             
    
                                    <NavDropdown.Divider />
    
                                    <NavDropdown title="Settings" id="basic-nav-dropdown">                                  
                                        <NavDropdown.Item onClick={this.deleteAcct}>Delete Account</NavDropdown.Item>                          
                                    </NavDropdown>
                                </NavDropdown>
    
                                <Button onClick={this.handleLogout}>Logout</Button>                    
                            </div> :
    
                            <div style={{display: 'flex'}}> 
                                <Nav.Link className="nav_subtitle" style={{fontSize: '1.5rem'}} disabled>Home</Nav.Link>                           
                                <Nav.Link className="nav_subtitle" style={{fontSize: '1.5rem'}} disabled>Genres / Moods</Nav.Link> 
                                <Nav.Link className="nav_subtitle" style={{fontSize: '1.5rem'}} disabled>News</Nav.Link> 
                                <Nav.Link className="nav_subtitle" style={{fontSize: '1.5rem'}} disabled>Search</Nav.Link> 
                            </div>              
                        }                  
                    </Nav>
                    
                                       
                </Navbar.Collapse>
    
            </Navbar>
    
            {logError ?
            <span 
                style={{position: 'relative', left: '52.8rem', top: '1rem'}} 
                className="alert alert-danger mb-0">{logMessage}</span> : ''}
     
        </div>
        )
  }
}

const mapStateToProps = (state) => ({
    user: state.auth_state,
    genres: state.todo_state
})

export default connect(mapStateToProps, { getallgenresapi, logoutapi, checkIfUserLoggedIn, deleteaccount, userIdAndName })(Navclass)
