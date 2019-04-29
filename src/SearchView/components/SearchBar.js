import React from 'react'
import fuzzySearch from '../utils/fuzzySearch'
import { connect } from '../../storeContext'
import { displayResults, updateResults } from '../../actions'

const SearchBar = ({
  query,
  results,
  displayResults,
  methods,
  updateResults,
}) => (
  <div>
    <div className={`search-input ${results.length > 0 ? 'open' : ''}`}>
      <input
        type="text"
        placeholder="Type a code snippet or function"
        value={query}
        onChange={({ target: { value: query } }) => {
          updateResults(query, fuzzySearch(query, methods))
        }}
        onKeyPress={({ key }) => key === 'Enter' && displayResults()}
      />
    </div>

    {query.length > 0 && results.length > 0 && (
      <div className="search-preview-results border" style={{ top: 25 }}>
        {results.slice(0, 6).map(({ highlightedName: name }, index) => (
          <div
            key={`result-${index}`}
            className="search-preview-result"
            onClick={() => displayResults(index)}>
            <div dangerouslySetInnerHTML={{ __html: `<p>${name}</p>` }} />
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

export default connect(
  ({ query, results, methods }) => ({ query, results, methods }),
  { displayResults, updateResults }
)(SearchBar)
