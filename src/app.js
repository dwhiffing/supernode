import React, { useEffect } from 'react'
import ResultsView from './ResultsView'
import SearchView from './SearchView'
import { connect } from './storeContext'
import { load } from './actions'

const SuperNode = ({ load, resultIndex, loaded }) => {
  useEffect(load, [])

  return loaded ? resultIndex > -1 ? <ResultsView /> : <SearchView /> : <div />
}

export default connect(
  ({ resultIndex, loaded }) => ({ resultIndex, loaded }),
  { load }
)(SuperNode)
