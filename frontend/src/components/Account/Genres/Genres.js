import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addgenresapi, handledeleteapi, getallgenresapi, 
        spotify, chosenspotifylist } from '../../../redux/actions/genresActions';
import { userIdAndName } from '../../../redux/actions/authActions';

import GenresList from './GenresList';
import { Dropdown } from 'react-bootstrap';

class Genres extends Component {
  state = {
    showGenres: true,
    genresSubmitted: false,
    checkDup: false
  }

  componentDidMount() {
    this.props.spotify()
    this.props.getallgenresapi() 
    this.props.userIdAndName() 
  }

  handleInput = event => {
    this.setState({
      [event.target.name] : event.target.id
    })
  }

  checkDuplication = (genreArray, inputName) => {
    let result = false;

    //loop through the array
    //if each value of the array does not match inputName return false
    //else return true
    genreArray.forEach((item) => {
      if (item.genre === inputName) {
        result = true;
        //break out of the loop
        return;
      } 
    })
    //return result
    return result;
  }


  handleAddGenre = (event) => {
    event.preventDefault();

    //checking if the array length is zero
    //if the length is zero add the selected genre to the list
    if (this.props.genres.genres.length === 0) {
      this.props.addgenresapi(event.target.id, event.target.name);
    } 

    //set array to variable
    let genreArray = this.props.genres.genres;
    
    //return true or false value from checkDuplication function
    let isMatch = this.checkDuplication(genreArray, event.target.name);

    // if is match is true run this.alertMe()
      // else
    // add selected genre to the list
    if (isMatch) {
      this.alertMe();
    } else {
      this.props.addgenresapi(event.target.id, event.target.name);
    }

  }

  alertMe = () => {
    alert('Genre already selected');
  }

  handleDelete = (id) => {
    this.props.handledeleteapi(id)
  }

  processGenres = (id) => {
    this.props.history.push(`/profile/${id}`)
    window.location.reload(`/profile/${id}`)
  }

  timeoutError = () => {
    setTimeout(() => {
      window.location.reload('/genrelist')
    }, 2000)
  }

  render() {

    let { genres, spotifyGenres, error, errorMessage } = this.props.genres; 

      // The dropdown
      let genreList = spotifyGenres.map((item, index) => {  
        return (
            <Dropdown.Item key={item.id} name={item.name} id={item.id} onClick={this.handleAddGenre}>
              {item.name}
            </Dropdown.Item>    
        )
      });

      // The list items being added
      let chosenList = genres.map((item, index) => {
        // the object of item has to be rendered so you can get the id and the item name
        return (
          <GenresList key={item._id} item={item} handleDelete={this.handleDelete} />
        )
      })

    return (
      <div style={{width: '100%'}}>

        <div className="container mt-5">
          <h2 className="mb-5" style={{fontWeight: 'bold'}}>Genres or Moods</h2>
            <Dropdown>
              <Dropdown.Toggle variant="default" style={{border: '1px solid', width: '100%', padding: '5px 0'}} id="dropdown-basic">
                Select genres or moods to add to your collection
              </Dropdown.Toggle>
              
              <Dropdown.Menu style={{width: '100%', textAlign: 'center', height: '40vh', overflowY: 'scroll'}}>
                {error ? errorMessage : genreList}
              </Dropdown.Menu>
            </Dropdown>
        </div>

        <div className="container mt-3 mb-5">

          <form onSubmit={this.handleAddGenre}>     
              <ul className="list-group">            
                {error ? 
                <div>
                  <span 
                    className="alert alert-danger" 
                    style={{margin: '1em 0 1em', padding: '10px'}}>
                    {errorMessage}
                  </span> &nbsp;
                  <button onClick={this.timeoutError()}>Retry?</button>
                </div>
                : 
                chosenList}
              </ul>          
          </form>

          <br />

          <button 
            className="btn btn-block btn-success p-2" 
            onClick={this.processGenres.bind(this, this.props.user.user_id)}>
            ADD TO COLLECTION
          </button>

          
        </div>

      </div>     
    )
  }
}

const mapStateToProps = (state) => ({
  genres: state.genre_state,
  user: state.auth_state
})

export default connect(mapStateToProps, { 
  addgenresapi, handledeleteapi, getallgenresapi, spotify, chosenspotifylist, userIdAndName })(Genres);
