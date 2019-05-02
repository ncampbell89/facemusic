import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainPic from '../Layout/MainPic';
import { allusersapi, friendRequestsApi, pendingRequestsApi, 
    allFriends, userIdAndName } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom'

class PeopleSearch extends Component {
    state = {
        search: ''
    }

    componentDidMount() {
        this.props.allusersapi()
        this.props.allFriends()
        this.props.userIdAndName()      
    }

    searchInput = (event) => {
        this.setState({
          [event.target.name] : event.target.value
        })
    }

    searchSubmit = (obj, resultStr) => { 
        this.props.allusersapi(obj, resultStr)
    }

    showpeoplelist = () => {
        document.getElementById('peoplelist').style.display = 'flex'
    }

    reqBtn = (index, receiver, name) => {
        let req = document.getElementsByClassName('reqbtn')[index];
        req.innerHTML = 'Friend Request Sent!'
        req.disabled = true

        this.props.friendRequestsApi(receiver)
        this.props.pendingRequestsApi(receiver, name)
    }

    render() { 
        console.log(this.props.user) 
        let entries = Object.entries(this.state).map((x, i) => {
            return (
              <input 
                key={i}
                name={x[0]}           
                onChange={this.searchInput} 
                value={x[1]}
                className="form-control w-85 p-3" 
                placeholder="People search via email or similar genre" 
              />
            )      
        })
    
        let result = entries.map((str, index) => {
            return str.props.value
        })
      
        let keyword = result[0]

        let { allUsers, name } = this.props.user

        let searchList = allUsers.map((item, index) => {
            return (
                <li key={index} className="list-group-item p-4" style={{listStyleType: 'none', display: 'flex'}}>
                    <MainPic /> 
                    <div style={{marginLeft: '1rem'}}>
                        <h5>
                            <b>
                            <Link to={`/profile/${item.spotifyID}`}>
                                {item.name}
                            </Link>
                            
                            </b>
                        </h5>

                        {item.name === name ? 
                            <button
                                style={{fontSize: '9px'}}                               
                                className="reqbtn btn btn-primary p-1"
                                disabled>
                                Thats You!
                            </button> :

                            <button
                                style={{fontSize: '9px'}} 
                                onClick={this.reqBtn.bind(this, index, item.spotifyID, item.name)} 
                                className="reqbtn btn btn-primary p-1">
                                Send Friend Request
                            </button>
                        }
                                              
                    </div>
                </li>
            )
        })

        return (
            <div className="container mt-5 mb-2">
                <form style={{display: 'flex', justifyContent: 'center'}}>         
                    {entries}
                    <button 
                        className="btn btn-success ml-3" 
                        style={{padding: '0 3%'}} 
                        onClick={this.searchSubmit.bind(this, null, keyword)}
                    >
                    <Link to="/search" style={{color: '#FFF', textDecoration: 'none'}}>Search</Link> 
                    </button>         
                </form>
                <ul id="peoplelist" className="list-group">{searchList}</ul>
            </div>           
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth_state
})
  
export default connect(mapStateToProps, { allusersapi, friendRequestsApi, 
    pendingRequestsApi, allFriends, userIdAndName })(PeopleSearch)
