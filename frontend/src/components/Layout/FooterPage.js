import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBFooter } from "mdbreact";

class FooterPage extends Component {
  // componentDidMount() {
  //   if(window.location.href === '/requests') {
  //     console.log('requests')
  //   }
  // }
  render() {
    let footer;

    if(window.location.href === 'http://localhost:3000/requests') {
      console.log('requests')
      footer = (
        <MDBFooter className="font-small w-100 p-3 bg-dark" style={{position: 'absolute', bottom: '0'}}>
          <MDBContainer fluid className="text-center align-middle text-md-left">
            <MDBRow style={{display: 'flex', justifyContent: 'center'}}>
    
                <ul style={{ display: 'flex' }}>
                  <li className="list-unstyled">
                    <a href="#!">Support</a>
                  </li>
                  <li className="list-unstyled ml-3">
                    <a href="#!">FAQ</a>
                  </li>
                  <li className="list-unstyled ml-3">
                    <a href="#!">Settings</a>
                  </li>
                </ul>
    
                <div className="ml-5" style={{color: '#FFF'}}>
                  Copyright &nbsp; &copy; {new Date().getFullYear()}
                </div>
    
            </MDBRow>
          </MDBContainer>
        </MDBFooter>
      )
    } else {
      footer = (
        <MDBFooter className="font-small w-100 p-3 bg-dark" style={{position: 'absolute'}}>
          <MDBContainer fluid className="text-center align-middle text-md-left">
            <MDBRow style={{display: 'flex', justifyContent: 'center'}}>

                <ul style={{ display: 'flex' }}>
                  <li className="list-unstyled">
                    <a href="#!">Support</a>
                  </li>
                  <li className="list-unstyled ml-3">
                    <a href="#!">FAQ</a>
                  </li>
                  <li className="list-unstyled ml-3">
                    <a href="#!">Settings</a>
                  </li>
                </ul>

                <div className="ml-5" style={{color: '#FFF'}}>
                  Copyright &nbsp; &copy; {new Date().getFullYear()}
                </div>

            </MDBRow>
          </MDBContainer>
        </MDBFooter>
      )
    }

    return (
      footer
    )
  }
}

export default FooterPage;