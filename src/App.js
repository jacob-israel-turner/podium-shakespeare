import React, { Component } from 'react'
import autobind from 'react-autobind'

import './App.css'
import http from './helpers/http'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reviews: null
    }
    autobind(this)
  }

  async getReviews () {
    const { data: { data: reviews } } = await http.get('/reviews')
    this.setState({ reviews })
  }

  componentDidMount () {
    this.getReviews()
  }

  render () {
    let content
    if (this.state.reviews) {
      content = <div>{this.state.reviews.map(review => <div key={review.id}>{getStarsFromRating(review.rating)}</div>)}</div>
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
