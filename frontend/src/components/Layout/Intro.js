import React, { Component } from 'react'
import './MainPage.css'
import { clientId, redirectUri } from './settings';
import { onSuccessapi } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import NewsFeed from '../Account/NewsFeed';

export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const scopes = [
  "user-read-currently-playing",
  "user-read-private"
];


// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";


class Intro extends Component {
  state = {
    token: null
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      }, () => {
        this.props.onSuccessapi(this.state.token)
      });
    }
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
                      <b>Coming Soon:</b> Messaging, setting likes, and photo filter effects
                    </p>
                  </div>

                  <br />

                  <br />

                  <a className="spotify_btn"                
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                  >                  
                    Register or Login with Spotify
                  </a>

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
