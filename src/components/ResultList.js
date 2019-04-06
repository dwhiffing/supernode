import React from 'react'
import JSONTree from 'react-json-tree'
import { Controlled as CodeMirror } from 'react-codemirror2'
import Collapsable from './Collapsable'
import ResultItem from './ResultItem'

class ResultList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: props.startingActiveIndex,
    }
  }

  render() {
    if (!Array.isArray(this.props.results)) {
      results = [this.props.results]
    }

    const activeResult = this.props.results[this.state.activeIndex]

    return (
      <div className="flex height-100">
        <div className="flex-1 overflow-scroll">
          {this.props.results.map((result, index) => (
            <ResultItem
              key={`code-mirror-${index}`}
              file={result.file}
              active={index === this.state.activeIndex}
              onClick={() => {
                this.setState({ activeIndex: index })
              }}
            />
          ))}
        </div>

        <div className="flex-1 overflow-scroll">
          <p>{activeResult.file.path}</p>

          <Collapsable label="AST json">
            <JSONTree data={activeResult.file.tree} />
          </Collapsable>

          <CodeMirror
            value={activeResult.file.text}
            options={{
              mode: 'jsx',
              readOnly: true,
              lineNumbers: true,
            }}
          />
        </div>
      </div>
    )
  }
}

export default ResultList
