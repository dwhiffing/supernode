import React, { useState, useEffect } from 'react'
import { fetchRepoJavascriptFiles } from '../utils/github'
import { getIndexedFunctions } from '../utils/babel'

// TODO: Should this be in the search pod?
// TODO: This shouldn't be setting indexed functions.  Just fetching the files

const RepoFetcher = ({ onFetch }) => {
  const [owner, setOwner] = useState('dwhiffing')
  const [repo, setRepo] = useState('piglet')
  const [branch, setBranch] = useState('master')

  const onSubmit = () => {
    fetchRepoJavascriptFiles({ owner, repo, branch }).then(files => {
      onFetch(files, getIndexedFunctions(files))
    })
  }

  useEffect(onSubmit, [])
  return (
    <div>
      <input
        value={owner}
        onChange={({ target: { value } }) => setOwner(value)}
        key="owner"
      />
      <input
        value={repo}
        onChange={({ target: { value } }) => setRepo(value)}
        key="repo"
      />
      <input
        value={branch}
        onChange={({ target: { value } }) => setBranch(value)}
        key="branch"
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  )
}

export default RepoFetcher
