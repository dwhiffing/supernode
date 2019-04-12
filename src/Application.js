import React from 'react'
import SearchBar from './components/SearchBar'
import ResultList from './components/ResultList'
import Header from './components/Header'
import 'codemirror/mode/jsx/jsx'

export default class Application extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedResultIndex: 0,
      results: null,
      files: null,
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onClear = this.onClear.bind(this)
  }

  render() {
    const {
      query,
      results,
      files,
      indexedFunctions,
      selectedResultIndex,
    } = this.state

    return (
      <div>
        <Header
          query={query}
          onClear={() => this.setState({ results: null, query: null })}
          indexedFunctions={indexedFunctions}
          onOpenResults={this.onSubmit}
        />

        {results ? (
          <ResultList
            activeIndex={selectedResultIndex}
            results={results}
            onClear={this.onClear}
          />
        ) : (
          <SearchBar
            files={files}
            indexedFunctions={indexedFunctions}
            onOpenResults={this.onSubmit}
            onFetch={this.onFetch.bind(this)}
          />
        )}
      </div>
    )
  }

  onSubmit(query, results, selectedResultIndex) {
    this.setState({ query, results, selectedResultIndex })
  }

  onClear() {
    this.setState({ searchTerm: null, results: null })
  }

  onFetch({ files, indexedFunctions }) {
    this.setState({ files, indexedFunctions })
  }
}
