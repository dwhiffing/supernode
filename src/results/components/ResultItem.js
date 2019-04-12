import React from 'react'

const ResultItem = ({ result, onClick, active }) => {
  return (
    <div
      className={`flex result ${active ? 'result-active' : ''}`}
      style={{ justifyContent: 'space-between' }}
      onClick={onClick}>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: `<p>${result.highlightedName}:${
              result.shortPath
            } in <span style="color: purple">Supernode</span></p>`,
          }}
        />
        <p>
          <span>999 lines</span>
          <span> | </span>
          <span>12,000 Pull Requests</span>
        </p>
      </div>
      <p>⭐⭐⭐⭐</p>
    </div>
  )
}

export default ResultItem
