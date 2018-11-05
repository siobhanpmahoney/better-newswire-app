import React from 'react'
import FeedItem from './FeedItem'

class FeedList extends React.Component {

  // renderArticles = () => {
  //   let {articles} = this.props
  //   return Object.keys(articles).map((art) => {
  //     return articles[art]
  //   })
  // }

  render() {
    let arts
    if (this.props.articles != undefined && Object.keys(this.props.articles).length > 0) {
      arts = Object.keys(this.props.articles).map((art) => this.props.articles[art])
    }

    return (
      <div>
        IN FEEDLIST
        <h3>{this.props.section}</h3>
        { arts != undefined && arts != null &&
          <div>
            {arts.map((art) => {
              return <FeedItem key = {art.slug_name} article={art} addBookmark={this.props.addBookmark} viewArticle={this.props.viewArticle} />
            })}
          </div>
        }
      </div>
    )
  }
}

export default FeedList
