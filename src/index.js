import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ResultsView from './ResultsView'
import SearchView from './SearchView'
import 'codemirror/mode/jsx/jsx'

const SuperNode = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [files, setFiles] = useState([])
  const [methods, setMethods] = useState([])
  const [resultIndex, setResultIndex] = useState(-1)

  const Component = resultIndex > -1 ? ResultsView : SearchView

  return (
    <Component
      updateAppState={state => {
        typeof state.query !== 'undefined' && setQuery(state.query)
        typeof state.results !== 'undefined' && setResults(state.results)
        typeof state.files !== 'undefined' && setFiles(state.files)
        typeof state.methods !== 'undefined' && setMethods(state.methods)
        typeof state.resultIndex !== 'undefined' &&
          setResultIndex(state.resultIndex)
      }}
      resetAppState={() => {
        setQuery('')
        setResults([])
        setResultIndex(-1)
      }}
      query={query}
      results={results}
      files={files}
      methods={methods}
      resultIndex={resultIndex}
    />
  )
}

ReactDOM.render(<SuperNode />, document.getElementById('root'))
