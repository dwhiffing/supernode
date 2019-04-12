import React from 'react'
import ResultItem, { ActiveResultItem } from './ResultItem'

class ResultList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: props.activeIndex,
      values: {},
    }
  }

  render() {
    if (!Array.isArray(this.props.results)) {
      results = [this.props.results]
    }

    const activeResult = this.props.results[this.state.activeIndex]

    return (
      <div className="height-100">
        <div className="container flex">
          <div className="flex-1 overflow-scroll">
            {this.props.results.map((result, index) => (
              <ResultItem
                key={`code-mirror-${index}`}
                result={result}
                active={index === this.state.activeIndex}
                onClick={() => {
                  this.setState({ activeIndex: index, select: false })
                }}
              />
            ))}
          </div>

          <div className="flex-1 overflow-scroll">
            <ActiveResultItem result={activeResult} />
          </div>
        </div>
      </div>
    )
  }
}

export default ResultList
