import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGenresAPI } from '../../redux/actions/genresActions';

class Input extends Component {
    state = {
        genre: ''
    }

    handleInput = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleAddGenre = event => {
      event.preventDefault();
      this.props.addGenresAPI(this.state);
      this.form.reset();
    }

  render() {
    //console.log(this.props)
    return (
      <div className="container mt-5">
        <h3>List of your favorite genres</h3>
            <form onSubmit={this.handleAddGenre} ref={(node) => this.form = node}>
                <input 
                    type="text"
                    className="form-control"
                    name="genre"
                    placeholder="Enter genre here"
                    onChange={this.handleInput}
                />
            </form>       
      </div>
    )

  }
}

export default connect(null, { addGenresAPI })(Input);
