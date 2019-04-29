import React, { useEffect, useState } from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { connect } from '../../storeContext'
import { previousResult, nextResult, resetAppState } from '../../actions'

const ResultPreview = ({
  results,
  resultIndex,
  nextResult,
  previousResult,
  resetAppState,
}) => {
  const result = results[resultIndex]
  const [editor, setEditor] = useState()

  useEffect(() => {
    Mousetrap.bind('up', function(event) {
      event.preventDefault()
      previousResult()
    })
    Mousetrap.bind('down', function(event) {
      event.preventDefault()
      nextResult()
    })
    Mousetrap.bind('esc', function(event) {
      event.preventDefault()
      resetAppState()
    })
    return () => {
      Mousetrap.unbind('up', 'down', 'esc')
    }
  }, [])

  return (
    <div>
      <div>
        <p>
          {result.name} - {result.file.path}
        </p>
      </div>
      <div
        onClick={() => {
          editor.setSelection(
            { line: 0, ch: 0 },
            { line: 9999, ch: 9999 },
            { scroll: false }
          )
          editor.focus()
          document.execCommand('copy')
        }}>
        <CodeMirror
          key={`code-mirror-${result.file.path}`}
          editorDidMount={editor => {
            setEditor(editor)
            editor.setSelection(
              { line: 0, ch: 0 },
              { line: 9999, ch: 9999 },
              { scroll: false }
            )
            editor.indentSelection('smart')
            editor.setSelection({ line: 0, ch: 0 })
          }}
          value={result.methodText}
          options={{ mode: 'jsx', lineNumbers: true }}
        />
      </div>
    </div>
  )
}

export default connect(
  state => ({
    results: state.results,
    resultIndex: state.resultIndex,
  }),
  {
    previousResult,
    nextResult,
    resetAppState,
  }
)(ResultPreview)
