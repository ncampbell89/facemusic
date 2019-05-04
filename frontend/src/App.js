import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import Navclass from './components/Layout/Nav';
import Intro from './components/Layout/Intro';
import Genres from './components/Account/Genres/Genres';
import Profile from './components/Account/Profile';
import FooterPage from './components/Layout/FooterPage';
import InGenre from './components/Account/Genres/InGenre';
import NewsFeed from './components/Account/NewsFeed';
import News from './components/Account/News';
import FriendRequests from './components/Requests/FriendRequests';
import Messages from './components/Requests/Messages';
import Pictures from './components/Layout/Pictures';
import PeopleSearch from './components/Account/PeopleSearch';
import DeletePic from './components/Layout/DeletePic';

import Friends from './components/Account/Friends';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    genreArr: []
  }

  render() {
    
    return (
        <Provider store={store}>

          <Router>
            <div>             
              <Navclass />

              {/* {window.location.href == '/newsfeed' || window.location.href == '/search' ? <SearchBar /> : ''} */}

              <Switch>
                <Route exact path="/" component={Intro} />
                <Route exact path="/newsfeed" component={NewsFeed} />
                <Route exact path="/news" component={News} />
                <Route exact path="/genrelist" component={Genres} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/ingenre/:id" component={InGenre} />
                <Route exact path="/requests" component={FriendRequests} />
                <Route exact path="/messages" component={Messages} />
                <Route exact path="/pictures" component={Pictures} />
                <Route exact path="/search" component={PeopleSearch} />
                <Route exact path="/deletepic" component={DeletePic} />

                <Route exact path="/friends" component={Friends} />
              </Switch>

              <FooterPage />
            </div>
          </Router> 

        </Provider>     
    );
  }
}

export default App;
