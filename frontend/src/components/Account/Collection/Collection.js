import React, { Component } from 'react'
import { connect } from 'react-redux';
import { chosenspotifylist, profilePage2, playlist } from '../../../redux/actions/genresActions';
import { userIdAndName } from '../../../redux/actions/authActions';
import CollectionList from './CollectionList';
import './collection.css';
import InGenre from '../Genres/InGenre';

class Collection extends Component {
  state = {}

    componentDidMount() {
      this.props.chosenspotifylist() 
      this.props.profilePage2()
      this.props.userIdAndName()
    }

    goToPreviousURL = (id) => {
      window.location.href = `/profile/${id}`
    }

  render() {
    let { error, errorMessage, genres } = this.props.genres;

    let genreArr = genres.map((item, index) => {
      return (
        <CollectionList key={index} userID={item.userID} pics={item.icons} item={item} />
      )
    }) 
    console.log(genreArr.length) 

    genres.map((item, index) => {
      return (
        <InGenre item={item} />
      )
    })

    return (
      <React.Fragment>
        <div>              
          {error ? 
          <div>
            <p>{errorMessage}</p>
            <button onClick={this.goToPreviousURL.bind(this, this.props.user.user_id)}>Retry?</button> 
          </div>
          : 
          <div>
            <h2 className="mb-5" style={{fontWeight: 'bold'}}>Your Collection</h2>

            <div className="collection_container">
            {genreArr.length === 0 ?
              <p style={{backgroundColor: '#FFF', padding: '1.5em', borderRadius: '3px'}}>Go to Genres/Moods to add to your collection</p> :

              <ul className="collection" 
                style={{backgroundColor: '#FFF', padding: '1.5em', borderRadius: '3px'}}>
                {genreArr}
              </ul>                
            }
              
            </div>
          </div>
          }
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
    genres: state.genre_state,
    user: state.auth_state
})

export default connect(mapStateToProps, { chosenspotifylist, userIdAndName, profilePage2 })(Collection)