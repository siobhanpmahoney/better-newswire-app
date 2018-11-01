import React, { Component } from 'react';
import './App.css';
import 'isomorphic-fetch';
import ls from 'local-storage'
import { Switch, Route, Redirect } from 'react-router'
import { urls } from './ApiKeys'
import FeedContainer from './components/feed/FeedContainer'
import SidebarContainer from './components/sidebar/SidebarContainer'



// const REC_URL = (section) => `https://content.api.nytimes.com/svc/mostpopular/v2/mostviewed/${section}/7.json?api-key=${nytimes_key}`


// a

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      latest: {},
      recommended: {},
      viewed: {},
      bookmarks: {},
      interests: {},
      wireType: "latest"
    }
  }

  componentDidMount() {
    this.setState({
      viewed: ls.get('readNow') || {},
      bookmarks: ls.get('readLater') || {},
      interests: ls.get('likedSections') || {},
      wireType: "latest",
    // }, this.startInterval)
  }, this.startInterval)

  }



  fetchArticles = () => {
    let type = this.state.wireType
    let articles = Object.assign({}, this.state[type])
    fetch(urls[type])
    .then(response => response.json())
    .then(json => json.results.forEach((article) => {
      if (!articles[article.slug_name]) {
        articles[article.slug_name] = article
      }

      !!this.state.viewed[article.slug_name] ? articles[article.slug_name]["viewed"] = true : articles[article.slug_name]["viewed"]=false
      !!this.state.bookmarks[article.slug_name] ? articles[article.slug_name]["bookmarked"] = true : articles[article.slug_name]["bookmarked"]=false
    }))
    this.setState({
      [type]: articles
    })
  }

  startInterval = () => {
    this.interval = setInterval(this.fetchArticles, 10000)
  }

  addBookmark = (event) => {
    event.preventDefault()

    let slug = event.target.id
    let bookmarkState = Object.assign({}, this.state.bookmarks)
    let feedType = this.state.wireType
    let currentState = Object.assign({}, this.state[feedType])

    if (!bookmarkState[slug]) {
      currentState[slug]["bookmarked"] = true
      bookmarkState[slug] = currentState[slug]
    }


    this.setState({
      [feedType]: currentState,
      bookmarks: bookmarkState
    })
  }

  viewArticle = (event) => {
    event.preventDefault()
    let slug = event.target.id
    let viewedState = Object.assign({}, this.state.viewed)
    let bookmarkState = Object.assign({}, this.state.bookmarks)
    let feedType = this.state.wireType
    let currentState = Object.assign({}, this.state[feedType])
    let interestState = Object.assign({}, this.state.interests)

    if (!!bookmarkState[slug]) {
      currentState[slug]["bookmarked"] = false
      delete bookmarkState[slug]
    }

    if (!viewedState[slug]) {
      currentState[slug]["viewed"] = true
      viewedState[slug] = currentState[slug]
    }

    if (!interestState[currentState[slug]["section"]]) {
      interestState[currentState[slug]["section"]] = 1
    } else {
      interestState[currentState[slug]["section"]] += 1
    }





    this.setState({
      [feedType]: currentState,
      bookmarks: bookmarkState,
      viewed: viewedState,
      interests: interestState
    }, () => console.log("state after updates", this.state))

    const win = window.open(currentState[slug].url, '_blank');
    win.focus()

  }



  render() {
    console.log("latestArticleFeed: ", Object.keys(this.state[this.state.wireType]).length)
    return (
      <div className="App">
        <h1>NYTimes Article Feed</h1>

        <SidebarContainer bookmarks={this.state.bookmarks} viewed={this.state.viewed} viewArticle={this.viewArticle}/>

        <Switch>
          <Route exact path='/latest' render={() => {
              return <FeedContainer addBookmark={this.addBookmark} title="Latest" articles={this.state.latest} viewArticle={this.viewArticle}/>
            }
          } />

          <Route exact path = '/recommended' render={() => {
              return <FeedContainer addBookmark={this.addBookmark} title="Recommended" articles={this.state.recommended} viewArticle={this.viewArticle}/>
            }
          } />

          <Redirect to='/latest' />

        </Switch>
      </div>
    );
  }
}

export default App;
