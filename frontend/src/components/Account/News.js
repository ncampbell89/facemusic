import React, { Component } from 'react'
import { connect } from 'react-redux'
import { topNewsApi, recentNewsApi, addPostApi } from '../../redux/actions/updateActions';

import {
    createMuiTheme,
    MuiThemeProvider
} from "@material-ui/core/styles";

import Tooltip from '@material-ui/core/Tooltip';

class News extends Component {

    state = {
        showIcon: false
    }

    componentDidMount() {
        this.props.topNewsApi()
        this.props.recentNewsApi()
    }

    shareArticle = (id, item) => {
        this.props.history.push('/newsfeed')
        this.props.addPostApi(id, item)

        setTimeout(() => {
            window.location.reload('/newsfeed')
        }, 1000)
    }

  shareBtnShow = (event) => {
    this.setState({
        showIcon: true
    })   
  }

  shareBtnHide = (event) => {
    this.setState({
        showIcon: false
    })
  }

  render() { 

    const theme = createMuiTheme({
        typography: {
            useNextVariants: true,
        },
        overrides: {
          MuiTooltip: {
            tooltip: {
              fontSize: "1em"
            }
          }
        }
    });

    let { topNews } = this.props.update

    let topStories = topNews.map((item, index) => {

        let date = new Date(item.publishedAt)
        return (
            <div key={index}>
                <li key={index} 
                    name="article_list"
                    onMouseOver={this.shareBtnShow} onMouseOut={this.shareBtnHide} 
                    style={{listStyleType: 'none', fontFamily: 'sans-serif', display: 'flex'}}>
                    
                    <img src={item.urlToImage} alt="" style={{width: '20%', height: '25vh', marginRight: '1.8rem'}} />

                    <div>
                        <div className="d-flex" style={{justifyContent: 'space-between'}}>
                            <h2 className="mb-2" style={{width: '90%'}}><b>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                            </b></h2>

                            <MuiThemeProvider theme={theme}>
                                <Tooltip title="Share to News Feed" placement="top">
                                    {this.state.showIcon ? 
                                        <button 
                                            onClick={this.shareArticle.bind(this, index, item)} 
                                            className="btn btn-info" style={{height: '31px', opacity: '1'}}>
                                            <i className="fas fa-share-alt" style={{padding: '8px'}}></i>
                                        </button> :

                                        <button 
                                            onClick={this.shareArticle.bind(this, index, item)} 
                                            className="btn btn-info" style={{height: '31px', opacity: '0'}}>
                                            <i className="fas fa-share-alt" style={{padding: '8px'}}></i>
                                        </button> 
                                    }                   
                                </Tooltip>
                            </MuiThemeProvider>                          
                            
                        </div>

                        <h4 className="mb-1">{item.description}</h4>
                        <p className="mb-1">
                            {item.author}&nbsp;
                            {date.toLocaleDateString()}
                        </p>

                        <p>{item.content}</p>
                    </div> 
                    
                </li>

                <br />
                <hr style={{borderTop: '1px solid rgb(52, 58, 64)'}} />
                <br />
            </div>
        )
    })


    let { allNews } = this.props.update

    let recentStories = allNews.map((item, index) => {
        let date = new Date(item.publishedAt)
        return (
            <div key={index}>
                <li key={index} 
                    name="article_list"
                    onMouseOver={this.shareBtnShow} onMouseOut={this.shareBtnHide} 
                    style={{listStyleType: 'none', fontFamily: 'sans-serif', display: 'flex'}}>
                    
                    <img src={item.urlToImage} alt="" style={{width: '20%', height: '25vh', marginRight: '1.8rem'}} />

                    <div>
                        <div className="d-flex" style={{justifyContent: 'space-between'}}>
                            <h2 className="mb-2" style={{width: '90%'}}><b>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                            </b></h2>

                            <MuiThemeProvider theme={theme}>
                                <Tooltip title="Share to News Feed" placement="top">
                                    {this.state.showIcon ? 
                                        <button 
                                            onClick={this.shareArticle.bind(this, index, item)} 
                                            className="btn btn-info" style={{height: '31px', opacity: '1'}}>
                                            <i className="fas fa-share-alt" style={{padding: '8px'}}></i>
                                        </button> :

                                        <button 
                                            onClick={this.shareArticle.bind(this, index, item)} 
                                            className="btn btn-info" style={{height: '31px', opacity: '0'}}>
                                            <i className="fas fa-share-alt" style={{padding: '8px'}}></i>
                                        </button> 
                                    } 
                                </Tooltip>
                            </MuiThemeProvider>                          
                            
                        </div>

                        <h4 className="mb-1">{item.description}</h4>
                        <p className="mb-1">
                            {item.author}&nbsp;
                            {date.toLocaleDateString()}
                        </p>

                        <p>{item.content}</p>
                    </div> 
                    
                </li>

                <br />
                <hr style={{borderTop: '1px solid rgb(52, 58, 64)'}} />
                <br />
            </div>
        )
    })

    return (
        <div className="container mt-5 mb-5" style={{marginRight: '0 30px'}}>
            <h2 className="mb-5" style={{fontWeight: 'bold'}}>Top Stories</h2>
            <ul style={{
                height: '54vh', 
                overflowY: 'scroll', 
                backgroundColor: '#FFF', 
                padding: '1.5em'
            }}>{topStories}</ul>

            <h2 className="mt-5 mb-5" style={{fontWeight: 'bold'}}>Recent Stories</h2>
            <ul style={{
                height: '54vh', 
                overflowY: 'scroll', 
                backgroundColor: '#FFF', 
                padding: '1.5em'}}>{recentStories}</ul>
        </div>    
    )
  }
}

const mapStateToProps = (state) => ({
    update: state.update_state
})

export default connect(mapStateToProps, { topNewsApi, recentNewsApi, addPostApi })(News)
