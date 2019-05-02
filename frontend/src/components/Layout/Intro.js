import React, { Component } from 'react'
import './MainPage.css'
import SpotifyLogin from 'react-spotify-login';
import { clientId, redirectUri } from './settings';
import { onSuccessapi } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import NewsFeed from '../Account/NewsFeed';

class Intro extends Component {

  onSuccess = (response) => {
    this.props.onSuccessapi(response.access_token) 
  }

  onFailure = response => console.error(response);

    render() {

      const token = localStorage.getItem('jwtToken')

      return (
        <React.Fragment>
          {token ? <NewsFeed /> :
            
              <div style={{display: 'flex', justifyContent: 'center'}} className="background_img">

                <div className="content">
                  <h1>Welcome to &thinsp;
                    <span style={{fontFamily: 'Sarina', fontWeight: 'normal'}}>FaceMusic!</span>
                  </h1>

                  <h2>Linked with Spotify</h2>

                  <div className="container">
                    <p>
                      Connect with friends with similar music interests
                    </p>

                    <p>
                      View posts of news, playlists and your friends' status
                    </p>

                    <p>
                      View and share entertainment news
                    </p>

                    <p>
                      <b>Coming Soon:</b> Messaging, setting profile picture, and photo filter effects
                    </p>
                  </div>

                  <br />

                  <br />

                  <SpotifyLogin
                      buttonText="Register or Login with Spotify"
                      className="spotify_btn"
                      clientId={clientId}
                      redirectUri={redirectUri}
                      onSuccess={this.onSuccess}
                      onFailure={this.onFailure} 
                  />
                </div>
              </div>
          }
        </React.Fragment>
      )
    }

  }

  const mapStateToProps = (state) => ({
    user: state.auth_state
  })

  export default connect(mapStateToProps, { onSuccessapi })(Intro)
