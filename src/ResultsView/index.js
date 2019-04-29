import React from 'react'
import ResultList from './components/ResultList'
import Header from '../shared/components/Header'
import ResultPreview from './components/ResultPreview'
import { connect } from '../storeContext'

const ResultsView = ({
  results,
  resultIndex,
  resetAppState,
  displayResults,
}) => (
  <div>
    <Header onClick={resetAppState} />

    <div className="height-100">
      <div className="container flex">
        <ResultList
          results={results}
          activeIndex={resultIndex}
          onClickResult={displayResults}
        />

        <div className="flex-1 overflow-scroll">
          <ResultPreview result={results[resultIndex]} />
        </div>
      </div>
    </div>
  </div>
)

export default connect(
  ({ results, resultIndex }) => ({ results, resultIndex }),
  dispatch => ({
    displayResults: index =>
      dispatch({ type: 'DISPLAY_RESULTS', payload: index }),
    resetAppState: () => dispatch({ type: 'RESET' }),
  })
)(ResultsView)
