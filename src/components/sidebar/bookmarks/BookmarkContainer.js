import React from 'react'
import BookmarkItem from './BookmarkItem'

class BookmarkContainer extends React.Component {
  render() {
    let {bookmarks} = this.props
    return (
      <div>Bookmarks
      {Object.keys(bookmarks).length > 0 &&
        <div>
        {Object.keys(bookmarks).map((slug) => {
          return <BookmarkItem key={slug} article={bookmarks[slug]} viewArticle={this.props.viewArticle} />
        })}
        </div>
      }
      </div>
    )
  }
}

export default BookmarkContainer
