import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'

const ResultPreview = ({ result }) => (
  <div>
    <div>
      <p>
        {result.name} - {result.file.path}
      </p>
    </div>

    <CodePreview result={result} />
  </div>
)

class CodePreview extends React.Component {
  constructor(props) {
    super(props)
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
    return (
      <div onClick={this.copy}>
        <CodeMirror
          key={`code-mirror-${this.props.result.file.path}`}
          editorDidMount={editor => (this.instance = editor)}
          value={this.props.result.methodText}
          options={{ mode: 'jsx', lineNumbers: true }}
        />
      </div>
    )
  }

  selectAll() {
    this.instance.setSelection(
      { line: 0, ch: 0 },
      { line: 9999, ch: 9999 },
      { scroll: false }
    )
  }

  selectNone() {
    this.instance.setSelection({ line: 0, ch: 0 })
  }

  reset() {
    this.selectAll()
    this.instance.indentSelection('smart')
    this.selectNone()
  }

  copy() {
    this.selectAll()
    this.instance.focus()
    document.execCommand('copy')
  }
}

export default ResultPreview
