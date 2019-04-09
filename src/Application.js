import React from 'react'
import SearchBar from './components/SearchBar'
import ResultList from './components/ResultList'
import Header from './components/Header'
import 'codemirror/mode/jsx/jsx'

export default class Application extends React.Component {
  constructor() {
    super()
    this.state = {
      startingActiveIndex: 0,
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
      classMethods,
      startingActiveIndex,
    } = this.state

    return (
      <div>
        <Header
          query={query}
          onClear={() => this.setState({ results: null, query: null })}
          classMethods={classMethods}
          onOpenResults={this.onSubmit}
        />

        {results ? (
          <ResultList
            startingActiveIndex={startingActiveIndex}
            results={results}
            onClear={this.onClear}
          />
        ) : (
          <SearchBar
            files={files}
            classMethods={classMethods}
            onOpenResults={this.onSubmit}
            onFetch={this.onFetch.bind(this)}
          />
        )}
      </div>
    )
  }

  onSubmit(query, results, startingActiveIndex) {
    this.setState({ query, results, startingActiveIndex })
  }

  onClear() {
    this.setState({ searchTerm: null, results: null })
  }

  onFetch({ files, classMethods }) {
    console.log(files, classMethods)
    this.setState({ files, classMethods })
  }
}
