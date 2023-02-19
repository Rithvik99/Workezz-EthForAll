import React, { Component } from 'react'
import CategoryNav from './CategoryNav'
import "./jobs.css"
import TopnavJobs from './TopnavJobs'

class Jobs extends Component {
  render() {
    return (
      <div s>
        <TopnavJobs/>
        <CategoryNav/>
      </div>
    )
  }
}

export default Jobs