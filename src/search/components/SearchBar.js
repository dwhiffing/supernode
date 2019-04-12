import React from 'react'
import ResultsPreview from './ResultsPreview'
import fuzzySearch from '../utils/fuzzySearch'

export const SearchInput = ({ value, onChange, onSubmit }) => (
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

export default SearchBar
