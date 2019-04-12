import { getTree } from './babel'

const CONTENT_URI = 'https://raw.githubusercontent.com'
const GITHUB_API_URI = 'https://api.github.com'

const githubFetch = function(path) {
  let headers = new Headers()

  headers.append('Content-Type', 'text/json')
  headers.append(
    'Authorization',
    'Basic ' +
      Buffer.from(__PROCESS__.USERNAME + ':' + __PROCESS__.PASSWORD).toString(
        'base64'
      )
  )

  return fetch(`${GITHUB_API_URI}/${path}`, {
    method: 'GET',
    headers: headers,
  }).then(response => response.json())
}

const fetchRepoTree = ({ owner, repo, branch }) =>
  githubFetch(`repos/${owner}/${repo}/git/trees/${branch}?recursive=1`)

const fetchFileContents = ({ owner, repo, branch }, files) =>
  Promise.all(
    files.map(({ path }) =>
      fetch(`${CONTENT_URI}/${owner}/${repo}/${branch}/${path}`).then(
        response =>
          response.text().then(text => ({
            path,
            text,
            tree: getTree({ text }),
          }))
      )
    )
  )

export const fetchRepoJavascriptFiles = ({ owner, repo, branch }) =>
  fetchRepoTree({ owner, repo, branch }).then(({ tree }) =>
    fetchFileContents(
      { owner, repo, branch },
      tree.filter(file => /\.jsx?$/.test(file.path))
    )
  )
