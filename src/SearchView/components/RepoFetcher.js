import React from 'react'
import { fetchRepoJavascriptFiles } from '../utils/github'
import { getIndexedFunctions } from '../utils/babel'

// TODO: Should this be in the search pod?
// TODO: This shouldn't be setting indexed functions.  Just fetching the files

export default class RepoFetcher extends React.Component {
  constructor() {
    super()

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeOwner = this.onChangeOwner.bind(this)
    this.onChangeRepo = this.onChangeRepo.bind(this)
    this.onChangeBranch = this.onChangeBranch.bind(this)

    this.state = { owner: 'dwhiffing', repo: 'piglet', branch: 'master' }
    this.onSubmit()
  }

  render() {
    return (
      <div>
        <input
          value={this.state.owner}
          onChange={this.onChangeOwner}
          key="owner"
        />
        <input
          value={this.state.repo}
          onChange={this.onChangeRepo}
          key="repo"
        />
        <input
          value={this.state.branch}
          onChange={this.onChangeBranch}
          key="branch"
        />
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    )
  }

  onChangeOwner({ target: { value } }) {
    this.setState({ owner: value })
  }

  onChangeRepo({ target: { value } }) {
    this.setState({ repo: value })
  }

  onChangeBranch({ target: { value } }) {
    this.setState({ branch: value })
  }

  onSubmit() {
    fetchRepoJavascriptFiles(this.state).then(files => {
      this.props.onFetch(files, getIndexedFunctions(files))
    })
  }
}
