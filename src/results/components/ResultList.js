import React from 'react'
import ResultItem from './ResultItem'

const ResultList = props => (
  <div className="flex-1 overflow-scroll">
    {props.results.map((result, index) => (
      <ResultItem
        key={`code-mirror-${index}`}
        result={result}
        active={index === props.activeIndex}
        onClick={() => {
          props.onClickResult(index)
        }}
      />
    ))}
  </div>
)

export default ResultList
