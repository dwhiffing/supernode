import React from 'react'
import ReactDOM from 'react-dom'
import ResultListView from './results/containers/ResultListView'
import SearchView from './search/containers/SearchView'
import 'codemirror/mode/jsx/jsx'

const INITIAL_STATE = {
  query: '',
  activeResultIndex: -1,
  results: [],
  files: [],
  indexedFunctions: [],
}

class SuperNode extends React.Component {
  constructor() {
    super()

    this.state = { ...INITIAL_STATE }
    this.setState = this.setState.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  render() {
    const props = {
      updateAppState: this.setState,
      resetAppState: this.resetState,
      ...this.state,
    }

    console.log(this.state)

    return this.state.activeResultIndex > -1 ? (
      <ResultListView {...props} />
    ) : (
      <SearchView {...props} />
    )
  }

  resetState() {
    this.setState({
      files: this.state.files,
      indexedFunctions: this.state.indexedFunctions,
      ...INITIAL_STATE,
    })
  }
}

ReactDOM.render(<SuperNode />, document.getElementById('root'))
