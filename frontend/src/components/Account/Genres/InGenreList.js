import React, { Component } from 'react'
import { connect } from 'react-redux'
import { playlist } from '../../../redux/actions/genresActions'
import { addPostApi } from '../../../redux/actions/updateActions';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
// import play_btn from './images/play_btn.png'
import './ingenre.css'
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

class InGenreList extends Component {

  state = {
    playlistID: '',
    trackID: ''
  }

  // playTrack = () => {
    
  //   this.setState({
  //     playlistID: this.props.genres.category, // lowercase word
  //     trackID: this.props.item.id
  //   }, () => {
  //     this.props.playlist(this.state.playlistID, this.state.trackID)
  //   })

  //   let { spotify } = this.props.item.external_urls
  //   let audio = new Audio(spotify)
  //   audio.type = 'audio/mp3'
  //   audio.play()

  // }

  sharePlaylist = (id, item, playlist) => {
    this.props.addPostApi(id, item, playlist)
    window.location.href = "/newsfeed" 
  }

  render() {
    let { spotify } = this.props.item.external_urls
    let { images } = this.props

    const theme = createMuiTheme({
      typography: {
          useNextVariants: true,
      },
      overrides: {
        MuiTooltip: {
          tooltip: {
            fontSize: "1em"
          }
        }
      }
    });


    return ( 
        <li style={{listStyleType: 'none'}}>

          <div className="imgContainer"> 
            {/* <img src={play_btn} alt="play track" className="playBtn" />       */}

            <MuiThemeProvider theme={theme}>   
                <Tooltip title="Share to News Feed" placement="top">
                    <Link to="/newsfeed" 
                      onClick={this.sharePlaylist.bind(this, this.props.id, null, this.props.item)} 
                      className="shareBtn btn btn-info">
                        <i className="fas fa-share-alt" style={{padding: '8px'}}></i>
                    </Link>
                </Tooltip> 
            </MuiThemeProvider>          

            <a href={spotify} target="_blank" rel="noopener noreferrer"> 
              <img src={images[0].url} width="250" alt="" />
            </a>
     
          </div>  

        </li>       
    )
  }

}

const mapStateToProps = (state) => ({
  genres: state.genre_state,
  update: state.update_state
})
  
export default connect(mapStateToProps, { playlist, addPostApi })(InGenreList)
