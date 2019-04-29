import React, { useEffect, useState } from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'

const ResultPreview = ({ result }) => {
  const [editor, setEditor] = useState()

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

export default ResultPreview
