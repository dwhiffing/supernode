import React from 'react'
import fuzzySearch from '../utils/fuzzySearch'

const SearchBar = ({ query, results, onSubmit, methods, onChange }) => (
  <div>
    <div className={`search-input ${results.length > 0 ? 'open' : ''}`}>
      <input
        type="text"
        placeholder="Type a code snippet or function"
        value={query}
        onChange={({ target: { value: query } }) => {
          onChange(query, fuzzySearch(query, methods))
        }}
        onKeyPress={({ key }) => key === 'Enter' && onSubmit()}
      />
    </div>

    {query.length > 0 && results.length > 0 && (
      <div className="search-preview-results border" style={{ top: 25 }}>
        {results.slice(0, 6).map(({ highlightedName: name }, index) => (
          <div
            key={`result-${index}`}
            className="search-preview-result"
            onClick={() => onSubmit(index)}>
            <div dangerouslySetInnerHTML={{ __html: `<p>${name}</p>` }} />
          </div>
        ))}
        <p
          onClick={() => onSubmit(0)}
          style={{ marginTop: 30, marginBottom: 30 }}>
          Press enter to see all results
        </p>
      </div>
    )}
  </div>
)

export default SearchBar
