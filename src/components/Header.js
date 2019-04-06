import React from 'react'
import { realpathSync } from 'fs'
import { SearchInput } from './SearchBar'

const DefaultHeader = ({ onClick }) => (
  <header onClick={onClick} className="fixed top-0 left-0 right-0 bg-white z2">
    <div className="container">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="icon icon-logo" />
          <a href="#">Featured</a>
          <a href="#">How it works</a>
          <a href="#">About</a>
        </div>
        <div className="flex items-center">
          <a href="#">History</a>
          <a href="#">Nightmode</a>
          <div className="icon icon-user" />
        </div>
      </div>
    </div>
  </header>
)

class SearchHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className="fixed top-0 left-0 right-0 bg-white z2">
        <div className="container">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div onClick={this.props.onClear} className="icon icon-logo" />
              <SearchInput
                query={this.props.query}
                classMethods={this.props.classMethods}
                onOpenResults={this.props.onOpenResults}
              />
            </div>
            <div className="flex items-center">
              <div className="icon icon-user" />
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const Header = props =>
  props.query ? <SearchHeader {...props} /> : <DefaultHeader {...props} />

export default Header
