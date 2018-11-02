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
  }, () => this.startInterval("all"))
  console.log("before fetch test")



  fetch(urls["recommended"]("all"))
  .then(response => response.json())
  .then(json => console.log(json))

  }




  fetchRecommendedArticles = () => {
    let interests = Object.keys(this.state.interests)
    for (let interest of interests) {
      this.fetchArticles(interest)
    }
  }


  fetchArticles = (section) => {
    console.log("in fetch.")
    console.log('article count: ', Object.keys(this.state[this.state.wireType]).length)
    let type = this.state.wireType

    fetch(urls["recommended"](section))
    .then(response => response.json())
    .then(json => json.results.forEach((article) => {
      let articles = this.updateArticleState(section, article)
      !!this.state.viewed[article.slug_name] ? articles[article.slug_name]["viewed"] = true : articles[article.slug_name]["viewed"]=false
      !!this.state.bookmarks[article.slug_name] ? articles[article.slug_name]["bookmarked"] = true : articles[article.slug_name]["bookmarked"]=false
      this.setState({
        [type]: articles
      })
    }))

  }

  updateArticleState = (section, article) => {
    let currentArticleState = Object.assign({}, this.state[this.state.wireType])
    if (section == "all") {
      if (!currentArticleState[article.slug_name]) {
        currentArticleState[article.slug_name] = article
      }
    } else {
      if (!currentArticleState[section][article.slug_name]) {
        currentArticleState[section][article.slug_name] = article
      }
    }
    return currentArticleState
  }




  // fetchArticles = (section) => {
  //   let type = this.state.wireType
  //   let articles = Object.assign({}, this.state[type])
  //   fetch(urls["recommended"](section))
  //   .then(response => response.json())
  //   .then(json => json.results.forEach((article) => {
  //     if (!articles[article.slug_name]) {
  //       articles[article.slug_name] = article
  //     }
  //
  //     !!this.state.viewed[article.slug_name] ? articles[article.slug_name]["viewed"] = true : articles[article.slug_name]["viewed"]=false
  //     !!this.state.bookmarks[article.slug_name] ? articles[article.slug_name]["bookmarked"] = true : articles[article.slug_name]["bookmarked"]=false
  //   }))
  //   this.setState({
  //     [type]: articles
  //   })
  // }

  // fetchRecommendedArticles = () => {
  //   let interests = Object.keys(this.state.interests)
  //   for (let interest of interests)
  // }

  startInterval = (sec) => {
    this.interval = setInterval(() => this.fetchArticles(sec), 10000)
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

    let interestState = this.addInterest(slug)

    this.setState({
      [feedType]: currentState,
      bookmarks: bookmarkState,
      interests: interestState
    }, () => console.log(this.state))
  }

  viewArticle = (event) => {
    event.preventDefault()
    let slug = event.target.id
    let viewedState = Object.assign({}, this.state.viewed)
    let bookmarkState = Object.assign({}, this.state.bookmarks)
    let feedType = this.state.wireType
    let currentState = Object.assign({}, this.state[feedType])

    if (!!bookmarkState[slug]) {
      currentState[slug]["bookmarked"] = false
      delete bookmarkState[slug]
    }

    if (!viewedState[slug]) {
      currentState[slug]["viewed"] = true
      viewedState[slug] = currentState[slug]
    }

    let interestState = this.addInterest(slug)

    this.setState({
      [feedType]: currentState,
      bookmarks: bookmarkState,
      viewed: viewedState,
      interests: interestState
    }, () => console.log("state after updates", this.state))

    const win = window.open(currentState[slug].url, '_blank');
    win.focus()

  }

  addInterest = (art) => {
    let feedType = this.state.wireType
    let currentState = Object.assign({}, this.state[feedType])
    let interestState = Object.assign({}, this.state.interests)
    if (!interestState[currentState[art]["section"]]) {
      interestState[currentState[art]["section"]] = 1
    } else {
      interestState[currentState[art]["section"]] += 1
    }
    return interestState
  }

  toggleFeed = () => {

  }

  render() {
    console.log("latestArticleFeed: ", Object.keys(this.state[this.state.wireType]).length)
    return (
      <div className="App">
        <h1>NYTimes Article Feed</h1>

      <button o>Switch to Recommended</button>

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
