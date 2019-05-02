import React, { Component } from 'react'
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

export default class HoverBtn extends Component {

  unHover = id => {
    let imgs = document.getElementsByClassName('imgs')  
    let parent = imgs[id].parentElement 
    let button = parent.getElementsByTagName('button')[0]
    button.style.opacity = '0'

    button.onmouseover = function() {
      this.style.opacity = '1'
    }

    var counter = 0

    button.onclick = function() {

      counter++

      if(counter % 2 == 1) {   
          const optionList = document.createElement('ul')     
          optionList.style.cssText = 
            "position:absolute;top:17rem;margin-left:-9px;background-color:#FFF;padding:0"

          const optsArr = ['Set as profile picture', 'Add a filter effect', 'Delete picture']
          optsArr.forEach((item, index) => {
            let listItem = document.createElement('li')
            listItem.style.listStyleType = 'none'
            listItem.style.padding = '5px 8px'
            listItem.innerHTML = item

            // let link = document.createElement('a')
            // link.innerHTML = item           

            // listItem.appendChild(link)
            
            optionList.appendChild(listItem)
          })

          // wrap these lis into Link tags
          let links = optionList.getElementsByTagName('li')
          console.log(links);


          // let links = optionList.getElementsByTagName('a')          
          // links[0].setAttribute('href', '/profilepic')
          // links[1].setAttribute('href', '/filterpic')
          // links[2].addEventListener('click', this.deletePic)

          parent.appendChild(optionList) 

      } else {

        const toRemove = parent.getElementsByTagName('ul')
        for(let i = 0; i < toRemove.length; i++) {
          parent.removeChild(toRemove[i])
        }

      }

    }  

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


  render() {
    console.log(this.props)
    return (
      <div>
        {this.unHover}
        <MDBDropdown>
            <MDBDropdownToggle caret color="primary">
                MDBDropdown
            </MDBDropdownToggle>
            <MDBDropdownMenu basic>
                <MDBDropdownItem>Action</MDBDropdownItem>
                <MDBDropdownItem>Another Action</MDBDropdownItem>
                <MDBDropdownItem>Something else here</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>Separated link</MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
      </div>
    )
  }


}
