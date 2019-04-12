import React from 'react'
import { fetchRepoJavascriptFiles } from '../utils'
import { getFunctions } from '../utils/babel'
import get from 'lodash/get'

const flatten = array => array.reduce((a, b) => a.concat(b), [])

export default class RepoFetcher extends React.Component {
  constructor() {
    super()
    this.fetchRepo = this.fetchRepo.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      owner: 'dwhiffing',
      repo: 'piglet',
      branch: 'master',
    }

    this.onChangeOwner = this.onChangeOwner.bind(this)
    this.onChangeRepo = this.onChangeRepo.bind(this)
    this.onChangeBranch = this.onChangeBranch.bind(this)

    this.onSubmit(this.state)
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
        <button onClick={() => this.onSubmit(this.state)}>Submit</button>
      </div>
    )
  }

  onChangeOwner(event) {
    this.setState({ owner: event.target.value })
  }

  onChangeRepo(event) {
    this.setState({ repo: event.target.value })
  }

  onChangeBranch(event) {
    this.setState({ branch: event.target.value })
  }

  onSubmit({ owner, repo, branch }) {
    this.fetchRepo({
      owner,
      repo,
      branch,
    })
  }

  fetchRepo({ owner, repo, branch }) {
    fetchRepoJavascriptFiles({
      owner,
      repo,
      branch,
    }).then(files => {
      const indexedFunctions = flatten(
        files.map(file =>
          getFunctions(file.tree).map(node => {
            const name = node.key ? node.key.name : node.id.name
            const id = `${file.path}:${name}`
            return { file, node, name, id }
          })
        )
      )
      this.props.onFetch({
        files,
        indexedFunctions,
      })
    })
  }
}
