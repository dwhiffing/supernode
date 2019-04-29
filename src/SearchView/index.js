import React from 'react'
import Header from '../shared/components/Header'
import SearchBar from './components/SearchBar'
import RepoFetcher from './components/RepoFetcher'

const SearchView = ({
  query,
  results,
  resetAppState,
  updateAppState,
  methods,
}) => (
  <div>
    <Header onClick={resetAppState} />

    <div className="flex justify-center items-center height-100">
      <div className="flex flex-column items-center">
        <RepoFetcher
          onFetch={(files, methods) => updateAppState({ files, methods })}
        />

        <div className="flex justify-center">
          <div className="flex flex-column items-center">
            <h1>SUPERNODE</h1>

            <div>
              <SearchBar
                query={query}
                results={results}
                methods={methods}
                onSubmit={(resultIndex = 0) => updateAppState({ resultIndex })}
                onChange={(query, results) =>
                  updateAppState({ query, results })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default SearchView
