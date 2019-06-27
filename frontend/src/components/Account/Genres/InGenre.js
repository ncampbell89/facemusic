import React, { Component } from 'react'
import { connect } from 'react-redux'
import { playlist } from '../../../redux/actions/genresActions'
import InGenreList from './InGenreList'
import './ingenre.css'

class InGenre extends Component {
  state = {
    catID: ''
  }

  componentDidMount() {
    let { pathname } = this.props.history.location
    let listID = pathname.split('/')[2]

    this.setState({
        catID: listID
    })

    this.props.playlist(this.state.catID)
  }

  errorTimeout = () => {
    setTimeout(() => {
      window.location.href = '/profile'
    }, 2500)
  }

  render() {
    let { error, errorMessage } = this.props.genres
    let errMsg;

    if(error) {
      errMsg = (
        <h3 className="ml-5">{errorMessage}</h3>      
      )
    }

    let { playlists } = this.props.genres

    let list = playlists.map((item, index) => {
      return (
        <InGenreList key={item.id} item={item} id={item.id} images={item.images} link={item.href} />
      )     
    })

    return (
      <div className="container mt-5 mb-5">
        <h2 className="mb-5" style={{fontWeight: 'bold'}}>Playlists</h2>
        {errMsg}
        <ul className="playlistGrid">
          {list}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  genres: state.genre_state
})

export default connect(mapStateToProps, { playlist })(InGenre)
