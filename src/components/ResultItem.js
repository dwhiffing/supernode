import React from 'react'

const ResultItem = ({ file, onClick, active }) => {
  return (
    <div
      className={`result ${active ? 'result-active' : ''}`}
      onClick={onClick}>
      <p>{file.path}</p>
    </div>
  )
}

export default ResultItem
