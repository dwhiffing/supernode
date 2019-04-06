import Fuse from 'fuse.js'
import { fetchRepoTree, fetchFileContents } from './githubFetch'

export const fetchRepoJavascriptFiles = options =>
  fetchRepoTree(options).then(({ tree }) =>
    fetchFileContents(options, tree.filter(file => /\.jsx?$/.test(file.path)))
  )

export function highlightText(text, matches) {
  let result = []
  let pair = matches.shift()

  for (let i = 0; i < text.length; i++) {
    if (pair && i === pair[0]) {
      result.push('<b>')
    }

    result.push(text.charAt(i))

    if (pair && i === pair[1]) {
      result.push('</b>')
      pair = matches.shift()
    }
  }

  return result.join('')
}

export const fuzzySearchCollection = (collection, queryString, fuseOpts) => {
  const fuse = new Fuse(collection, fuseOpts)
  return fuse.search(queryString).map(result => {
    const item = collection.find(m => m.id === result.item)
    return {
      ...item,
      matches: result.matches,
      highlightedName: highlightText(item.name, result.matches[0].indices),
    }
  })
}
