{login ?
    <Form className="form-inline my-2 my-lg-0" onSubmit={this.handleLogout}>
        {/* <span>{login}</span> */}
        &ensp;

        <NavDropdown title={login} id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Likes</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Tracks</NavDropdown.Item>              
        </NavDropdown>

        <Button className="btn btn-primary my-2 my-sm-0" type="submit">Log Out</Button>
    </Form> :

    <Form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
        <FormControl 
            className="mr-sm-2" 
            type="text" 
            placeholder="Email" 
            aria-label="Email" 
            name="email"
            onChange={this.handleInput} 
        />
        <FormControl
            className="form-control mr-sm-2" 
            type="text" 
            placeholder="Password" 
            aria-label="Password"
            name="password" 
            onChange={this.handleInput}
        />
        <Button className="btn btn-primary my-2 my-sm-0" type="submit">Log In</Button>
    </Form>
}