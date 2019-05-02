import React, { Component } from 'react';
import { registerapi } from '../../redux/actions/authActions';
import { connect } from 'react-redux';

class Register extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    handleInput = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        
        this.props.registerapi(this.state)

        setTimeout(() => {
          window.location.reload()
        }, 3000)
    }

  render() {

    let { regMessage, regError, registered } = this.props.aboutUser;
    //console.log(registered)

    return (
      <div className="col-lg-6">             
       <form method="POST" onSubmit={this.handleSubmit}>
         <h3 className="mb-3 pl-5">Register</h3>
         
         <div className="flex-box" style={{marginBottom: '1rem'}}>
           <div style={{width:'84%'}}>

             <label htmlFor="firstName">First Name</label>
             <input 
               type="text" 
               className="form-control mb-3" 
               name="firstName" 
               id="firstName" 
               onChange={this.handleInput}
               placeholder="First Name" 
             />
           
             <label htmlFor="lastName">Last Name</label>
             <input 
               type="text" 
               className="form-control mb-3" 
               name="lastName" 
               id="lastName" 
               onChange={this.handleInput}
               placeholder="Last Name" 
             />

             <label htmlFor="email">Email</label>
             <input 
               type="text" 
               className="form-control mb-3" 
               name="email" 
               id="email" 
               onChange={this.handleInput}
               placeholder="Email" 
             />
           
             <label htmlFor="password">Password</label>
             <input 
               type="text" 
               className="form-control mb-3" 
               name="password" 
               id="password" 
               onChange={this.handleInput}
               placeholder="Password" 
             />

             <label htmlFor="gender">Gender:&nbsp;</label>
             <select name="gender" id="gender" onChange={this.handleInput} className="mb-3">
               <option value="-1">- select -</option>
               <option value="female">Female</option>
               <option value="male">Male</option>
             </select>

             <br />               
             <button className="btn btn-success" onClick={this.setNav}>Register</button>
             &emsp;
             {regError ? (<span className="alert alert-danger">{regMessage}</span>) : ''}
             {registered ? (<span className="alert alert-success">Welcome to FaceMusic! You may log in!</span>) : ''}
           </div>
         </div>

       </form>
     </div>
    )
  }
}

const mapStateToProps = (state) => ({
  aboutUser: state.auth_state
})

export default connect(mapStateToProps, { registerapi })(Register)