import React from 'react'
import Header from '../shared/components/Header'
import SearchBar from './components/SearchBar'
import RepoFetcher from './components/RepoFetcher'
import { connect } from '../storeContext'

const SearchView = ({
  query,
  results,
  methods,
  fetchRepo,
  resetAppState,
  displayResults,
  updateResults,
}) => (
  <div>
    <Header onClick={resetAppState} />

    <div className="flex justify-center items-center height-100">
      <div className="flex flex-column items-center">
        <RepoFetcher onFetch={fetchRepo} />

        <div className="flex justify-center">
          <div className="flex flex-column items-center">
            <h1>SUPERNODE</h1>

            <div>
              <SearchBar
                query={query}
                results={results}
                methods={methods}
                onSubmit={displayResults}
                onChange={updateResults}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default connect(
  state => ({ ...state }),
  dispatch => ({
    displayResults: (resultIndex = 0) =>
      dispatch({ type: 'DISPLAY_RESULTS', payload: resultIndex }),
    fetchRepo: (files, methods) =>
      dispatch({ type: 'FETCH_REPO', payload: { files, methods } }),
    updateResults: (query, results) =>
      dispatch({ type: 'UPDATE_RESULTS', payload: { query, results } }),
    resetAppState: () => dispatch({ type: 'RESET' }),
  })
)(SearchView)
