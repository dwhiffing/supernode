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
      files: null,
      results: false,
    }

    fetchRepoJavascriptFiles({
      owner: 'dwhiffing',
      repo: 'hexacross',
      branch: 'master',
    }).then(files => {
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
      this.setState({
        files,
        classMethods,
      })
    })
  }

  render() {
    const { results, files, classMethods, startingActiveIndex } = this.state

    return (
      <div>
        <Header />

        {results ? (
          <ResultList
            startingActiveIndex={startingActiveIndex}
            results={results}
          />
        ) : (
          <SearchBar
            files={files}
            classMethods={classMethods}
            onOpenResults={this.onSubmit.bind(this)}
          />
        )}
      </div>
    )
  }

  onSubmit(results, startingActiveIndex) {
    this.setState({ results, startingActiveIndex })
  }
}
