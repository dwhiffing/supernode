import React from 'react'

const Header = ({ onClick, children }) => (
  <header onClick={onClick} className="fixed top-0 left-0 right-0 bg-white z2">
    <div className="container">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="icon icon-logo" />
          {children}
        </div>
        <div className="flex items-center">
          <div className="icon icon-user" />
        </div>
      </div>
    </div>
  </header>
)

export default Header
