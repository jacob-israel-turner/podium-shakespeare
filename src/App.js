import React, { Component } from 'react'
import autobind from 'react-autobind'

import './App.css'
import http from './helpers/http'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reviews: null,
      selectedReview: null
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
    console.log(this.state);
    let content
    if (this.state.reviews) {
      content = <div>{this.state.reviews.map(review => {
        let selectedContent
        if (this.state.selectedReview && review.id === this.state.selectedReview.id) {
          selectedContent = <div>{this.state.selectedReview.body}</div>
        }
        let row = (
          <div key={review.id}>
            <div onClick={this.openReview.bind(null, review.id)}>{getStarsFromRating(review.rating)} - "{review.author}"</div>
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
        <h1>Shakespeare Reviews</h1>
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
  return returnValue
}

export default App
