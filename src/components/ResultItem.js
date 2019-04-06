import React from 'react'
import JSONTree from 'react-json-tree'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import Collapsable from './Collapsable'

const ResultItem = ({ result, onClick, active }) => {
  return (
    <div
      className={`result ${active ? 'result-active' : ''}`}
      onClick={onClick}>
      <p>
        {result.name} - {result.file.path}
      </p>
    </div>
  )
}

export class ActiveResultItem extends React.Component {
  constructor(props) {
    super(props)
    this.codeMirrorInstance = null
    this.selectAll = this.selectAll.bind(this)
    this.selectNone = this.selectNone.bind(this)
    this.copy = this.copy.bind(this)
    this.reset = this.reset.bind(this)
  }

  componentDidMount() {
    this.reset()
  }

  componentDidUpdate() {
    this.reset()
  }

  render() {
    const { result } = this.props
    return (
      <div>
        <div onClick={this.copy}>
          <p>
            {result.name} - {result.file.path}
          </p>
        </div>

        <CodeMirror
          key={`code-mirror-${result.file.path}`}
          editorDidMount={editor => {
            this.codeMirrorInstance = editor
          }}
          value={result.methodText}
          options={{
            mode: 'jsx',
            lineNumbers: true,
          }}
        />

        <Collapsable label="AST json">
          <JSONTree data={result.file.tree} />
        </Collapsable>
      </div>
    )
  }

  selectAll() {
    this.codeMirrorInstance.setSelection(
      {
        line: 0,
        ch: 0,
      },
      {
        line: 9999,
        ch: 9999,
      },
      { scroll: false }
    )
  }

  selectNone() {
    this.codeMirrorInstance.setSelection({ line: 0, ch: 0 })
  }

  reset() {
    this.selectAll()
    this.codeMirrorInstance.indentSelection('smart')
    this.selectNone()
  }

  copy() {
    this.selectAll()
    this.codeMirrorInstance.focus()
    document.execCommand('copy')
  }
}

export default ResultItem
