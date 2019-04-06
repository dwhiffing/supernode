import React from 'react'
import SearchBar from './components/SearchBar'
import ResultList from './components/ResultList'
import Header from './components/Header'
import { fetchRepoJavascriptFiles } from './utils'
import 'codemirror/mode/jsx/jsx'
import { getClassMethods } from './utils/babel'

const flatten = array => array.reduce((a, b) => a.concat(b), [])

export default class Application extends React.Component {
  constructor() {
    super()
    this.state = {
      startingActiveIndex: 0,
      results: null,
      files: null,
    }

    this.fetchRepo({ owner: 'dwhiffing', repo: 'hexacross', branch: 'master' })
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

  fetchRepo({ owner, repo, branch }) {
    fetchRepoJavascriptFiles({ owner, repo, branch }).then(files => {
      const classMethods = flatten(
        files.map(file =>
          getClassMethods(file.tree)
            .filter(node => node.key.name !== 'constructor')
            .map(node => ({
              file,
              node,
              id: `${file.path}:${node.key.name}`,
              name: node.key.name,
              type: 'ClassMethod',
            }))
        )
      )

      this.setState({ files, classMethods })
    })
  }
}
