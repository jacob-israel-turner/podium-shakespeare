import React, { Component } from 'react'
import autobind from 'react-autobind'
import moment from 'moment'

import './App.css'
import Sort from './Sort'
import http from './helpers/http'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reviews: null,
      selectedReview: null,
      sort: 'DESC'
    }
    autobind(this)
  }

  async getReviews () {
    const { data: { data: reviews } } = await http.get('/reviews')
    this.setState({ reviews })
  }

  async openReview (id) {
    const { data: { data: selectedReview } } = await http.get(`/reviews/${id}`)
    this.setState({ selectedReview })
  }

  componentDidMount () {
    this.getReviews()
  }

  render () {
    let content
    if (this.state.reviews) {
      let reviews
      if (this.state.sort === 'ASC' || this.state.sort === 'DESC') {
        reviews = this.state.reviews.sort((a, b) => {
          if (this.state.sort === 'ASC') {
            if (a.rating > b.rating) {
              return 1
            } else if (a.rating < b.rating) {
              return -1
            } else {
              return 0
            }
          } else if (this.state.sort === 'DESC') {
            if (a.rating > b.rating) {
              return -1
            } else if (a.rating < b.rating) {
              return 1
            } else {
              return 0
            }
          }
        })
      } else {
        reviews = this.state.reviews
      }
      content = <div className="content-container">{reviews
        .map(review => {
          let selectedContent
          let rowClassName = 'review-container'
          if (this.state.selectedReview && review.id === this.state.selectedReview.id) {
            selectedContent = (
              <div>
                <div className="selected-date">{moment(this.state.selectedReview.publish_date).fromNow()}</div>
                <p className="selected-review-body">{this.state.selectedReview.body}</p>
              </div>
            )
            rowClassName += ' selected-review'
          }
          let row = (
            <div className={rowClassName} onClick={this.openReview.bind(null, review.id)} key={review.id}>
              <div className="review-header">{getStarsFromRating(review.rating)} - "{review.author}"</div>
              {selectedContent}
            </div>
          )
          return row
        })}</div>
    } else {
      content = <div>Loading...</div>
    }
    return (
      <div className="App">
        <h1 className="title">Shakespeare Reviews</h1>
        <Sort sortType={this.state.sort} handleChange={newSort => this.setState({ sort: newSort })} />
        {content}
      </div>
    )
  }
}

function getStarsFromRating (rating) {
  let stars = Math.round(rating)
  let returnValue = ''
  for (let i = 0; i < stars; i++) {
    returnValue += '⭐'
  }
  if (returnValue.length === 0) return '😢'
  return returnValue
}

export default App
