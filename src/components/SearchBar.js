import React from 'react'
import ResultsPreview from './ResultsPreview'
import { fuzzySearchCollection } from '../search/utils/index'
import RepoFetcher from './RepoFetcher'

export class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false, results: [], query: props.query || '' }
    this.onChange = this.onChange.bind(this)
  }

  render() {
    return (
      <div style={this.props.style}>
        <div
          className={`search-input ${
            this.state.results.length > 0 ? 'open' : ''
          }`}>
          🔍
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.query}
            placeholder="Type a code snippet or function"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                this.setState({ open: false })
                this.props.onOpenResults(
                  this.state.query,
                  this.state.results,
                  0
                )
              }
            }}
          />
        </div>
        {this.state.open && (
          <ResultsPreview
            query={this.state.query}
            results={this.state.results.slice(0, 6)}
            onClickResult={index => {
              this.setState({ open: false })
              this.props.onOpenResults(
                this.state.query,
                this.state.results,
                index
              )
            }}
          />
        )}
      </div>
    )
  }

  onChange(event) {
    const query = event.target.value

    const results = fuzzySearchCollection(this.props.indexedFunctions, query, {
      keys: ['name'],
      id: 'id',
      includeMatches: true,
    }).map(result => ({
      ...result,
      shortPath: `../${result.file.path.match(/(\w+\.js)/)[1]}`,
      methodText:
        '  ' + result.file.text.slice(result.node.start, result.node.end),
    }))

    this.setState({
      query,
      open: query.length > 0,
      results,
    })
  }
}

const SearchBar = ({ indexedFunctions, onOpenResults, onFetch }) => (
  <div
    className="flex justify-center items-center height-100"
    style={{ paddingBottom: 90 }}>
    <div className="flex justify-center">
      <div className="flex flex-column items-center">
        <RepoFetcher onFetch={onFetch} />
        <h1>SUPERNODE</h1>

        <div>
          <SearchInput
            indexedFunctions={indexedFunctions}
            onOpenResults={onOpenResults}
          />
        </div>
      </div>
    </div>
  </div>
)

export default SearchBar
