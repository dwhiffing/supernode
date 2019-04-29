import React from 'react'

const Header = ({ onClick }) => (
  <header onClick={onClick} className="fixed top-0 left-0 right-0 bg-white z2">
    <div className="container" />
  </header>
)

export default Header
