import React from 'react'
import { fetchRepoJavascriptFiles } from '../utils'
import { getClassMethods } from '../utils/babel'

const flatten = array => array.reduce((a, b) => a.concat(b), [])

export default class RepoFetcher extends React.Component {
  constructor() {
    super()
    this.fetchRepo = this.fetchRepo.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      owner: 'dwhiffing',
      repo: 'idle-game',
      branch: 'master',
    }

    this.onChangeOwner = this.onChangeOwner.bind(this)
    this.onChangeRepo = this.onChangeRepo.bind(this)
    this.onChangeBranch = this.onChangeBranch.bind(this)
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
      const classMethods = flatten(
        files.map(file =>
          getClassMethods(file.tree)
            .filter(node => node.key.name !== 'constructor')
            .map(node => ({
              file,
              node,
              id: `${file.path}:${node.key.name}`,
              name: node.key.name,
              type: 'ClassMethod',
            }))
        )
      )
      this.props.onFetch({
        files,
        classMethods,
      })
    })
  }
}
