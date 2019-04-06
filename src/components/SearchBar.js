import React from 'react'
import ResultsPreview from './ResultsPreview'
import { fuzzySearchCollection } from '../utils/index'

export class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false, results: [], query: props.query || '' }
    this.onChange = this.onChange.bind(this)
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.query}
          placeholder="Type a code snippet or function"
          className={this.state.results.length > 0 ? 'open' : ''}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              this.setState({ open: false })
              this.props.onOpenResults(this.state.query, this.state.results, 0)
            }
          }}
        />

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

    const results = fuzzySearchCollection(this.props.classMethods, query, {
      keys: ['name'],
      id: 'id',
      includeMatches: true,
    }).map(result => ({
      ...result,
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

const SearchBar = ({ classMethods, onOpenResults }) => (
  <div
    className="flex justify-center items-center height-100"
    style={{ paddingBottom: 90 }}>
    <div className="flex justify-center">
      <div className="flex flex-column items-center">
        <h1>SUPERNODE</h1>

        <div>
          <SearchInput
            classMethods={classMethods}
            onOpenResults={onOpenResults}
          />
        </div>
      </div>
    </div>
  </div>
)

export default SearchBar
