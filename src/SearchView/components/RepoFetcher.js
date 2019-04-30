import React, { useState, useEffect } from 'react'
import { fetchRepoJavascriptFiles } from '../utils/github'
import { getIndexedFunctions } from '../utils/babel'
import { connect } from '../../storeContext'
import { fetchRepo } from '../../actions'

// TODO: Should this be in the search pod?
// TODO: This shouldn't be setting indexed functions.  Just fetching the files

const RepoFetcher = ({ repoList, fetchRepo }) => {
  const [owner, setOwner] = useState('dwhiffing')
  const [repo, setRepo] = useState('piglet')
  const [branch, setBranch] = useState('master')

  const repoBranch = { owner, repo, branch }
  const onSubmit = () => {
    fetchRepoJavascriptFiles(repoBranch).then(files => {
      fetchRepo(
        files.map(file => ({ ...file, repoBranch })),
        getIndexedFunctions(files).map(func => ({ ...func, repoBranch }))
      )
    })
  }

  useEffect(() => {
    if (repoList.length === 0) {
      onSubmit()
    }
  }, [])

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
      <div>
        <h4>Repo list</h4>
        {repoList.map(repo => (
          <p key={`item-${repo}`}>{repo}</p>
        ))}
      </div>
    </div>
  )
}

export default connect(
  ({ repoList }) => ({ repoList }),
  { fetchRepo }
)(RepoFetcher)
