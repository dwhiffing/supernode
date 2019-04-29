import React from 'react'
import ResultList from './components/ResultList'
import Header from '../shared/components/Header'
import ResultPreview from './components/ResultPreview'
import { connect } from '../storeContext'

const ResultsView = () => (
  <div>
    <Header />

    <div className="height-100">
      <div className="container flex">
        <ResultList />

        <div className="flex-1 overflow-scroll">
          <ResultPreview />
        </div>
      </div>
    </div>
  </div>
)

export default ResultsView
