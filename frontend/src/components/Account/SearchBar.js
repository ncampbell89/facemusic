import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { allusersapi, onSuccessapi } from '../../redux/actions/authActions';
import { getAllPosts } from '../../redux/actions/updateActions';

class SearchBar extends Component {
    state = {
        search: ''
    }

    componentDidMount() {
        this.props.getAllPosts()
    }

    searchInput = (event) => {
        this.setState({
          [event.target.name] : event.target.value
        })
    }

    searchSubmit = (event) => {
        event.preventDefault();   
        this.props.allusersapi(this.props.user)
        console.log(this.props)  
        // this.props.history.push('/search')  
    }

    render() {
        let entries = Object.entries(this.state).map(x => {
            return (
              <input 
                name={x[0]}           
                onChange={this.searchInput} 
                value={x[1]}
                className="form-control w-85 p-3" 
                placeholder="People search via email or similar genre" 
              />
            )      
          })
      
          let result = entries.map(str => {
            return str.props.value
          })
      
          let searchBtn;
          if(result[0].length < 1) {
            searchBtn = (
              <button          
                className="btn btn-success ml-3" 
                style={{padding: '0 3%'}} disabled>
                Search
              </button> 
            )
          } else {
            searchBtn = (
              <button 
                className="btn btn-success ml-3" 
                style={{padding: '0 3%'}} 
                onClick={this.searchSubmit}>
                Search
              </button> 
            )
          } 

        return (
            <div className="container mt-5 mb-2">
                <form style={{display: 'flex', justifyContent: 'center'}}>         
                    {entries}
                    {searchBtn}                
                </form> 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth_state
})
  
export default connect(mapStateToProps, { allusersapi, onSuccessapi, getAllPosts })(SearchBar)
