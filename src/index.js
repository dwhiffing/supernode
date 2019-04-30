import React from 'react'
import ReactDOM from 'react-dom'
import SuperNode from './app'
import { StoreProvider } from './storeContext'
import 'codemirror/mode/jsx/jsx'

ReactDOM.render(
  <StoreProvider>
    <SuperNode />
  </StoreProvider>,
  document.getElementById('root')
)
