import React from 'react'
import ResultList from './components/ResultList'
import Header from '../shared/components/Header'
import ResultPreview from './components/ResultPreview'

const ResultsView = ({
  resetAppState,
  results,
  resultIndex,
  updateAppState,
}) => (
  <div>
    <Header onClick={resetAppState} />

    <div className="height-100">
      <div className="container flex">
        <ResultList
          results={results}
          activeIndex={resultIndex}
          onClickResult={index => updateAppState({ resultIndex: index })}
        />

        <div className="flex-1 overflow-scroll">
          <ResultPreview result={results[resultIndex]} />
        </div>
      </div>
    </div>
  </div>
)

export default ResultsView
