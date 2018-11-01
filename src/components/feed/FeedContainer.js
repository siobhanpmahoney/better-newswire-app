import React from 'react'
import { withRouter } from 'react-router'
import FeedItem from './FeedItem'

class FeedContainer extends React.Component {


  componentDidMount() {
    this.renderArticles()
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.articles) != Object.keys(this.props.articles)) {
      this.renderArticles()
    }
  }



  renderArticles = () => {
    let {articles} = this.props
    return Object.keys(articles).map((art) => {
      return articles[art]
    })
  }





  render() {
    console.log("container props: ", this.props)
    return (
      <div>
        <h2>{this.props.title}</h2>

  {this.renderArticles().length > 0 &&
      <div>

        {this.renderArticles().map((art) => {
          return <FeedItem key = {art.slug_name} article={art} addBookmark={this.props.addBookmark} viewArticle={this.props.viewArticle}/>
        })}


      </div>
    }


      </div>
    )
  }
}

export default withRouter(FeedContainer)
