import React from 'react'
import ResultList from './components/ResultList'
import Header from '../shared/components/Header'
import ResultPreview from './components/ResultPreview'

export default class ResultsView extends React.Component {
  render() {
    return (
      <div>
        <Header onClick={this.props.resetAppState} />

        <div className="height-100">
          <div className="container flex">
            <ResultList
              results={this.props.results}
              activeIndex={this.props.activeResultIndex}
              onClickResult={this.onClickResult.bind(this)}
            />

            <div className="flex-1 overflow-scroll">
              <ResultPreview
                result={this.props.results[this.props.activeResultIndex]}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  onClickResult(activeResultIndex) {
    this.props.updateAppState({ activeResultIndex })
  }
}
