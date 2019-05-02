import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handledeleteapi } from '../../../redux/actions/genresActions';

class GenresList extends Component {
    state = {
        currentState: '',
    }

    componentDidMount() { 
        this.setState({
            currentState: this.props.item.genre
        })
    }

    handleDelete = (id) => {
        this.props.handleDelete(id)
    }

  render() {

    return (
        <li className="list-group-item" 
            style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '10px', 
                paddingLeft: '15px'
            }}
            key={this.props.item._id}>

            {this.state.currentState}

            <input 
                type="button" 
                className="btn btn-danger btn-sm ml-2" 
                value="X" 
                style={{padding: '5px 10px', marginRight: '10px'}}
                onClick={this.handleDelete.bind(this, this.props.item._id)} 
            />
            
        </li>
    )
  }
}

export default connect(null, { handledeleteapi })(GenresList);
