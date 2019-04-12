import React from 'react'
import { SearchInput } from './SearchBar'

const HeaderLeft = () => (
  <div className="flex items-center">
    <div className="icon icon-logo" />
  </div>
)

const HeaderRight = () => (
  <div className="flex items-center">
    <div className="icon icon-user" />
  </div>
)

const DefaultHeader = ({ onClick }) => (
  <header onClick={onClick} className="fixed top-0 left-0 right-0 bg-white z2">
    <div className="container">
      <div className="flex justify-between">
        <HeaderLeft />
        <HeaderRight />
      </div>
    </div>
  </header>
)

const SearchHeader = ({ query, onClear, indexedFunctions, onOpenResults }) => (
  <header className="fixed top-0 left-0 right-0 bg-white z2">
    <div className="container">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div onClick={onClear} className="icon icon-logo" />
          <SearchInput
            query={query}
            indexedFunctions={indexedFunctions}
            onOpenResults={onOpenResults}
            style={{ marginLeft: 20 }}
          />
        </div>
        <HeaderRight />
      </div>
    </div>
  </header>
)

const Header = props =>
  props.query ? <SearchHeader {...props} /> : <DefaultHeader {...props} />

export default Header
