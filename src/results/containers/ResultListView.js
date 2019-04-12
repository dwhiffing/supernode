import React from 'react'
import ResultList from '../components/ResultList'
import Header from '../../shared/components/Header'

export default class ResultListView extends React.Component {
  render() {
    return (
      <div>
        <Header onClick={this.props.resetAppState} />

        <ResultList
          results={this.props.results}
          activeIndex={this.props.activeResultIndex}
        />
      </div>
    )
  }
}
