import React from 'react'

class FeedItem extends React.Component {

  dynamicIcon = () => {
    if (this.props.article.bookmarked) {
      return (<i className="material-icons bookmark" id={this.props.article.slug_name}>bookmark</i>)
    } else {
      return (<i className="material-icons bookmark_border" id={this.props.article.slug_name}>bookmark_border</i>)
    }
  }





  render() {

    const articleDate = `${(new Date(this.props.article.updated_date)).getMonth() + 1}/${(new Date(this.props.article.updated_date)).getDate()}/${(new Date(this.props.article.updated_date)).getFullYear()}`;

    return (
      <div className="wire-item-container-block-wrapper">
        <div className="wire-item-container">

          <div className="wire-item-img-section">

            {this.props.article.multimedia &&
              <img src={this.props.article.multimedia[3].url} alt="" className="wire-item-img" />
            }


          </div>

          <div className="wire-item-all-text">
            <div className="wire-item-section">
              {this.props.article.section}
            </div>

            <div className="wire-item-title" id={this.props.article.slug_name} onClick={this.props.viewArticle}>
              {this.props.article.title}
            </div>

            <div className="wire-item-abstract">
              {this.props.article.abstract}
            </div>

            <div className="wire-item-bottom">
              <div className="wire-item-date">
                {articleDate}
              </div>

              <span className="wire-item-buttons">
                <button className="readLater" id={this.props.article.slug_name} onClick={this.props.addBookmark}>
                  {this.dynamicIcon()}
                </button>
              </span>
            </div>
          </div>




        </div>


      </div>
    )
  }
}

export default FeedItem
