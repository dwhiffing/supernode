import React from 'react'
import ReactDOM from 'react-dom'
import Application from './Application'

class SuperNode extends React.Component {
  render() {
    return (
      <div>
        <Application />
      </div>
    )
  }
}

ReactDOM.render(<SuperNode />, document.getElementById('root'))
