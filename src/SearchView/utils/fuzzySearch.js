import Fuse from 'fuse.js'

function highlightText(text, matches) {
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

const fuzzySearchCollection = (collection, queryString, fuseOpts) => {
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

const fuzzySearch = (query, indexedFunctions) =>
  fuzzySearchCollection(indexedFunctions, query, {
    keys: ['name'],
    id: 'id',
    includeMatches: true,
  }).map(result => ({
    ...result,
    shortPath: `../${result.file.path.match(/(\w+\.js)/)[1]}`,
    methodText:
      '  ' + result.file.text.slice(result.node.start, result.node.end),
  }))

export default fuzzySearch
