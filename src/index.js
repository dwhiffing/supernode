import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ResultsView from './ResultsView'
import SearchView from './SearchView'
import { StoreProvider, connect } from './storeContext'
import 'codemirror/mode/jsx/jsx'

const SuperNodeBase = ({ resultIndex }) => {
  return React.createElement(resultIndex > -1 ? ResultsView : SearchView)
}

const SuperNode = connect(({ resultIndex }) => ({ resultIndex }))(SuperNodeBase)

ReactDOM.render(
  <StoreProvider>
    <SuperNode />
  </StoreProvider>,
  document.getElementById('root')
)
