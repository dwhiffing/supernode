import React from 'react'

const ResultsPreview = ({ query, results, onClickResult }) =>
  results.length > 0 && (
    <div className="search-preview-results border" style={{ top: 25 }}>
      {results.map((result, index) => (
        <div
          key={`result=${index}`}
          className="search-preview-result"
          onClick={() => onClickResult(index)}>
          <div
            dangerouslySetInnerHTML={{
              __html: `<p>${result.highlightedName}</p>`,
            }}
          />
        </div>
      ))}
      <p
        onClick={() => onClickResult(0)}
        style={{ marginTop: 30, marginBottom: 30 }}>
        Press enter to see all results
      </p>
    </div>
  )

export default ResultsPreview
