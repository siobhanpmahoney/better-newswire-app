import React from 'react'
import BookmarkContainer from './bookmarks/BookmarkContainer'
import ViewedContainer from './viewed/ViewedContainer'

class SidebarContainer extends React.Component {
  render() {
    return (
      <div>
        <h3>Sidebar Container Here</h3>

      <div>
        <BookmarkContainer bookmarks={this.props.bookmarks} viewArticle={this.props.viewArticle}/>
      </div>

      <div>
        <ViewedContainer viewed={this.props.viewed} />
      </div>


      </div>
    )
  }
}

export default SidebarContainer
