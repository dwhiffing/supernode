import React from 'react'
import fuzzySearch from '../utils/fuzzySearch'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  render() {
    const { query, results, onSubmit } = this.props

    return (
      <div>
        <div className={`search-input ${results.length > 0 ? 'open' : ''}`}>
          <SearchInput
            value={query}
            onChange={this.onChange}
            onSubmit={onSubmit}
          />
        </div>

        {query.length > 0 && (
          <ResultsPreview
            query={query}
            results={results.slice(0, 6)}
            onClickResult={index => {
              onSubmit(index)
            }}
          />
        )}
      </div>
    )
  }

  onChange({ target: { value: query } }) {
    this.props.onChange(query, fuzzySearch(query, this.props.indexedFunctions))
  }
}

const SearchInput = ({ value, onChange, onSubmit }) => (
  <input
    type="text"
    placeholder="Type a code snippet or function"
    value={value}
    onChange={onChange}
    onKeyPress={e => {
      if (e.key === 'Enter') {
        onSubmit()
      }
    }}
  />
)

const ResultsPreview = ({ results, onClickResult }) =>
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

export default SearchBar
