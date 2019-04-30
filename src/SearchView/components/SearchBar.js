import React, { useState, useRef, useEffect } from 'react'
import fuzzySearch from '../utils/fuzzySearch'
import { connect } from '../../storeContext'
import { displayResults, updateResults } from '../../actions'

const SearchBar = ({
  query,
  results,
  displayResults,
  methods,
  updateResults,
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [resultsFocused, setResultsFocused] = useState(false)
  const inputEl = useRef(null)

  useEffect(() => {
    Mousetrap.unbind('up', 'down')
    Mousetrap.bind('up', function(event) {
      if (highlightedIndex - 1 > -1) {
        setHighlightedIndex(highlightedIndex - 1)
      }
    })
    Mousetrap.bind('down', function(event) {
      if (highlightedIndex + 1 < results.length) {
        setHighlightedIndex(highlightedIndex + 1)
      }
    })
    Mousetrap.bind('enter', function(event) {
      displayResults(highlightedIndex)
    })
    return () => {
      Mousetrap.unbind('up', 'down', 'enter')
    }
  })

  return (
    <div>
      <div className={`search-input ${results.length > 0 ? 'open' : ''}`}>
        <input
          type="text"
          ref={inputEl}
          autoFocus={true}
          onFocus={() => setResultsFocused(false)}
          placeholder="Type a code snippet or function"
          value={query}
          onChange={({ target: { value: query } }) => {
            updateResults(query, fuzzySearch(query, methods))
          }}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              setResultsFocused(true)
              inputEl.current.blur()
            }
          }}
        />
      </div>

      {query.length > 0 && results.length > 0 && (
        <div
          className="search-preview-results border"
          style={{
            top: 25,
          }}>
          {results.map(({ highlightedName: name, repoBranch }, index) => (
            <div
              key={`result-${index}`}
              className="search-preview-result"
              onClick={() => displayResults(index)}
              style={{
                backgroundColor:
                  resultsFocused && highlightedIndex === index
                    ? 'gray'
                    : 'white',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p>${name}</p>`,
                  }}
                />
                <p>
                  {repoBranch.owner}/{repoBranch.repo}
                </p>
              </div>
            </div>
          ))}
          <p
            onClick={() => displayResults(0)}
            style={{ marginTop: 30, marginBottom: 30 }}>
            Press enter to see all results
          </p>
        </div>
      )}
    </div>
  )
}

export default connect(
  ({ query, results, methods }) => ({
    query,
    results: results.slice(0, 6),
    methods,
  }),
  { displayResults, updateResults }
)(SearchBar)
