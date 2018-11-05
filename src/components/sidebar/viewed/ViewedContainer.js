import React from 'react'
import ViewedItem from './ViewedItem'

class ViewedContainer extends React.Component {

  render() {
    console.log("ViewedContainer props: ", this.props)
    let {viewed} = this.props
    return (
      <div>Viewed
      {Object.keys(viewed).length > 0 &&
        <div>
        {Object.keys(viewed).map((slug) => {
          return <ViewedItem key={slug} article={viewed[slug]} viewArticle={this.props.viewArticle} />
        })}
        </div>
      }
      </div>
    )
  }
}

export default ViewedContainer
