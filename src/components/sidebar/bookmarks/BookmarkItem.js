import React from 'react'

class BookmarkItem extends React.Component {

  render() {
    let {article} = this.props
    const articleDate = `${(new Date(this.props.article.updated_date)).getMonth() + 1}/${(new Date(this.props.article.updated_date)).getDate()}/${(new Date(this.props.article.updated_date)).getFullYear()}`;
    return (

      <div className="readLaterArticleItem">
        <div className="readLaterArticleItemContent">




      <div className="readLaterArticleTop">
        <div className="readLaterArticleSection">
          {article.section}
        </div>
        <div className="readLaterArticleButtons">


          <button onClick={this.deleteArticle} className="readLaterArticleDeleteButton">
            <i class="material-icons" style={{color:"#8D8D8D"}}>
              close
            </i>
          </button>
        </div>
      </div>


      <div className="readLaterArticleTitle">
        <a onClick={this.handleReadNow} className="readLaterArtictleTitleAnchor">
          {article.title}</a>
      </div>

      <div className="readLaterArticleDate">
        {articleDate}
      </div>



    </div>
  </div>

    )
  }
}

export default BookmarkItem
