import * as walk from 'babylon-walk'
const parser = require('@babel/parser')
const flatten = array => array.reduce((a, b) => a.concat(b), [])

const GET_FUNCTION_VISITORS = {
  Function(node, state) {
    state.functions.push(node)
  },
}

export const getTree = file =>
  parser.parse(file.text, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties'],
  })

const getFunctions = tree => {
  const state = { functions: [] }
  walk.recursive(tree, GET_FUNCTION_VISITORS, state)

  return state.functions
}

export const getIndexedFunctions = files =>
  flatten(
    files.map(file =>
      getFunctions(file.tree).map(node => {
        const name = node.key ? node.key.name : node.id.name
        const id = `${file.path}:${name}`
        return { file, node, name, id }
      })
    )
  )
