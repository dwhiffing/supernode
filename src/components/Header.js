import React from 'react'

const Header = ({ onClick }) => (
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
export default Header
