import React from 'react'
import ResultsPreview from './ResultsPreview'
import { fuzzySearchCollection } from '../utils/index'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { query: '' }
    this.onChange = this.onChange.bind(this)
  }

  render() {
    return (
      <div
        className="flex justify-center items-center height-100"
        style={{ paddingBottom: 90 }}>
        <div className="flex justify-center">
          <div className="flex flex-column items-center">
            <h1>SUPERNODE</h1>

            <div>
              <input
                onChange={this.onChange}
                className={this.state.open ? 'open' : ''}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    this.props.onOpenResults(this.state.results)
                  }
                }}
                placeholder="Type a code snippet or function"
              />
              {this.state.results && (
                <ResultsPreview
                  query={this.state.query}
                  results={this.state.results.slice(0, 6)}
                  onClickResult={index =>
                    this.props.onOpenResults(this.state.results, index)
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  onChange(event) {
    const query = event.target.value

    this.setState({
      query,
      open: query.length > 0,
      results: fuzzySearchCollection(this.props.classMethods, query, {
        keys: ['name'],
        id: 'id',
        includeMatches: true,
      }),
    })
  }
}

export default SearchBar
