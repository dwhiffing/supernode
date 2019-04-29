import React from 'react'
import Header from '../shared/components/Header'
import SearchBar from './components/SearchBar'
import RepoFetcher from './components/RepoFetcher'

const SearchView = () => (
  <div>
    <Header />

    <div className="flex justify-center items-center height-100">
      <div className="flex flex-column items-center">
        <RepoFetcher />

        <div className="flex justify-center">
          <div className="flex flex-column items-center">
            <h1>SUPERNODE</h1>

            <div>
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default SearchView
