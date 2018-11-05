import React from 'react'
import { withRouter } from 'react-router'
import FeedList from './FeedList'
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



  // renderArticles = () => {
  //   let {articles} = this.props
  //   return Object.keys(articles).map((art) => {
  //     return articles[art]
  //   })
  // }
  //
  renderArticles = () => {
    let {articles} = this.props
    return Object.keys(articles).map((section) => {
      return <FeedList key={section} section = {section} articles = {articles[section]} addBookmark={this.props.addBookmark} viewArticle={this.props.viewArticle} />
      })
    }





    render() {
      return (
        <div>
          <h2>{this.props.title}</h2>

          { Object.keys(this.props.articles).length > 0 &&
            <div>

              {this.renderArticles()}


            </div>
          }


        </div>
      )
    }
  }

  export default withRouter(FeedContainer)
