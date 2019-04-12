import React from 'react'
import Header from '../shared/components/Header'
import SearchBar, { SearchInput } from './components/SearchBar'
import RepoFetcher from './components/RepoFetcher'

export default class SearchView extends React.Component {
  constructor() {
    super()
    this.onFetchRepo = this.onFetchRepo.bind(this)
    this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this)
    this.onSubmitSearchQuery = this.onSubmitSearchQuery.bind(this)
  }

  render() {
    const { query, results, indexedFunctions } = this.props

    return (
      <div>
        <Header
          query={query}
          results={results}
          indexedFunctions={indexedFunctions}
          onSubmit={this.onSubmitSearchQuery}
          onClick={this.props.resetAppState}
        />

        <div className="flex justify-center items-center height-100">
          <div className="flex flex-column items-center">
            <RepoFetcher onFetch={this.onFetchRepo} />

            <div className="flex justify-center">
              <div className="flex flex-column items-center">
                <h1>SUPERNODE</h1>

                <div>
                  <SearchBar
                    query={query}
                    results={results}
                    indexedFunctions={indexedFunctions}
                    onSubmit={this.onSubmitSearchQuery}
                    onChange={this.onChangeSearchQuery}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onFetchRepo(files, indexedFunctions) {
    this.props.updateAppState({ files, indexedFunctions })
  }

  onChangeSearchQuery(query, results) {
    this.props.updateAppState({ query, results })
  }

  onSubmitSearchQuery(activeResultIndex = 0) {
    this.props.updateAppState({ activeResultIndex })
  }
}
