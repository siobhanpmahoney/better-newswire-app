import React from 'react'

class ViewedItem extends React.Component {
  render() {
    return (
      <div>

      <li className="readNowArticleTitle">{this.props.article.title}</li>
      </div>
    )
  }
}

export default ViewedItem
