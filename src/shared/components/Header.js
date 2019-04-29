import React from 'react'
import { resetAppState } from '../../actions'
import { connect } from '../../storeContext'

const Header = ({ resetAppState }) => (
  <header
    onClick={resetAppState}
    className="fixed top-0 left-0 right-0 bg-white z2">
    <div className="container" />
  </header>
)

export default connect(
  undefined,
  { resetAppState }
)(Header)
