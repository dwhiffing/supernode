import React from 'react'

export default class Collapsable extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

  render() {
    return (
      <div>
        <p
          onClick={() =>
            this.setState({
              open: !this.state.open,
            })
          }>
          {this.state.open ? 'Close' : 'Open'} {this.props.label}
        </p>
        {this.state.open && this.props.children}
      </div>
    )
  }
}
