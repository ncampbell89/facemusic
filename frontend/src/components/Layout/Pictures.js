import React, { Component } from 'react'
import { addPictureApi, allPicturesApi, deletePictureApi } from '../../redux/actions/updateActions'
import { profilePic, profilePicUrls } from '../../redux/actions/authActions';
import { connect } from 'react-redux'
import './Pictures.css'
import Lightbox from 'react-image-lightbox';
// import { confirmAlert } from 'react-confirm-alert';
// import { Link } from 'react-router-dom';
import FbImageLibrary from 'react-fb-image-grid'

class Pictures extends Component {

  constructor(props) {
    super(props)

    this.state = {
      photoIndex: 0,
      isOpen: false,
      isDeleted: false,
      updateProfilePic: ''
    }
  }

  componentDidMount() {
    var fileUpload = document.getElementById('file-upload');

    fileUpload.addEventListener('change', event => {
        this.props.addPictureApi(event)
    })
    
    this.props.allPicturesApi(this.props)
    this.props.profilePicUrls(this.props)
  }

  profilePic = (picID, url) => {
    this.setState({
      updateProfilePic: url,
    }, () => {
      this.props.profilePic(picID, this.state.updateProfilePic)
    })

    // window.location.reload()
  }

  deleteBtn = id => {
    this.setState({
      isDeleted: true
    })
    this.props.deletePictureApi(id)
  }

  unHover = id => {
    
    let imgs = document.getElementsByClassName('imgs')  
    let parent = imgs[id].parentElement 
    let button = parent.getElementsByTagName('button')[0]
    button.style.opacity = '0'

    // onmouseout state
    const uls = parent.getElementsByTagName('ul')

    for(let i = 0; i < uls.length; i++) {
      // let button = parent.getElementsByTagName('button')[0]
      let isHovered = uls[i].querySelector(':hover')

      if(!isHovered) {
        // hovering over the list
        parent.removeChild(uls[i])
      } 
      
    }

  }

  timeoutError = () => {
    setTimeout(() => {
      window.location.reload('/pictures')
    }, 2000)
  }

  render() {
    let { pics, error, errorMessage, noPics } = this.props.update
    const { photoIndex, isOpen } = this.state;

    let images = []
    let keys = []
    let gallery = pics.map((item, index) => {  
      images.push(item.url)
      keys.push(item._id)
      return (
        <img key={item._id} src={item.url} onClick={() => this.setState({ photoIndex: index })} className="imgs" width="285" height="285" alt="" />
      )   
    })

    return ( 
      <div className="mb-5">
        
        <h2 style={{marginLeft: '39px', marginBottom: '0px', fontWeight: 'bold'}}>Photo Gallery</h2>

        <div style={{margin: '2rem 4rem'}}>
          {pics.length === 0 ? noPics :
          <div>

            <div id="img-container" className="img-container" onClick={() => this.setState({ isOpen: true })}>
              {gallery}
            </div>

            {isOpen ? 
              <Lightbox 
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => {
                    this.setState({ isOpen: false })
                  }    
                }
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % images.length
                  })
                }
                toolbarButtons={[
                  <div>
                    <span onClick={this.profilePic.bind(this, keys[photoIndex], images[photoIndex])} 
                    style={{cursor: 'pointer'}}>Set as profile picture</span> 
                    &emsp;
                    <span onClick={this.deleteBtn.bind(this, keys[photoIndex])} 
                    style={{cursor: 'pointer'}}>Delete picture</span>   
                  </div>               
                ]}
              /> : ''
            }
            
          </div>}
        </div>

        {error ?
          <div>
              <span 
                className="alert alert-danger" 
                style={{marginLeft: '39px', padding: '10px'}}>
                {errorMessage}
              </span> 
              <script>{this.timeoutError()}</script>
          </div> :

          <label className="btn btn-success" style={{marginLeft: '39px'}} htmlFor="file-upload">
            <input id="file-upload" type="file" style={{display: 'none'}} />
            Add Image
          </label>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  update: state.update_state,
  user: state.auth_state
})

export default connect(mapStateToProps, { addPictureApi, allPicturesApi, deletePictureApi, profilePic, profilePicUrls })(Pictures)
