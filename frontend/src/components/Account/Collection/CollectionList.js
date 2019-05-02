import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './collection.css';
import { connect } from 'react-redux'
import { playlist, profilePage2 } from '../../../redux/actions/genresActions'

class CollectionList extends Component {
    state = {
        listPiece: '',
        picArr: []
    }

    componentDidMount() {
        this.setState({
            listPiece: this.props.item.name
        })
        this.props.profilePage2() 

        this.pics().then(result => this.setState({
          picArr: result
        }))
    }

    toInGenre = (id) => {
      this.props.playlist(id)
    }

    pics = async () => {
      try {
        let { icons } = this.props.item

        let pics = icons.map(pic => {
          return (
            <img key={this.props.item.itemID} src={pic.url} height="190" width="190" alt="" />
          )
        })

        return await pics
      }
      catch(err) {
        console.log(JSON.stringify(err))
      }
    }

  render() {
    return (
      <li className="collectionPiece" onClick={this.toInGenre.bind(this, this.props.item.id)}>
        <h3 style={{color: 'black', marginBottom: '1rem'}}>{this.state.listPiece}</h3>
        <Link to={`/ingenre/${this.props.item.id}`}>
          {this.state.picArr}
        </Link>
      </li>           
    )
  }
  
}

const mapStateToProps = (state) => ({
  genres: state.genre_state
})

export default connect(mapStateToProps, { playlist, profilePage2 })(CollectionList)
